// NEWS 機能のダミーデータと型。後で microCMS と接続する想定。
// グループ定義は data/groups.ts を再利用する。
import type { GroupSlug } from "./groups"

export type NewsCategory = "live" | "goods" | "ticket" | "media" | "other"

export const NEWS_CATEGORIES: { key: NewsCategory; label: string }[] = [
  { key: "live", label: "ライブ" },
  { key: "goods", label: "グッズ" },
  { key: "ticket", label: "チケット" },
  { key: "media", label: "メディア" },
  { key: "other", label: "その他" },
]

export function newsCategoryLabel(c: NewsCategory): string {
  return NEWS_CATEGORIES.find((x) => x.key === c)?.label ?? c
}

export type NewsPost = {
  id: string
  title: string
  category: NewsCategory
  groupSlug: GroupSlug
  /** 公開日時（ISO） */
  publishedAt: string
  /** 一覧・フィーチャー用の要約 */
  excerpt: string
  /** 本文（HTML可。今はプレーン段落） */
  body: string
  thumbnail?: string
  /** 速報として配信 */
  isBreaking?: boolean
  /** 注目ニュース */
  isFeatured?: boolean
  /** ネタバレ注意 */
  spoiler?: boolean
  /** 投稿者表示名 */
  author?: string
}

// ── ダミー記事（today=2026-06-13 想定） ──
export const NEWS_POSTS: NewsPost[] = [
  {
    id: "13",
    title: "すとぷり話しタイム 開催決定！",
    category: "live",
    groupSlug: "Strawberry_Prince",
    publishedAt: "2026-04-21T23:49:00+09:00",
    excerpt:
      "すとぷりが贈る新企画「話しタイム」の開催が決定しました。4月20日（月）19:00より配信予定。詳細はこちらから。",
    body: "すとぷりが贈る新企画「話しタイム」の開催が決定しました。\n4月20日（月）19:00より公式チャンネルにて配信予定です。\nメンバーがゆるっと近況を語る回となります。お楽しみに！",
    isBreaking: true,
    isFeatured: true,
    author: "STPR運営",
  },
  {
    id: "12",
    title: "We are SneakerStep! -2nd Step- グッズ情報解禁",
    category: "goods",
    groupSlug: "SneakerStep",
    publishedAt: "2026-06-13T01:19:00+09:00",
    excerpt: "ツアー「We are SneakerStep! -2nd Step-」のオフィシャルグッズ全ラインナップを公開しました。",
    body: "全国ツアー「We are SneakerStep! -2nd Step-」のオフィシャルグッズ情報を解禁しました。\nランダム缶バッジ、ホログラムカード、ジャンボうちわほか多数を会場・通販で展開します。",
    isBreaking: true,
    author: "STPR運営",
  },
  {
    id: "11",
    title: "すにすて 2nd ワンマンライブ開催決定！",
    category: "live",
    groupSlug: "SneakerStep",
    publishedAt: "2026-04-21T14:15:00+09:00",
    excerpt: "SneakerStep 初の全国ツアー開催が決定。チケット先行受付の詳細は近日公開。",
    body: "SneakerStep にとって2度目、初の全国ツアーとなるワンマンライブの開催が決定しました。\nROOMMATES 最速先行の受付は近日開始予定です。",
    author: "STPR運営",
  },
  {
    id: "10",
    title: "騎士X 新ビジュアル公開",
    category: "media",
    groupSlug: "knightX",
    publishedAt: "2026-06-10T18:00:00+09:00",
    excerpt: "騎士X の新アーティスト写真を公開しました。",
    body: "騎士X の新しいアーティスト写真を公開しました。各メンバーのソロカットも順次公開予定です。",
    author: "STPR運営",
  },
  {
    id: "9",
    title: "AMPTAK×COLORS 新曲配信スタート",
    category: "media",
    groupSlug: "amptak",
    publishedAt: "2026-06-08T12:00:00+09:00",
    excerpt: "AMPTAK×COLORS の新曲が各配信サービスでリリースされました。",
    body: "AMPTAK×COLORS の最新曲が本日より各種音楽配信サービスでリリースされました。MV も公開中です。",
    author: "STPR運営",
  },
  {
    id: "8",
    title: "Meteorites グッズ再販のお知らせ",
    category: "goods",
    groupSlug: "Meteorites",
    publishedAt: "2026-06-05T10:00:00+09:00",
    excerpt: "好評につき完売していたMeteoritesグッズの再販が決定しました。",
    body: "好評につき一時完売していた Meteorites のオフィシャルグッズについて、再販が決定しました。STPR ONLINE STORE にて受付中です。",
    author: "STPR運営",
  },
  {
    id: "7",
    title: "とぅるりぷ 初ライブチケット一般販売開始",
    category: "ticket",
    groupSlug: "True_Lip",
    publishedAt: "2026-06-03T10:00:00+09:00",
    excerpt: "とぅるりぷ 初ワンマンのチケット一般販売がスタートしました。",
    body: "とぅるりぷ 初のワンマンライブについて、チケットの一般販売を開始しました。各プレイガイドにてお求めください。",
    author: "STPR運営",
  },
  {
    id: "6",
    title: "すとぷり 公式グッズ 夏の新作登場",
    category: "goods",
    groupSlug: "Strawberry_Prince",
    publishedAt: "2026-05-30T17:00:00+09:00",
    excerpt: "すとぷりの夏グッズ新作が登場。涼しげなデザインでお届けします。",
    body: "すとぷりの夏グッズ新作が登場しました。タオルやうちわなど、夏フェスにぴったりのアイテムを多数ご用意しています。",
    author: "STPR運営",
  },
  {
    id: "5",
    title: "すとぷり TVアニメタイアップ決定",
    category: "media",
    groupSlug: "Strawberry_Prince",
    publishedAt: "2026-05-22T20:00:00+09:00",
    excerpt: "すとぷりの楽曲がTVアニメのタイアップ曲に決定しました。",
    body: "すとぷりの楽曲が話題のTVアニメのオープニングテーマに起用されることが決定しました。放送開始をお楽しみに。",
    author: "STPR運営",
  },
  {
    id: "4",
    title: "STPR FAMILY 合同イベント開催のお知らせ",
    category: "live",
    groupSlug: "Strawberry_Prince",
    publishedAt: "2026-05-15T19:00:00+09:00",
    excerpt: "STPR FAMILY 全グループ参加の合同イベント開催が決定しました。",
    body: "STPR FAMILY 全グループが集結する合同イベントの開催が決定しました。チケット情報は追ってお知らせします。",
    isFeatured: true,
    author: "STPR運営",
  },
  {
    id: "3",
    title: "AMPTAK×COLORS グッズ受注販売開始",
    category: "goods",
    groupSlug: "amptak",
    publishedAt: "2026-05-10T10:00:00+09:00",
    excerpt: "AMPTAK×COLORS の受注限定グッズの販売を開始しました。",
    body: "AMPTAK×COLORS の受注生産限定グッズの受付を開始しました。期間限定ですのでお早めにどうぞ。",
    author: "STPR運営",
  },
  {
    id: "2",
    title: "騎士X ラジオレギュラー番組スタート",
    category: "media",
    groupSlug: "knightX",
    publishedAt: "2026-05-02T22:00:00+09:00",
    excerpt: "騎士X のレギュラーラジオ番組が放送開始。毎週金曜お届けします。",
    body: "騎士X のレギュラーラジオ番組がスタートしました。毎週金曜の夜にお届けします。メッセージも募集中です。",
    author: "STPR運営",
  },
]

/** 公開日時の新しい順にソートして返す。 */
export function getNewsPosts(): NewsPost[] {
  return [...NEWS_POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}
