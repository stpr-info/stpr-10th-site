// 管理画面のスキーマ定義。
// ここのフィールド定義が一覧・フォーム・保存処理（型変換）すべての源になる。
// DB 列は snake_case（supabase/migrations/0001_init.sql と対応）。

export type FieldType =
  | "text"
  | "textarea"
  | "date"
  | "select"
  | "boolean"
  | "csv" // カンマ区切り → text[]
  | "json" // 生 JSON → jsonb
  | "number"

export type Field = {
  name: string // DB 列名
  label: string // 表示ラベル（日本語）
  type: FieldType
  required?: boolean
  options?: string[] // select 用
  placeholder?: string
  help?: string
}

export type TableConfig = {
  key: string // ルート & DB テーブル名
  label: string // 日本語名
  fields: Field[]
  listColumns: string[] // 一覧に出す列
  titleField: string // 行の代表表示に使う列
}

export const TABLES: Record<string, TableConfig> = {
  lives: {
    key: "lives",
    label: "ライブ",
    titleField: "title",
    listColumns: ["title", "date_label", "status"],
    fields: [
      { name: "slug", label: "スラッグ（URL）", type: "text", required: true, placeholder: "anniv-tour-2026" },
      { name: "title", label: "タイトル", type: "text", required: true },
      { name: "date_label", label: "日程ラベル", type: "text", placeholder: "2026年6月4日〜6日" },
      { name: "start_date", label: "開始日", type: "date" },
      { name: "end_date", label: "終了日", type: "date" },
      {
        name: "venues",
        label: "会場（JSON配列）",
        type: "json",
        help: '例: [{"name":"東京ドーム","prefecture":"東京","date":"2026-06-04","partLabel":"昼の部"}]',
      },
      { name: "status", label: "ステータス", type: "select", options: ["coming", "ongoing", "finished"], required: true },
      { name: "key_visual", label: "キービジュアル画像URL", type: "text", placeholder: "/images/lives/xxx.jpg" },
      { name: "ticket_url", label: "チケットURL", type: "text" },
      { name: "description", label: "説明", type: "textarea" },
      { name: "note", label: "備考", type: "textarea" },
      { name: "is_10th", label: "10周年関連", type: "boolean" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  goods: {
    key: "goods",
    label: "グッズ",
    titleField: "title",
    listColumns: ["title", "category", "release_date"],
    fields: [
      { name: "slug", label: "スラッグ（URL）", type: "text", required: true },
      { name: "title", label: "タイトル", type: "text", required: true },
      { name: "category", label: "カテゴリ", type: "text", required: true, placeholder: "アクリル / 缶バッジ 等" },
      { name: "release_date", label: "発売日", type: "date" },
      { name: "price", label: "価格", type: "text", placeholder: "¥1,500" },
      { name: "image", label: "画像URL", type: "text", placeholder: "/images/goods/xxx.jpg" },
      { name: "shop_url", label: "購入URL", type: "text" },
      { name: "description", label: "説明", type: "textarea" },
      { name: "member_ids", label: "関連メンバーID（カンマ区切り）", type: "csv", placeholder: "rinu, root" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  events: {
    key: "events",
    label: "イベント",
    titleField: "title",
    listColumns: ["title", "event_type", "date_label"],
    fields: [
      { name: "slug", label: "スラッグ（URL）", type: "text", required: true },
      { name: "title", label: "タイトル", type: "text", required: true },
      { name: "event_type", label: "イベント種別", type: "text", required: true, placeholder: "コラボカフェ 等" },
      { name: "date_label", label: "日程ラベル", type: "text" },
      { name: "start_date", label: "開始日", type: "date" },
      { name: "end_date", label: "終了日", type: "date" },
      { name: "location", label: "場所", type: "text" },
      { name: "url", label: "URL", type: "text" },
      { name: "image", label: "画像URL", type: "text", placeholder: "/images/events/xxx.jpg" },
      { name: "description", label: "説明", type: "textarea" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  songs: {
    key: "songs",
    label: "楽曲",
    titleField: "title",
    listColumns: ["title", "type", "release_date"],
    fields: [
      { name: "slug", label: "スラッグ（URL）", type: "text", required: true },
      { name: "title", label: "タイトル", type: "text", required: true },
      { name: "type", label: "種別", type: "select", options: ["original", "cover"], required: true },
      { name: "release_date", label: "配信日", type: "date" },
      { name: "youtube_id", label: "YouTube動画ID", type: "text", placeholder: "v= 以降のID" },
      { name: "album_slug", label: "所属アルバムのスラッグ", type: "text" },
      { name: "member_ids", label: "関連メンバーID（カンマ区切り）", type: "csv" },
      { name: "description", label: "説明", type: "textarea" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  albums: {
    key: "albums",
    label: "アルバム",
    titleField: "title",
    listColumns: ["title", "release_date"],
    fields: [
      { name: "slug", label: "スラッグ（URL）", type: "text", required: true },
      { name: "title", label: "タイトル", type: "text", required: true },
      { name: "release_date", label: "発売日", type: "date" },
      { name: "cover", label: "カバー画像URL", type: "text", placeholder: "/images/albums/xxx.jpg" },
      { name: "track_slugs", label: "収録曲スラッグ（カンマ区切り）", type: "csv", help: "songs のスラッグを順番に" },
      { name: "description", label: "説明", type: "textarea" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  magazines: {
    key: "magazines",
    label: "雑誌",
    titleField: "name",
    listColumns: ["name", "issue", "release_date"],
    fields: [
      { name: "name", label: "雑誌名", type: "text", required: true },
      { name: "issue", label: "号", type: "text", placeholder: "2026年7月号" },
      { name: "release_date", label: "発売日", type: "date" },
      { name: "publisher", label: "出版社", type: "text" },
      { name: "content", label: "内容", type: "textarea", placeholder: "表紙・巻頭特集 等" },
      { name: "image", label: "画像URL", type: "text" },
      { name: "url", label: "URL", type: "text" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },

  media: {
    key: "media",
    label: "メディア",
    titleField: "program_name",
    listColumns: ["program_name", "station", "date_label"],
    fields: [
      { name: "type", label: "種別", type: "select", options: ["tv", "radio"], required: true },
      { name: "program_name", label: "番組名", type: "text", required: true },
      { name: "station", label: "放送局", type: "text", required: true },
      { name: "date_label", label: "放送日ラベル", type: "text", placeholder: "2026年6月4日" },
      { name: "content", label: "出演内容", type: "textarea" },
      { name: "url", label: "URL", type: "text" },
      { name: "sort_order", label: "並び順", type: "number" },
    ],
  },
}

export const TABLE_KEYS = Object.keys(TABLES)

export function getTableConfig(key: string): TableConfig | undefined {
  return TABLES[key]
}
