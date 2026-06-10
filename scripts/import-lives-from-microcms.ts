/**
 * microCMS lives API → Supabase lives テーブル 取込スクリプト
 * ------------------------------------------------------------------
 * microCMS から lives を全件取得し、microcms_id をキーに Supabase へ upsert する。
 * （既存は上書き / 新規は insert）
 *
 * 実行方法（どちらでも可）:
 *   npx tsx scripts/import-lives-from-microcms.ts
 *   node --import tsx scripts/import-lives-from-microcms.ts
 *
 * 事前準備:
 *   - .env.local に下記4つが設定されていること（このスクリプトが dotenv で読む）
 *       MICROCMS_SERVICE_DOMAIN
 *       MICROCMS_API_KEY
 *       NEXT_PUBLIC_SUPABASE_URL
 *       SUPABASE_SECRET_KEY
 *   - Supabase 側で 0011 / 0012 マイグレーション実行済みであること
 *     （microcms_id の unique 制約が upsert の conflict キーに必要）
 *
 * 依存:
 *   - dotenv（.env.local 読み込み）
 *   - @supabase/supabase-js（既存）
 *   - microCMS は SDK を使わず fetch で直接叩く
 * ------------------------------------------------------------------
 */

import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

// .env.local を読む（.env ではなく .env.local を明示）
dotenv.config({ path: ".env.local" })

// ── 環境変数 ───────────────────────────────────────────────────────
const MICROCMS_SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN
const MICROCMS_API_KEY = process.env.MICROCMS_API_KEY
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY

if (!MICROCMS_SERVICE_DOMAIN || !MICROCMS_API_KEY) {
  console.error("MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY が .env.local にありません。")
  process.exit(1)
}
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY が .env.local にありません。")
  process.exit(1)
}

// ── 型（最低限・microCMS 側は緩く any 扱い） ───────────────────────
type MicroCmsImage = { url?: string; height?: number; width?: number }
type MicroCmsRef = { slug?: string } & Record<string, unknown>
type MicroCmsLive = {
  id: string
  title?: string
  slug?: string
  hashtag?: string
  liveType?: string | string[]
  periodStart?: string
  periodEnd?: string
  keyVisual?: MicroCmsImage
  description?: string
  group?: MicroCmsRef[]
  members?: MicroCmsRef[]
  venues?: unknown[]
  ticketInfo?: unknown[]
  fcInfo?: unknown[]
  ticketLineup?: unknown[]
  goodsInfo?: unknown[]
  upgradeGoodsInfo?: unknown[]
  ppvInfo?: unknown[]
  liveViewing?: unknown[]
  relatedLives?: MicroCmsRef[]
  relatedAlbums?: MicroCmsRef[]
  officialSiteUrl?: string
  officialPlaylistUrl?: string
  officialReportUrl?: string
  hasReport?: boolean
  reportGallery?: unknown[]
  isActive?: boolean
} & Record<string, unknown>

type MicroCmsListResponse = {
  contents: MicroCmsLive[]
  totalCount: number
  offset: number
  limit: number
}

// ── ヘルパ ─────────────────────────────────────────────────────────
/** 単一値/配列/未定義 を必ず配列にする。 */
function toArray<T>(v: unknown): T[] {
  if (Array.isArray(v)) return v as T[]
  if (v == null) return []
  return [v as T]
}

/** 参照フィールド配列から slug を抽出する（null/空は除外）。 */
function refSlugs(refs: unknown): string[] {
  return toArray<MicroCmsRef>(refs)
    .map((r) => (r && typeof r === "object" ? r.slug : undefined))
    .filter((s): s is string => typeof s === "string" && s.length > 0)
}

/** 空文字を null に正規化（text カラム向け）。 */
function nz(v: unknown): string | null {
  const s = v == null ? "" : String(v)
  return s === "" ? null : s
}

// ── microCMS 全件取得（offset ループ） ────────────────────────────
async function fetchAllLives(): Promise<MicroCmsLive[]> {
  const limit = 100
  let offset = 0
  const all: MicroCmsLive[] = []

  for (;;) {
    const url =
      `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1/lives` +
      `?limit=${limit}&offset=${offset}&depth=2`

    const res = await fetch(url, {
      headers: { "X-MICROCMS-API-KEY": MICROCMS_API_KEY as string },
    })
    if (!res.ok) {
      throw new Error(`microCMS 取得失敗: ${res.status} ${await res.text()}`)
    }

    const json = (await res.json()) as MicroCmsListResponse
    all.push(...json.contents)
    console.log(`  microCMS: ${all.length} / ${json.totalCount} 件取得`)

    offset += limit
    if (offset >= json.totalCount) break
  }
  return all
}

// ── マッピング（microCMS → Supabase 行） ──────────────────────────
function mapLiveToRow(item: MicroCmsLive): Record<string, unknown> {
  const groupSlugs = refSlugs(item.group)

  return {
    microcms_id: item.id,
    title: item.title ?? "",
    slug: item.slug ?? item.id,
    hashtag: nz(item.hashtag),
    live_type: toArray<string>(item.liveType),
    period_start: nz(item.periodStart),
    period_end: nz(item.periodEnd),
    key_visual_url: nz(item.keyVisual?.url),
    key_visual_height: item.keyVisual?.height ?? null,
    key_visual_width: item.keyVisual?.width ?? null,
    description: nz(item.description),
    group_slugs: groupSlugs,
    // 旧カラム（後方互換）= 先頭グループ
    group_slug: groupSlugs[0] ?? null,
    member_slugs: refSlugs(item.members),
    venues_json: item.venues ?? [],
    ticket_info: item.ticketInfo ?? [],
    fc_info: item.fcInfo ?? [],
    ticket_lineup: item.ticketLineup ?? [],
    goods_info: item.goodsInfo ?? [],
    upgrade_goods_info: item.upgradeGoodsInfo ?? [],
    ppv_info: item.ppvInfo ?? [],
    live_viewing: item.liveViewing ?? [],
    related_live_slugs: refSlugs(item.relatedLives),
    related_album_slugs: refSlugs(item.relatedAlbums),
    official_site_url: nz(item.officialSiteUrl),
    official_playlist_url: nz(item.officialPlaylistUrl),
    official_report_url: nz(item.officialReportUrl),
    has_report: item.hasReport ?? false,
    report_gallery: item.reportGallery ?? [],
    is_active: item.isActive ?? true,
    is_family: groupSlugs.includes("stpr_family"),
  }
}

// ── メイン ─────────────────────────────────────────────────────────
async function main() {
  console.log("microCMS lives を取得します…")
  const items = await fetchAllLives()
  console.log(`合計 ${items.length} 件。Supabase へ upsert します。\n`)

  const supabase = createClient(SUPABASE_URL as string, SUPABASE_SECRET_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  let ok = 0
  let fail = 0

  // 1 件ずつ upsert（1 行の失敗で全体を止めない）。
  for (const item of items) {
    const row = mapLiveToRow(item)
    const label = `${row.slug} (${row.microcms_id})`
    try {
      const { error } = await supabase
        .from("lives")
        .upsert(row, { onConflict: "microcms_id" })
      if (error) {
        console.error(`  ✗ ${label}: ${error.message}`)
        fail++
      } else {
        console.log(`  ✓ ${label}`)
        ok++
      }
    } catch (e) {
      console.error(`  ✗ ${label}: ${e instanceof Error ? e.message : String(e)}`)
      fail++
    }
  }

  console.log(`\n完了: 成功 ${ok} 件 / 失敗 ${fail} 件`)
  if (fail > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error("致命的エラー:", e instanceof Error ? e.message : e)
  process.exit(1)
})
