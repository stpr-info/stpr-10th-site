import { NextResponse, type NextRequest } from "next/server"
import { ADMIN_COOKIE, isValidToken } from "@/lib/auth"

/**
 * /admin 配下を保護する。未認証なら /admin/login へリダイレクト。
 * /admin/login 自身は除外する。
 * （Next.js 16 で middleware → proxy に名称変更された規約に対応）
 */
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    return NextResponse.next()
  }

  const token = req.cookies.get(ADMIN_COOKIE)?.value
  if (await isValidToken(token)) {
    return NextResponse.next()
  }

  const url = req.nextUrl.clone()
  url.pathname = "/admin/login"
  url.searchParams.set("from", pathname)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
}
