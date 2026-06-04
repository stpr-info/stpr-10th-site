import { buildGoogleCalendarUrl } from "@/lib/utils"

/**
 * Googleカレンダー「予定を追加」ボタン。
 * 開始日が解釈できない場合は何も描画しない（null）。別タブで開く。
 */
export default function GoogleCalendarButton({
  title,
  start,
  end,
  details,
  location,
  label = "カレンダーに追加",
  className,
}: {
  title: string
  start?: string
  end?: string
  details?: string
  location?: string
  label?: string
  className?: string
}) {
  const url = buildGoogleCalendarUrl({ title, start, end, details, location })
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-4 py-2 text-xs font-bold text-gold-700 transition-colors hover:bg-gold-50"
      }
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
      {label}
    </a>
  )
}
