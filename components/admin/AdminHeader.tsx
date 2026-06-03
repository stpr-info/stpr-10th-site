import Link from "next/link"
import { logoutAction } from "@/app/admin/auth-actions"

/** 管理画面のヘッダー（認証済みページで使用）。 */
export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-gold-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <Link
          href="/admin"
          className="gold-shimmer font-display text-lg font-bold tracking-[0.2em]"
        >
          ADMIN
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-full border border-gold-300 bg-white px-4 py-1.5 text-xs tracking-wider text-gold-700 transition-colors hover:bg-gold-50"
          >
            ログアウト
          </button>
        </form>
      </div>
    </header>
  )
}
