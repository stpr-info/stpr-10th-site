/**
 * venues_json → venues 移行スクリプト
 * ------------------------------------------------------------------
 * 取込スクリプトが会場・公演データを venues_json に入れていたため、管理画面の
 * 「会場公演」repeater（venues 列）が空で、会場ごとの物販情報を追加できなかった。
 * venues が空 かつ venues_json が非空のレコードについて、
 *   venues = venues_json、venues_json = []  に移す（既存 venues は壊さない）。
 *
 * 実行: npx tsx scripts/migrate-venues-json-to-venues.ts
 * 環境: .env.local の NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY
 * ------------------------------------------------------------------
 */

import dotenv from "dotenv"
import { createClient } from "@supabase/supabase-js"

dotenv.config({ path: ".env.local" })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY
if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SECRET_KEY が .env.local にありません。")
  process.exit(1)
}

async function main() {
  const supabase = createClient(SUPABASE_URL as string, SUPABASE_SECRET_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data, error } = await supabase.from("lives").select("slug, venues, venues_json")
  if (error) {
    console.error("取得失敗:", error.message)
    process.exit(1)
  }

  let moved = 0
  let skipped = 0
  let fail = 0

  for (const r of data ?? []) {
    const venues = Array.isArray(r.venues) ? r.venues : []
    const venuesJson = Array.isArray(r.venues_json) ? r.venues_json : []

    // venues に既にデータがある or venues_json が空 ならスキップ（壊さない）。
    if (venues.length > 0 || venuesJson.length === 0) {
      skipped++
      continue
    }

    const { error: upErr } = await supabase
      .from("lives")
      .update({ venues: venuesJson, venues_json: [] })
      .eq("slug", r.slug)
    if (upErr) {
      console.error(`  ✗ ${r.slug}: ${upErr.message}`)
      fail++
    } else {
      console.log(`  ✓ ${r.slug} | ${venuesJson.length} 会場を venues へ移動`)
      moved++
    }
  }

  console.log(`\n完了: 移動 ${moved} 件 / スキップ ${skipped} 件 / 失敗 ${fail} 件`)
  if (fail > 0) process.exitCode = 1
}

main().catch((e) => {
  console.error("致命的エラー:", e instanceof Error ? e.message : e)
  process.exit(1)
})
