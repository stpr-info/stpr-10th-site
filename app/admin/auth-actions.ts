"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import {
  ADMIN_COOKIE,
  ADMIN_COOKIE_MAX_AGE,
  computeSessionToken,
  isValidToken,
  verifyPassword,
} from "@/lib/auth"

/**
 * ログイン。パスワードを照合し、合致すればセッション Cookie を発行する。
 * 失敗時は /admin/login?error=1 に戻す。
 */
export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "")
  const from = String(formData.get("from") ?? "/admin")
  // オープンリダイレクト防止: /admin 配下のみ許可。
  const safeFrom = from.startsWith("/admin") ? from : "/admin"

  if (!verifyPassword(password)) {
    redirect(
      `/admin/login?error=1&from=${encodeURIComponent(safeFrom)}`,
    )
  }

  const token = await computeSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  })

  redirect(safeFrom)
}

/** ログアウト。Cookie を破棄してログイン画面へ。 */
export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE)
  redirect("/admin/login")
}

/**
 * server action 内で管理者であることを検証する（多重防御）。
 * middleware で /admin ページは守られているが、action 直接呼び出しにも備える。
 */
export async function assertAdmin(): Promise<void> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE)?.value
  if (!(await isValidToken(token))) {
    throw new Error("認証が必要です。再度ログインしてください。")
  }
}
