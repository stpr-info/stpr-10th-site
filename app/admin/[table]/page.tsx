import Link from "next/link"
import { notFound } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import DeleteButton from "@/components/admin/DeleteButton"
import { getTableConfig } from "@/lib/admin/tables"
import { createAdminClient } from "@/lib/supabase/admin"

export const dynamic = "force-dynamic"

/** セル表示用に値を文字列化する。 */
function display(value: unknown): string {
  if (value == null || value === "") return "—"
  if (Array.isArray(value)) return value.length ? value.join(", ") : "—"
  if (typeof value === "boolean") return value ? "はい" : "いいえ"
  return String(value)
}

export default async function AdminTableListPage({
  params,
}: {
  params: Promise<{ table: string }>
}) {
  const { table } = await params
  const cfg = getTableConfig(table)
  if (!cfg) notFound()

  let rows: Record<string, unknown>[] = []
  let loadError: string | null = null
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true })
    if (error) loadError = error.message
    else rows = (data ?? []) as Record<string, unknown>[]
  } catch (e) {
    loadError = e instanceof Error ? e.message : "読み込みに失敗しました。"
  }

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link
              href="/admin"
              className="text-xs tracking-wider text-gold-500 hover:text-gold-700"
            >
              ← ダッシュボード
            </Link>
            <h1 className="mt-1 font-serif text-xl font-bold text-[#3a2540]">
              {cfg.label}
            </h1>
          </div>
          <Link
            href={`/admin/${table}/new`}
            className="rounded-full bg-gold-400 px-6 py-2.5 font-display text-sm tracking-[0.15em] text-white transition-colors hover:bg-gold-500"
          >
            ＋ 新規追加
          </Link>
        </div>

        {loadError && (
          <p className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            読み込みエラー: {loadError}
            <br />
            <span className="text-xs text-rose-400">
              Supabase の設定（URL / SUPABASE_SECRET_KEY）とマイグレーション実行を確認してください。
            </span>
          </p>
        )}

        <div className="mt-6 overflow-x-auto rounded-2xl border border-gold-200 bg-white/80">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gold-200 text-[11px] uppercase tracking-wider text-gold-600">
                {cfg.listColumns.map((col) => (
                  <th key={col} className="px-4 py-3 font-medium">
                    {cfg.fields.find((f) => f.name === col)?.label ?? col}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={cfg.listColumns.length + 1}
                    className="px-4 py-10 text-center text-[#9a8aa0]"
                  >
                    データがありません。「＋ 新規追加」から登録してください。
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  const id = String(row.id)
                  const title = display(row[cfg.titleField])
                  return (
                    <tr
                      key={id}
                      className="border-b border-gold-100 last:border-0"
                    >
                      {cfg.listColumns.map((col) => (
                        <td key={col} className="px-4 py-3 text-[#3a2540]">
                          {display(row[col])}
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/${table}/${id}/edit`}
                            className="rounded-full border border-gold-300 px-3 py-1 text-xs text-gold-700 transition-colors hover:bg-gold-50"
                          >
                            編集
                          </Link>
                          <DeleteButton tableKey={table} id={id} label={title} />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
