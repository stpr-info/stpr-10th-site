"use client"

import { useState } from "react"
import type { SubField } from "@/lib/admin/tables"
import ImageField from "./ImageField"
import RichTextEditor from "./RichTextEditor"

type Row = Record<string, unknown>

/** 1 行分の空オブジェクトを作る。 */
function emptyRow(itemFields: SubField[]): Row {
  const row: Row = {}
  for (const f of itemFields) {
    row[f.name] = f.type === "repeater" ? [] : ""
  }
  return row
}

/** 行が完全に空（全項目が空文字 / 空配列 / undefined）かどうか。 */
function isEmptyRow(row: Row): boolean {
  return Object.values(row).every((v) => {
    if (v == null || v === "") return true
    if (Array.isArray(v)) return v.length === 0
    return false
  })
}

const inputCls =
  "rounded-lg border border-gold-200 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-gold-400 focus:ring-2 focus:ring-gold-100"

type SourceRow = Record<string, unknown>

function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : ""
}

// optionsSource → 読み取り元（input/textarea name の候補・先頭優先）・値の抽出・未登録時の案内文。
//  - "venues":       会場公演 repeater(venues) の venueName。無ければ取込用 venues_json。
//  - "ticketLineup": チケットラインナップ repeater の ticketName
//  - "shows":        会場公演の各 shows（公演）を「会場 日付 部」で展開。venues/venues_json 両対応
const OPTIONS_SOURCE: Record<
  NonNullable<SubField["optionsSource"]>,
  { names: string[]; extract: (rows: SourceRow[]) => string[]; emptyHint: string }
> = {
  venues: {
    names: ["venues", "venues_json"],
    extract: (rows) => rows.map((r) => str(r.venueName)),
    emptyHint: "先に「会場公演」を登録してください",
  },
  ticketLineup: {
    names: ["ticket_lineup"],
    extract: (rows) => rows.map((r) => str(r.ticketName)),
    emptyHint: "先に「チケットラインナップ」を登録してください",
  },
  shows: {
    names: ["venues", "venues_json"],
    extract: (rows) =>
      rows.flatMap((v) => {
        const shows = Array.isArray(v.shows) ? (v.shows as SourceRow[]) : []
        return shows.map((s) =>
          [str(v.venueName), str(s.date), str(s.partLabel)].filter(Boolean).join(" "),
        )
      }),
    emptyHint: "先に「会場公演」の公演リストを登録してください",
  },
}

