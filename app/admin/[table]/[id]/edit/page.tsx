import Link from "next/link"
import { notFound } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import RecordForm from "@/components/admin/RecordForm"
import { getTableConfig } from "@/lib/admin/tables"
import { createAdminClient } from "@/lib/supabase/admin"
import { updateRecord } from "@/app/admin/crud-actions"

export const dynamic = "force-dynamic"

export default async function AdminEditRecordPage({
  params,
}: {
  params: Promise<{ table: string; id: string }>
}) {
  const { table, id } = await params
  const cfg = getTableConfig(table)
  if (!cfg) notFound()

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    return (
      <>
        <AdminHeader />
        <main className="mx-auto max-w-2xl px-6 py-10">
          <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
            読み込みエラー: {error.message}
          </p>
        </main>
      </>
    )
  }
  if (!data) notFound()

  // table / id を束縛した更新アクション。
  const action = updateRecord.bind(null, table, id)

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-2xl px-6 py-10">
        <Link
          href={`/admin/${table}`}
          className="text-xs tracking-wider text-gold-500 hover:text-gold-700"
        >
          ← {cfg.label}一覧
        </Link>
        <h1 className="mt-1 mb-8 font-serif text-xl font-bold text-[#3a2540]">
          {cfg.label}を編集
        </h1>

        <RecordForm
          action={action}
          fields={cfg.fields}
          initial={data as Record<string, unknown>}
          submitLabel="更新する"
          cancelHref={`/admin/${table}`}
        />
      </main>
    </>
  )
}
