"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { href: "/news", label: "NEWS" },
  { href: "/schedule", label: "SCHEDULE" },
]

/** STPR INFO 共通ヘッダー（NEWS / SCHEDULE タブ切替）。 */
export default function InfoHeader() {
  const pathname = usePathname()
  return (
    <header className="page-switcher">
      <Link className="site-logo" href="/news">
        STPR INFO
      </Link>
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`page-tab ${pathname.startsWith(t.href) ? "active" : ""}`}
        >
          {t.label}
        </Link>
      ))}
    </header>
  )
}
