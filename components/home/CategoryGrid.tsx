"use client"

import { T } from "@/lib/theme"

type Size = "large" | "medium" | "small"

type Category = {
  id: string
  label: string
  ja: string
  size: Size
}

// ベントーグリッド用の定義。PC では large=2x2 / medium=1x1 / small=1x1。
const CATEGORIES: Category[] = [
  { id: "live", label: "LIVE", ja: "ライブ", size: "large" },
  { id: "event", label: "EVENT", ja: "イベント", size: "medium" },
  { id: "goods", label: "GOODS", ja: "グッズ", size: "medium" },
  { id: "members", label: "MEMBERS", ja: "メンバー", size: "large" },
  { id: "music", label: "MUSIC", ja: "ミュージック", size: "medium" },
  { id: "album", label: "ALBUM", ja: "アルバム", size: "small" },
  { id: "magazine", label: "MAGAZINE", ja: "雑誌", size: "small" },
  { id: "media", label: "MEDIA", ja: "メディア", size: "small" },
]

// サイズ別のレイアウト。高さは全カード 200px で統一（grid の auto-rows）。
// ベントー感は large（LIVE/MEMBERS）を md で横2列ぶち抜きにすることで維持する。
const SIZE_CLASS: Record<Size, string> = {
  large: "md:col-span-2",
  medium: "",
  small: "",
}
const LABEL_CLASS: Record<Size, string> = {
  large: "text-[15px] md:text-[22px]",
  medium: "text-[15px] md:text-[16px]",
  small: "text-[13px]",
}
const JA_CLASS: Record<Size, string> = {
  large: "text-[12px] md:text-[14px]",
  medium: "text-[12px]",
  small: "text-[12px]",
}

/** トップのカテゴリグリッド（ベントーレイアウト）。各ページへの入り口。 */
export default function CategoryGrid() {
  return (
    <div className="mx-auto grid max-w-[900px] auto-rows-[200px] grid-cols-2 gap-4 px-5 md:grid-cols-3">
      {CATEGORIES.map((c) => (
        <a
          key={c.id}
          href={`#${c.id}`}
          className={`flex h-full flex-col items-center justify-center rounded-[20px] p-6 no-underline ${SIZE_CLASS[c.size]}`}
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(212,168,83,0.3)",
            boxShadow: "0 4px 20px rgba(212,168,83,0.08)",
            transition: "transform 0.25s, box-shadow 0.25s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)"
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(212,168,83,0.18)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = ""
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,168,83,0.08)"
          }}
        >
          {/* 英語ラベル */}
          <span
            className={`font-semibold ${LABEL_CLASS[c.size]}`}
            style={{
              fontFamily: "var(--font-cinzel), serif",
              letterSpacing: "0.2em",
              color: T.goldD,
              marginBottom: "6px",
            }}
          >
            {c.label}
          </span>

          {/* 日本語ラベル */}
          <span
            className={JA_CLASS[c.size]}
            style={{
              fontFamily: "var(--font-noto-serif-jp), serif",
              color: T.muted,
              letterSpacing: "0.1em",
            }}
          >
            {c.ja}
          </span>

          {/* ゴールドの細いライン（下部装飾） */}
          <span
            aria-hidden
            style={{
              marginTop: "12px",
              width: "30px",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
            }}
          />
        </a>
      ))}
    </div>
  )
}
