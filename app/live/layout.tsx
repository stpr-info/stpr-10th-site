import type { Metadata } from "next"
import LiveHeader from "@/components/layout/LiveHeader"
import LiveFooter from "@/components/layout/LiveFooter"

export const metadata: Metadata = {
  title: "ライブ",
  description: "すとぷり・騎士X・AMPTAK×COLORS ほか STPR 各グループのライブ情報。",
}

/**
 * 公開 /live セクション専用レイアウト。
 * ファンサイト共通のヘッダー（ロゴ＋2段ナビ）／フッター。サイドバーなし。
 */
export default function LiveLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-gray-50 text-gray-900">
      <LiveHeader />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-8 lg:px-8">{children}</main>
      <LiveFooter />
    </div>
  )
}
