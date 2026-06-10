import Link from "next/link"
import type { ReactNode } from "react"

type Props = {
  href: string
  image?: string
  label: string // 例: "最新LIVE"
  title: string
  meta?: ReactNode // 日付・期間など
  badges?: ReactNode // ステータスバッジ等（右上）
}

/**
 * 一覧上部の大きなフィーチャーバナー（最新ライブの KV）。
 * aspect ユーティリティは Tailwind v4 + Turbopack で効かないことがあるため
 * style={{ aspectRatio }} を使う。
 */
export default function FeaturedBanner({ href, image, label, title, meta, badges }: Props) {
  return (
    <Link
      href={href}
      className="group relative mb-6 block overflow-hidden rounded-2xl shadow-sm"
    >
      <div
        style={{ aspectRatio: "16 / 9" }}
        className="relative w-full bg-gray-900"
      >
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-accent-400 to-accent-700" />
        )}
        {/* 下方向グラデーション（テキスト可読性向上） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute left-3 top-3 rounded-full bg-accent-600 px-2.5 py-1 text-[10px] font-bold whitespace-nowrap text-white shadow md:left-4 md:top-4 md:px-3 md:py-1.5 md:text-xs">
          {label}
        </div>
        {badges && (
          <div className="absolute right-3 top-3 flex max-w-[60%] flex-wrap justify-end gap-1.5 md:right-4 md:top-4">
            {badges}
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 text-white md:bottom-4 md:left-4 md:right-4">
          <h2 className="line-clamp-2 text-sm font-bold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-lg">
            {title}
          </h2>
          {meta && (
            <p className="mt-0.5 text-[11px] opacity-95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] md:mt-1 md:text-xs">
              {meta}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}
