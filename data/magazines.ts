// 雑誌情報。実データは帰宅後に投入する。

export type Magazine = {
  id: string
  name: string // 雑誌名
  issue: string // "2026年7月号" etc
  releaseDate?: string
  publisher?: string
  content?: string // "表紙・巻頭特集" etc
  image?: string
  images?: string[] // 画像ギャラリー（表紙以外の複数画像）
  status?: string // "released" / "upcoming"
  url?: string
}

export const MAGAZINES: Magazine[] = [
  // ← 帰宅後に実データを入れる
]
