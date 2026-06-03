import type { ReactNode } from "react"
import SectionHeading from "./SectionHeading"

type Props = {
  subtitle: string
  title: string
  children: ReactNode
}

/** 一覧ページ共通の外枠（見出し + コンテンツ） */
export default function PageContainer({ subtitle, title, children }: Props) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16">
      <SectionHeading subtitle={subtitle} title={title} />
      {children}
    </div>
  )
}
