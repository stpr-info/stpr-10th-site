import Link from "next/link"

const BASE = "/stpr-10th-anniversary"

// 画面下部スライダーの項目。id="" は TOP（ページ先頭）。
const ITEMS: { label: string; id: string }[] = [
  { label: "TOP", id: "" },
  { label: "LIVE", id: "live" },
  { label: "EVENT", id: "event" },
  { label: "GOODS", id: "goods" },
  { label: "MUSIC", id: "music" },
  { label: "ALBUM", id: "album" },
  { label: "MAGAZINE", id: "magazine" },
  { label: "MEDIA", id: "media" },
]

/**
 * SP（スマホ）専用の画面下部ナビゲーション。
 * - 横スクロール可能なスライダー式（ピンク〜ゴールドのピル）
 * - 各項目タップで TOP ページの該当セクションへアンカースクロール
 *   （他ページからは TOP へ遷移してからスクロール）
 * - MUSIC / ALBUM はデータがある場合のみ表示
 * - md 以上では非表示（PC はヘッダーナビを使用）
 */
export default function BottomNav({
  hasMusic,
  hasAlbum,
}: {
  hasMusic: boolean
  hasAlbum: boolean
}) {
  const items = ITEMS.filter((it) => {
    if (it.id === "music") return hasMusic
    if (it.id === "album") return hasAlbum
    return true
  })

  return (
    <nav
      aria-label="セクションナビ"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-gold-200/70 bg-white/85 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-center gap-2 overflow-x-auto px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it) => (
          <li key={it.label} className="shrink-0">
            <Link
              href={it.id ? `${BASE}#${it.id}` : BASE}
              className="block whitespace-nowrap rounded-full border border-gold-300/70 bg-gradient-to-r from-rose-100 to-gold-100 px-4 py-1.5 font-display text-xs tracking-[0.15em] text-gold-700 transition-colors active:from-rose-200 active:to-gold-200"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
