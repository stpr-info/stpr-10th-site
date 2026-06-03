import NavBar from "@/components/common/NavBar"
import Footer from "@/components/common/Footer"

/**
 * 10周年特設サイト共通レイアウト。
 * theme-10th トークンと地のグラデーション背景を適用し、ナビ・フッターを配置する。
 */
export default function TenthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="theme-10th theme-10th-bg flex min-h-screen flex-col font-serif">
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