/** name 一致の input / textarea の現在値を取得（hidden input・json textarea 両対応）。 */
function readNamedValue(name: string): string {
  if (typeof document === "undefined") return ""
  const el = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`)
  return el?.value ?? ""
}

/** 同一フォームの候補 name（先頭優先）から選択肢の値一覧を読み出す。
 *  フォーカス時に最新状態を取り直すために都度呼ぶ。 */
function readSourceValues(source: NonNullable<SubField["optionsSource"]>): string[] {
  const { names, extract } = OPTIONS_SOURCE[source]
  for (const name of names) {
    const raw = readNamedValue(name)
    if (!raw) continue
    try {
      const rows = JSON.parse(raw)
      if (!Array.isArray(rows)) continue
      const vals = Array.from(new Set(extract(rows as SourceRow[]).filter((v) => v.length > 0)))
      if (vals.length > 0) return vals
    } catch {
      /* 次の候補へ */
    }
  }
  return []
}

/** 動的セレクト（同一フォームの別 repeater から選択肢を供給）。 */
function DynamicSelect({
  field,
  value,
  onChange,
  source,
}: {
  field: SubField
  value: unknown
  onChange: (v: unknown) => void
  source: NonNullable<SubField["optionsSource"]>
}) {
  const [opts, setOpts] = useState<string[]>(() => readSourceValues(source))
  const current = typeof value === "string" ? value : ""
  // 保存済みの値が候補に無くても選択肢に残す（参照元の変更時のデータ保全）。
  const options = current && !opts.includes(current) ? [current, ...opts] : opts
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
      <select
        value={current}
        onFocus={() => setOpts(readSourceValues(source))}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      >
        <option value="">（未選択）</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

/** 動的マルチセレクト（チェック式）。値は string[] で保持する。 */
function DynamicMultiSelect({
  field,
  value,
  onChange,
  source,
}: {
  field: SubField
  value: unknown
  onChange: (v: unknown) => void
  source: NonNullable<SubField["optionsSource"]>
}) {
  const [opts, setOpts] = useState<string[]>(() => readSourceValues(source))
  const selected = Array.isArray(value)
    ? (value as unknown[]).filter((v): v is string => typeof v === "string")
    : typeof value === "string" && value
      ? [value]
      : []
  // 保存済みの値が候補に無くても残す（参照元の変更時のデータ保全）。
  const options = Array.from(new Set([...opts, ...selected]))
  const toggle = (opt: string) =>
    onChange(selected.includes(opt) ? selected.filter((v) => v !== opt) : [...selected, opt])
  return (
    <div
      className="flex flex-col gap-1 sm:col-span-2"
      onMouseEnter={() => setOpts(readSourceValues(source))}
      onFocus={() => setOpts(readSourceValues(source))}
    >
      <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
      {options.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gold-200 px-3 py-2 text-[11px] text-[#9a8aa0]">
          {OPTIONS_SOURCE[source].emptyHint}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => {
            const on = selected.includes(opt)
            return (
              <label
                key={opt}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
                  on
                    ? "border-gold-400 bg-gold-100 text-gold-700"
                    : "border-gold-200 bg-white text-[#6a5570] hover:bg-gold-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(opt)}
                  className="h-3.5 w-3.5 accent-gold-400"
                />
                {opt}
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

/** 同一フォームの別 repeater（hidden input 名）の現在の行を読み出す（コピー用）。 */
function readRepeaterRows(inputName: string): Row[] {
  if (typeof document === "undefined") return []
  const el = document.querySelector<HTMLInputElement>(`input[name="${inputName}"]`)
  if (!el?.value) return []
  try {
    const rows = JSON.parse(el.value)
    return Array.isArray(rows) ? (rows as Row[]) : []
  } catch {
    return []
  }
}

/** サブ項目 1 つの入力 UI。 */
function SubFieldInput({
  field,
  value,
  onChange,
  table,
}: {
  field: SubField
  value: unknown
  onChange: (v: unknown) => void
  table: string
}) {
  if (field.type === "image") {
    // 複数モード: URL配列を制御値として保持（行内 jsonb に配列で保存）。
    if (field.multiple) {
      const arr = Array.isArray(value)
        ? (value as unknown[]).filter((v): v is string => typeof v === "string")
        : typeof value === "string" && value
          ? [value]
          : []
      return (
        <div className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
          <ImageField
            table={table}
            compact
            multiple
            multiValue={arr}
            onMultiChange={(urls) => onChange(urls)}
          />
        </div>
      )
    }
    return (
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
        <ImageField
          table={table}
          compact
          value={typeof value === "string" ? value : ""}
          onChange={(url) => onChange(url)}
        />
      </div>
    )
  }

  if (field.type === "repeater") {
    const rows = Array.isArray(value) ? (value as Row[]) : []
    const copyFromSource = () => {
      const src = readRepeaterRows(field.copyFrom as string)
      if (src.length === 0) {
        window.alert("コピー元（基本セットリスト）が空です。")
        return
      }
      if (rows.length > 0 && !window.confirm("現在の内容をコピー元で置き換えますか？")) return
      onChange(src)
    }
    return (
      <div className="flex flex-col gap-1 sm:col-span-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
          {field.copyFrom && (
            <button
              type="button"
              onClick={copyFromSource}
              className="shrink-0 rounded-full border border-gold-300 bg-white px-3 py-0.5 text-[11px] text-gold-700 transition-colors hover:bg-gold-50"
            >
              基本セトリをコピー
            </button>
          )}
        </div>
        <div className="rounded-lg border border-dashed border-gold-200 p-2">
          <RowsEditor
            rows={rows}
            onChange={(r) => onChange(r)}
            itemFields={field.itemFields ?? []}
            table={table}
            bulkPaste={field.bulkPaste}
          />
        </div>
      </div>
    )
  }

  if (field.type === "richtext") {
    // 制御モード: 編集 HTML を行の値として親 state に通知（repeater の JSON に保存）。
    return (
      <div className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
        <RichTextEditor
          table={table}
          initialValue={typeof value === "string" ? value : ""}
          onChange={(html) => onChange(html)}
        />
      </div>
    )
  }

  if (field.type === "textarea") {
    return (
      <label className="flex flex-col gap-1 sm:col-span-2">
        <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
        <textarea
          rows={2}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      </label>
    )
  }

  if (field.type === "select") {
    if (field.optionsSource) {
      return field.multiple ? (
        <DynamicMultiSelect
          field={field}
          value={value}
          onChange={onChange}
          source={field.optionsSource}
        />
      ) : (
        <DynamicSelect
          field={field}
          value={value}
          onChange={onChange}
          source={field.optionsSource}
        />
      )
    }
    return (
      <label className="flex flex-col gap-1">
        <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
        <select
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="">（未選択）</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    )
  }

  // text / number
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11px] font-medium text-gold-700">{field.label}</span>
      <input
        type={field.type === "number" ? "number" : "text"}
        value={value == null ? "" : String(value)}
        placeholder={field.placeholder}
        onChange={(e) => {
          if (field.type === "number") {
            const n = e.target.value
            onChange(n === "" ? "" : Number(n))
          } else {
            onChange(e.target.value)
          }
        }}
        className={inputCls}
      />
    </label>
  )
}

// ── セトリ一括貼り付け（テキスト → 行） ───────────────────────────
const ENCORE_RE =
  /^[\s\-ー―－—~〜=＝・]*(?:アンコール|ｱﾝｺｰﾙ|encore|en|ec)[\s\-ー―－—~〜=＝・]*$/i

/** "曲名 / 担当" を分割（括弧内の / は無視。最後の括弧外 / で分割）。 */
function splitTitleMemo(s: string): [string, string] {
  let depth = 0
  let idx = -1
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c === "(" || c === "（") depth++
    else if (c === ")" || c === "）") depth = Math.max(0, depth - 1)
    else if (depth === 0 && c === "/" && s[i - 1] === " " && s[i + 1] === " ") idx = i
  }
  if (idx >= 0) return [s.slice(0, idx).trim(), s.slice(idx + 1).trim()]
  return [s.trim(), ""]
}

/** 貼り付けセトリを行（trackNumber / title / memo / section）へ変換。 */
function parseSetlist(text: string): Row[] {
  const out: Row[] = []
  let section = ""
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line) continue
    if (ENCORE_RE.test(line)) {
      section = "アンコール"
      continue
    }
    const m = /^(\d{1,3})[.\．。、:：)）]?\s*(.+)$/.exec(line)
    const trackNumber: number | "" = m ? Number(m[1]) : ""
    const rest = m ? m[2] : line
    const [title, memo] = splitTitleMemo(rest)
    const row: Row = { trackNumber, title, memo }
    if (section) row.section = section
    out.push(row)
  }
  return out
}

/** セトリ貼り付け入力ボックス（開閉式）。 */
function SetlistPasteBox({
  onApply,
}: {
  onApply: (rows: Row[], mode: "replace" | "append") => void
}) {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)
  const apply = (mode: "replace" | "append") => {
    const parsed = parseSetlist(text)
    if (parsed.length === 0) {
      window.alert("解析できる行がありませんでした。")
      return
    }
    onApply(parsed, mode)
    setText("")
    setOpen(false)
  }
  return (
    <div className="rounded-lg border border-dashed border-gold-300 bg-gold-50/40 p-2">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="text-[11px] font-bold text-gold-700"
      >
        {open ? "▲ セトリ一括貼り付けを閉じる" : "▼ セトリを貼り付けて一括入力"}
      </button>
      {open && (
        <div className="mt-2 flex flex-col gap-2">
          <textarea
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"1.スキスキ星人\n7.GO GO CRAZY / 騎士X\nーアンコールー\n1.PEACE"}
            className={inputCls}
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => apply("replace")}
              className="rounded-full bg-gold-400 px-4 py-1 text-[11px] text-white transition-colors hover:bg-gold-500"
            >
              解析して置き換え
            </button>
            <button
              type="button"
              onClick={() => apply("append")}
              className="rounded-full border border-gold-300 bg-white px-4 py-1 text-[11px] text-gold-700 transition-colors hover:bg-gold-50"
            >
              末尾に追加
            </button>
          </div>
          <p className="text-[10px] text-[#9a8aa0]">
            「1.曲名 / 担当」形式。括弧内の「/」は分割しません。「ーアンコールー」の行で区分＝アンコールに。
          </p>
        </div>
      )}
    </div>
  )
}

/** 行の集合を編集する制御コンポーネント（ネストでも再利用）。 */
function RowsEditor({
  rows,
  onChange,
  itemFields,
  table,
  bulkPaste,
}: {
  rows: Row[]
  onChange: (rows: Row[]) => void
  itemFields: SubField[]
  table: string
  bulkPaste?: boolean
}) {
  const update = (i: number, name: string, val: unknown) => {
    onChange(rows.map((r, idx) => (idx === i ? { ...r, [name]: val } : r)))
  }
  const addRow = () => onChange([...rows, emptyRow(itemFields)])
  const removeRow = (i: number) => onChange(rows.filter((_, idx) => idx !== i))
  // この行をコピーして直後に挿入（公演リスト・会場公演などの複製用）。
  const duplicateRow = (i: number) => {
    const copy = JSON.parse(JSON.stringify(rows[i])) as Row
    onChange([...rows.slice(0, i + 1), copy, ...rows.slice(i + 1)])
  }

  return (
    <div className="flex flex-col gap-3">
      {bulkPaste && (
        <SetlistPasteBox
          onApply={(parsed, mode) =>
            onChange(mode === "replace" ? parsed : [...rows, ...parsed])
          }
        />
      )}
      {rows.map((row, i) => (
        <div
          key={i}
          className="rounded-xl border border-gold-200 bg-gold-50/30 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-[11px] tracking-wider text-gold-500">
              #{i + 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => duplicateRow(i)}
                className="rounded-full border border-gold-300 bg-white px-3 py-0.5 text-[11px] text-gold-700 transition-colors hover:bg-gold-50"
              >
                複製
              </button>
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="rounded-full border border-rose-300 px-3 py-0.5 text-[11px] text-rose-500 transition-colors hover:bg-rose-50"
              >
                削除
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {itemFields.map((f) => (
              <SubFieldInput
                key={f.name}
                field={f}
                value={row[f.name]}
                onChange={(v) => update(i, f.name, v)}
                table={table}
              />
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="w-fit rounded-full border border-gold-300 bg-white px-4 py-1.5 text-xs text-gold-700 transition-colors hover:bg-gold-50"
      >
        ＋ 追加
      </button>
    </div>
  )
}

/**
 * JSON配列フィールドの専用エディタ。
 * 行追加・削除し、内部状態を JSON 文字列にして hidden input（name=field名）へ書き出す。
 * 保存処理側は従来の json/repeater パースでそのまま受け取れる。
 */
export default function RepeaterField({
  name,
  table,
  itemFields,
  initialValue,
  bulkPaste,
}: {
  name: string
  table: string
  itemFields: SubField[]
  initialValue?: unknown
  bulkPaste?: boolean
}) {
  const [rows, setRows] = useState<Row[]>(
    Array.isArray(initialValue) ? (initialValue as Row[]) : [],
  )

  // 完全に空の行は保存対象から除外。
  const cleaned = rows.filter((r) => !isEmptyRow(r))

  return (
    <div
      onKeyDown={(e) => {
        // 行内テキスト入力での Enter による submit を防ぐ（textarea は除外）。
        if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
          e.preventDefault()
        }
      }}
    >
      <RowsEditor
        rows={rows}
        onChange={setRows}
        itemFields={itemFields}
        table={table}
        bulkPaste={bulkPaste}
      />
      <input type="hidden" name={name} value={JSON.stringify(cleaned)} />
    </div>
  )
}
