// 楽曲情報。実データは帰宅後に投入する。

export type SongType = "original" | "cover"

export type Song = {
  slug: string
  title: string
  type: SongType
  releaseDate?: string
  youtubeId?: string // YouTube の v= 以降の ID
  albumSlug?: string
  memberIds?: string[]
  description?: string
}

export const SONGS: Song[] = [
  // ← 帰宅後に実データを入れる
]
