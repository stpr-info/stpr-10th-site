// STPR 6グループの固定データ。
// 公開 /live ページの GroupTabs と管理フォームの group_slug セレクトで共有する。
// slug は lives.group_slug の値と必ず一致させること（0011_lives_group_slug.sql 参照）。

export type GroupSlug =
  | "Strawberry_Prince"
  | "knightX"
  | "amptak"
  | "Meteorites"
  | "SneakerStep"
  | "True_Lip"

export type GroupInfo = {
  slug: GroupSlug
  /** 表示名（タブのラベル・管理フォームの選択肢ラベル） */
  name: string
  /** テーマカラー（タブのアクティブ枠線色など）。 */
  themeColor: string
}

export const GROUPS: GroupInfo[] = [
  { slug: "Strawberry_Prince", name: "すとぷり", themeColor: "#ff7bac" },
  { slug: "knightX", name: "騎士X", themeColor: "#1f2a44" },
  { slug: "amptak", name: "AMPTAK×COLORS", themeColor: "#e6432b" },
  { slug: "Meteorites", name: "Meteorites", themeColor: "#6a4fb3" },
  { slug: "SneakerStep", name: "すにすて", themeColor: "#1aa1a0" },
  { slug: "True_Lip", name: "とぅるりぷ", themeColor: "#d4448a" },
]

/** slug → グループ情報。未知の slug は undefined。 */
export function getGroup(slug?: string): GroupInfo | undefined {
  if (!slug) return undefined
  return GROUPS.find((g) => g.slug === slug)
}

/** slug → 表示名（未知の slug はそのまま返す）。 */
export function getGroupName(slug?: string): string {
  return getGroup(slug)?.name ?? slug ?? ""
}
