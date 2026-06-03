import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * 管理用 Supabase クライアント（サーバー専用）。
 * Secret キー（sb_secret_… / service_role 相当）を使い RLS をバイパスする。
 * このモジュールはサーバーコンポーネント / server action からのみ import すること。
 * Secret キーには NEXT_PUBLIC_ を付けないため、ブラウザバンドルには含まれない。
 */
export function createAdminClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SECRET_KEY

  if (!url || !key) {
    throw new Error(
      "Supabase の設定が不足しています。.env.local の NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SECRET_KEY を確認してください。",
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
