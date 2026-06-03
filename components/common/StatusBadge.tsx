import type { LiveStatus } from "@/data/lives"

type Props = { status: LiveStatus }

// 既存ファンサイトと同じ配色・ラベル。
const CONFIG: Record<LiveStatus, { label: string; className: string }> = {
  coming: { label: "COMING SOON", className: "bg-slate-500" },
  ongoing: { label: "LIVE NOW", className: "bg-green-500 animate-pulse" },
  finished: { label: "FINISHED", className: "bg-gray-500/80" },
}

/** ライブ等の状態バッジ */
export default function StatusBadge({ status }: Props) {
  const { label, className } = CONFIG[status]
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white ${className}`}
    >
      {label}
    </span>
  )
}
