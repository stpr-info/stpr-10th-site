// イベント情報。実データは帰宅後に投入する。

export type Event = {
  slug: string
  title: string
  eventType: string // "コラボカフェ" | "コラボキャンペーン" | "ポップアップ" etc
  dateLabel: string
  startDate?: string
  endDate?: string
  location?: string
  url?: string
  image?: string // public/images/events/{slug}.jpg
  description?: string
}

export const EVENTS: Event[] = [
  // ← 帰宅後に実データを入れる
]
