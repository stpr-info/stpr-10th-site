"use client"

import { deleteRecord } from "@/app/admin/crud-actions"

type Props = {
  tableKey: string
  id: string
  label: string // 確認用の行ラベル
}

/** 削除ボタン。確認ダイアログ後に server action を実行する。 */
export default function DeleteButton({ tableKey, id, label }: Props) {
  return (
    <form
      action={deleteRecord.bind(null, tableKey, id)}
      onSubmit={(e) => {
        if (!confirm(`「${label}」を削除します。よろしいですか？`)) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="rounded-full border border-rose-300 px-3 py-1 text-xs text-rose-500 transition-colors hover:bg-rose-50"
      >
        削除
      </button>
    </form>
  )
}
