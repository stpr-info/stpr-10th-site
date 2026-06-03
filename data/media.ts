// メディア出演情報。実データは帰宅後に投入する。

export type MediaType = "tv" | "radio"

export type Media = {
  id: string
  type: MediaType
  programName: string // 番組名
  station: string // 放送局
  dateLabel: string // "2026年6月4日" etc
  content?: string // 出演内容メモ
  url?: string
}

export const MEDIA: Media[] = [
  // ← 帰宅後に実データを入れる
]
