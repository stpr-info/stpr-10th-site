// アルバム情報。実データは帰宅後に投入する。

export type Album = {
  slug: string
  title: string
  releaseDate?: string
  cover?: string // public/images/albums/{slug}.jpg
  trackSlugs: string[]
  description?: string
}

export const ALBUMS: Album[] = [
  // ← 帰宅後に実データを入れる
]
