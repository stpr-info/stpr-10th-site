import { buildMapsEmbedUrl } from "@/lib/utils"

/**
 * Google Maps 埋め込み（iframe）。会場名などの文字列をそのまま検索クエリに使う。
 * SP でも見やすいよう高さは可変（aspect-ratio）。query が空なら描画しない。
 */
export default function VenueMap({ query, title }: { query?: string; title?: string }) {
  const q = (query ?? "").trim()
  if (!q) return null

  return (
    <div className="overflow-hidden rounded-lg border border-gold-100">
      <iframe
        src={buildMapsEmbedUrl(q)}
        title={title ?? `${q} の地図`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-56 w-full sm:h-72"
        style={{ border: 0 }}
      />
    </div>
  )
}
