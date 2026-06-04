import { buildTweetUrl } from "@/lib/utils"

/**
 * X（旧Twitter）シェアボタン。
 * テンプレート文（ハッシュタグ・URL 込み）を受け取り、intent URL を別タブで開く。
 * サーバーコンポーネントで完結（クリックは通常のリンク遷移）。
 */
export default function ShareButton({
  text,
  label = "Xでシェア",
  className,
}: {
  text: string
  label?: string
  className?: string
}) {
  return (
    <a
      href={buildTweetUrl(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-80"
      }
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
      {label}
    </a>
  )
}
