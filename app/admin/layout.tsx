// 管理画面共通レイアウト。公開サイトのテーマとは分離した中立的な見た目。
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-gold-50/40 font-serif">{children}</div>
}
