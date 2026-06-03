// 管理画面の簡易認証。
// ADMIN_PASSWORD と照合し、合致時に「パスワードのハッシュ」を Cookie に保存する。
// Cookie 値はパスワードを知らないと生成できないため、推測での偽装を防ぐ。
//
// Web Crypto（crypto.subtle）を使うため Node ランタイム・Edge（middleware）の
// どちらからも利用できる。

export const ADMIN_COOKIE = "stpr10th_admin"

// Cookie の有効期限（秒）。
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 12 // 12時間

/** ADMIN_PASSWORD から決定的なセッショントークン（SHA-256 hex）を生成する。 */
export async function computeSessionToken(): Promise<string> {
  const password = process.env.ADMIN_PASSWORD ?? ""
  const data = new TextEncoder().encode(`${password}:stpr10th-admin-session`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

/** 入力パスワードが ADMIN_PASSWORD と一致するか。 */
export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? ""
  if (!expected) return false
  // 長さの違いで早期 return しないよう単純比較（管理用途のため簡易実装）。
  return input === expected
}

/** Cookie のトークンが正当か検証する。 */
export async function isValidToken(token?: string): Promise<boolean> {
  if (!token) return false
  const expected = await computeSessionToken()
  return token === expected
}
