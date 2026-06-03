import { createClient, type SupabaseClient } from "@supabase/supabase-js"

/**
 * 公開用 Supabase クライアント（publishable / anon キー）。
 * RLS により SELECT のみ可能。公開サイトの読み取りに使う。
 */
export function createBrowserClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    throw new Error(
      "Supabase の公開設定が不足しています。NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY を確認してください。",
    )
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
