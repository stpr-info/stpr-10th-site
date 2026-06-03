import type { Metadata } from "next"
import { Noto_Serif_JP, Cinzel, Cormorant_Garamond } from "next/font/google"
import "./globals.css"

// 和文見出し: Noto Serif JP
const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
})

// 欧文ロゴ・ナビ: Cinzel（時計塔・ロイヤル感）
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
})

// 欧文サブ: Cormorant Garamond（繊細なセリフ）
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

export const metadata: Metadata = {
  title: "すとぷり 10th Anniversary",
  description:
    "すとぷり 10周年を記念した特設サイト。ライブ・グッズ・イベント・ミュージックなどの情報をお届けします。",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerifJP.variable} ${cinzel.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  )
}
