// グッズ情報。実データは帰宅後に投入する。

export type Goods = {
  slug: string
  title: string
  category: string // "アクリル" | "フォトブック" | "缶バッジ" | "衣装" etc
  releaseDate?: string
  price?: string
  image?: string // public/images/goods/{slug}.jpg
  shopUrl?: string
  description?: string
  memberIds?: string[] // 関連メンバー
}

export const GOODS: Goods[] = [
  // ← 帰宅後に実データを入れる
]
