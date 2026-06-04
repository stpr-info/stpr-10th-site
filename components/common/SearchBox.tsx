const BASE = "/stpr-10th-anniversary"

/**
 * サイト内検索ボックス。
 * GET フォームで /stpr-10th-anniversary/search?q=... へ遷移する（JS 不要）。
 * ヘッダー（NavBar）・モバイルバー・検索結果ページで共用する。
 */
export default function SearchBox({
  defaultValue = "",
  className,
  autoFocus = false,
}: {
  defaultValue?: string
  className?: string
  autoFocus?: boolean
}) {
  return (
    <form
      action={`${BASE}/search`}
      role="search"
      className={`flex items-center gap-1 rounded-full border border-gold-200 bg-white/80 px-3 py-1 ${className ?? ""}`}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 text-gold-500"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        placeholder="検索…"
        aria-label="サイト内検索"
        className="w-full min-w-0 bg-transparent text-sm text-[#3a2540] outline-none placeholder:text-[#b8a8be]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full px-2 py-0.5 text-xs font-bold text-gold-700 transition-colors hover:text-gold-500"
        aria-label="検索する"
      >
        検索
      </button>
    </form>
  )
}
