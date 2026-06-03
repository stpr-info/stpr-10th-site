import Link from "next/link"
import type { Live } from "@/data/lives"
import { getLiveStatus } from "@/lib/utils"
import SafeImage from "@/components/common/SafeImage"
import StatusBadge from "@/components/common/StatusBadge"

const BASE = "/stpr-10th-anniversary"

/** ライブ一覧のカード */
export default function LiveCard({ live }: { live: Live }) {
  // startDate があれば日付から再判定、無ければデータの status を使う。
  const status = live.startDate
    ? getLiveStatus(live.startDate, live.endDate)
    : live.status

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(212,168,83,0.22)]">
      {/* キービジュアル */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <SafeImage
          src={live.keyVisual}
          alt={live.title}
          fill
          fallbackLabel="LIVE"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={status} />
        </div>
      </div>

      {/* 本文 */}
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-base font-bold leading-snug text-[#3a2540]">
          {live.title}
        </h3>
        <p className="text-sm text-[#6a5570]">{live.dateLabel}</p>
        {live.venues.length > 0 && (
          <p className="text-xs text-[#9a8aa0]">
            {live.venues.map((v) => v.name).join(" / ")}
          </p>
        )}
        <Link
          href={`${BASE}/live/${live.slug}`}
          className="mt-auto pt-3 font-display text-xs tracking-[0.15em] text-gold-600 transition-colors hover:text-gold-700"
        >
          詳細を見る →
        </Link>
      </div>
    </article>
  )
}
