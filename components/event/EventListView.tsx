import { EVENTS } from "@/data/events"
import EventCard from "./EventCard"
import SectionHeading from "@/components/common/SectionHeading"
import EmptyState from "@/components/common/EmptyState"

/** イベント一覧（eventType 別セクション） */
export default function EventListView() {
  if (EVENTS.length === 0) {
    return <EmptyState label="イベント情報を準備中です" />
  }

  // eventType ごとにグループ化（出現順を維持）。
  const groups: { type: string; items: typeof EVENTS }[] = []
  for (const ev of EVENTS) {
    let g = groups.find((x) => x.type === ev.eventType)
    if (!g) {
      g = { type: ev.eventType, items: [] }
      groups.push(g)
    }
    g.items.push(ev)
  }

  return (
    <div className="flex flex-col gap-12">
      {groups.map((g) => (
        <section key={g.type} className="flex flex-col gap-5">
          <SectionHeading subtitle="EVENT" title={g.type} variant="compact" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {g.items.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
