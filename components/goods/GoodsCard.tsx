import Link from "next/link"
import type { Goods } from "@/data/goods"
import { formatDate } from "@/lib/utils"
import SafeImage from "@/components/common/SafeImage"

const BASE = "/stpr-10th-anniversary"

/** グッズ一覧のカード */
export default function GoodsCard({ goods }: { goods: Goods }) {
  return (
    <Link
      href={`${BASE}/goods/${goods.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(212,168,83,0.22)]"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1/1" }}>
        <SafeImage
          src={goods.image}
          alt={goods.title}
          fill
          fallbackLabel="GOODS"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 50vw"
        />
        <span className="absolute left-2 top-2 rounded-full bg-gold-400/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
          {goods.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-serif text-sm font-bold leading-snug text-[#3a2540]">
          {goods.title}
        </h3>
        {goods.releaseDate && (
          <p className="mt-auto pt-1 text-xs text-[#9a8aa0]">
            {formatDate(goods.releaseDate)}
          </p>
        )}
      </div>
    </Link>
  )
}
