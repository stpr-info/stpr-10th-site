import type { ReactNode } from "react"

type Props = {
  /** 英語サブタイトル（例: "LIVE"）。uppercase で表示 */
  subtitle: string
  /** 日本語タイトル（例: "ライブ"） */
  title: string
  /** アクセントカラー（バーのフォールバック色）。省略時はゴールド */
  accentColor?: string
  /** 見出し右側のスロット（"more" リンク等） */
  rightSlot?: ReactNode
  /** 通常版（default）/ compact 版（List View 内の小見出し用） */
  variant?: "default" | "compact"
  /** 下マージン調整用 */
  className?: string
}

/**
 * 統一見出しコンポーネント（既存ファンサイトの SectionHeading と同構造）。
 *
 * 左に縦バー、右に2行テキスト（subtitle 英 + title 日）。絵文字は使わない。
 * 10周年版の差分: 縦バーをゴールド→ローズのグラデーションにし、
 * subtitle をゴールド系・title を Noto Serif JP に変更している。
 */
export default function SectionHeading({
  subtitle,
  title,
  accentColor = "#D4A853",
  rightSlot,
  variant = "default",
  className = "",
}: Props) {
  const barClass = variant === "compact" ? "w-[3px] h-6 md:h-7" : "w-1 h-7 md:h-9"
  const subtitleSize = variant === "compact" ? "text-[10px]" : "text-[11px]"
  const titleSize =
    variant === "compact" ? "text-base md:text-lg" : "text-lg md:text-2xl"

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span
          aria-hidden
          className={`${barClass} rounded-sm shrink-0`}
          style={{
            // ゴールド→ローズのグラデーション。accentColor は単色フォールバック。
            background: `linear-gradient(180deg, ${accentColor} 0%, #F472B6 100%)`,
          }}
        />
        <div className="flex flex-col leading-tight min-w-0">
          <span
            className={`${subtitleSize} font-medium tracking-[0.3em] uppercase text-gold-600 font-display`}
          >
            {subtitle}
          </span>
          <h2
            className={`${titleSize} font-bold text-[#3a2540] font-serif truncate`}
          >
            {title}
          </h2>
        </div>
      </div>
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  )
}
