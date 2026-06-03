// ライブ情報。実データは帰宅後に投入する。

export type LiveStatus = "coming" | "ongoing" | "finished"

export type Venue = {
  name: string // 会場名
  prefecture: string // 都道府県
  date?: string // 公演日
  partLabel?: string // "昼の部" 等
}

export type Live = {
  slug: string
  title: string
  dateLabel: string // 表示用日程文字列
  startDate?: string // "2026-06-04" ISO形式
  endDate?: string
  venues: Venue[]
  status: LiveStatus
  keyVisual?: string // public/images/lives/{slug}.jpg
  ticketUrl?: string
  description?: string
  note?: string
  is10th?: boolean // 10周年関連フラグ
}

export const LIVES: Live[] = [
  // ← 帰宅後に実データを入れる
]
