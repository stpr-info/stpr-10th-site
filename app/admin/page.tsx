import Link from "next/link"
import AdminHeader from "@/components/admin/AdminHeader"
import { TABLES, TABLE_KEYS } from "@/lib/admin/tables"
import { createAdminClient } from "@/lib/supabase/admin"

// 認証・DB 依存のため常に動的レンダリング。
export const dynamic = "force-dynamic"

async function getCounts(): Promise<Record<string, number | null>> {
  const counts: Record<string, number | null> = {}
  try {
    const supabase = createAdminClient()
    await Promise.all(
      TABLE_KEYS.map(async (key) => {
        const { count, error } = await supabase
          .from(key)
          .select("*", { count: "exact", head: true })
        counts[key] = error ? null : (count ?? 0)
      }),
    )
  } catch {
    // 接続未設定などは null（件数不明）として扱う。
    for (const key of TABLE_KEYS) counts[key] = null
  }
  return counts
}

export default async function AdminDashboard() {
  const counts = await getCounts()

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-display text-xl tracking-[0.15em] text-gold-700">
          コンテンツ管理
        </h1>
        <p className="mt-1 text-sm text-[#6a5570]">
          編集したいテーブルを選択してください。
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TABLE_KEYS.map((key) => {
            const cfg = TABLES[key]
            const count = counts[key]
            return (
              <Link
                key={key}
                href={`/admin/${key}`}
                className="flex flex-col gap-1 rounded-2xl border border-gold-200 bg-white/80 p-5 transition-all hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(212,168,83,0.2)]"
              >
                <span className="font-display text-xs uppercase tracking-[0.2em] text-gold-500">
                  {key}
                </span>
                <span className="font-serif text-lg font-bold text-[#3a2540]">
                  {cfg.label}
                </span>
                <span className="text-xs text-[#9a8aa0]">
                  {count === null ? "件数不明" : `${count} 件`}
                </span>
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
