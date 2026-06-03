import Link from "next/link"

/** セクション下部の「もっと見る」ボタン（全件ページへ）。 */
export default function MoreLink({
  href,
  label = "もっと見る",
}: {
  href: string
  label?: string
}) {
  return (
    <div className="mt-6 text-center">
      <Link
        href={href}
        className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-white/70 px-6 py-2 font-display text-xs tracking-[0.15em] text-gold-700 transition-colors hover:bg-gold-50"
      >
        {label}
        <span aria-hidden>→</span>
      </Link>
    </div>
  )
}
