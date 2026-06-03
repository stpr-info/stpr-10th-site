import type { ReactNode } from "react"
import SectionHeading from "./SectionHeading"
import { T } from "@/lib/theme"

type Props = {
  /** アンカー用 id（例: "live"）。CategoryGrid のリンク先と一致させる。 */
  id?: string
  /** 英語サブタイトル（例: "LIVE"） */
  subtitle: string
  /** 日本語タイトル（例: "ライブ"） */
  title: string
  /** 背景トーン。セクションを交互に切り替えて区切りを出す。 */
  tone?: "white" | "pearl"
  children: ReactNode
}

/**
 * TOP ページ各セクションの共通ラッパー。
 * - SectionHeading で見出しを表示
 * - 背景色を白 / pearl で交互に切り替え
 * - padding 64px 20px / maxWidth 1200px 中央寄せ
 * - 「すべて見る →」リンクは無し（TOP で全件表示するため）
 */
export default function Section({ id, subtitle, title, tone = "white", children }: Props) {
  return (
    <section
      id={id}
      className="px-4 py-8 sm:px-5 sm:py-10 md:scroll-mt-[72px]"
      style={{ background: tone === "pearl" ? T.pearl : "#ffffff" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <SectionHeading subtitle={subtitle} title={title} className="mb-5 sm:mb-8" />
        {children}
      </div>
    </section>
  )
}
