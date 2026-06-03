import Link from "next/link"

const BASE = "/stpr-10th-anniversary"

// 各カテゴリページへのリンクカード。
const CATEGORIES: { segment: string; en: string; ja: string }[] = [
  { segment: "live", en: "LIVE", ja: "ライブ" },
  { segment: "goods", en: "GOODS", ja: "グッズ" },
  { segment: "event", en: "EVENT", ja: "イベント" },
  { segment: "music", en: "MUSIC", ja: "ミュージック" },
  { segment: "album", en: "ALBUM", ja: "アルバム" },
  { segment: "magazine", en: "MAGAZINE", ja: "雑誌" },
  { segment: "media", en: "MEDIA", ja: "メディア" },
  { segment: "members", en: "MEMBERS", ja: "メンバー" },
]

/** トップのカテゴリグリッド。各ページへの入り口。 */
export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {CATEGORIES.map((c) => (
        <Link
          key={c.segment}
          href={`${BASE}/${c.segment}`}
          className="group relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 px-4 py-8 text-center backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-[0_12px_32px_rgba(212,168,83,0.25)]"
        >
          {/* 額縁風の内側ライン */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-xl border border-gold-200/50 transition-colors group-hover:border-rose-200"
          />
          <span className="font-display text-base tracking-[0.22em] text-gold-600 transition-colors group-hover:text-gold-700">
            {c.en}
          </span>
          <span className="font-serif text-sm text-[#6a5570]">{c.ja}</span>
        </Link>
      ))}
    </div>
  )
}
