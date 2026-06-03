import Link from "next/link"
import type { Event } from "@/data/events"
import SafeImage from "@/components/common/SafeImage"

const BASE = "/stpr-10th-anniversary"

/** イベント一覧のカード */
export default function EventCard({ event }: { event: Event }) {
  return (
    <Link
      href={`${BASE}/event/${event.slug}`}
      className="group flex gap-4 overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 p-3 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(212,168,83,0.22)]"
    >
      <div
        className="relative shrink-0 overflow-hidden rounded-xl"
        style={{ width: 96, aspectRatio: "1/1" }}
      >
        <SafeImage
          src={event.image}
          alt={event.title}
          fill
          fallbackLabel="EVENT"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="96px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 py-1">
        <h3 className="font-serif text-sm font-bold leading-snug text-[#3a2540]">
          {event.title}
        </h3>
        <p className="text-xs text-[#6a5570]">{event.dateLabel}</p>
        {event.location && (
          <p className="text-xs text-[#9a8aa0]">{event.location}</p>
        )}
      </div>
    </Link>
  )
}
