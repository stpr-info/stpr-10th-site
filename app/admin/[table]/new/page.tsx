import Link from "next/link"
import { notFound } from "next/navigation"
import AdminHeader from "@/components/admin/AdminHeader"
import RecordForm from "@/components/admin/RecordForm"
import { getTableConfig } from "@/lib/admin/tables"
import { createRecord } from "@/app/admin/crud-actions"

export const dynamic = "force-dynamic"

export default async function AdminNewRecordPage({
  params,
}: {
  params: Promise<{ table: string }>
}) {
  const { table } = await params
  const cfg = getTableConfig(table)
  if (!cfg) notFound()

  // table を束縛した作成アクション。
  const action = createRecord.bind(null, table)

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
          {cfg.label}を追加
        </h1>

        <RecordForm
          action={action}
          fields={cfg.fields}
          submitLabel="追加する"
          cancelHref={`/admin/${table}`}
        />
      </main>
    </>
  )
}
