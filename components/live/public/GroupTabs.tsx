"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { GROUPS } from "@/data/groups"

type Props = {
  /** 'all' もしくは group.slug */
  currentSlug?: string
}

function GroupTabsRender({
  currentSlug,
  pathname,
  queryString,
}: {
  currentSlug: string
  pathname: string
  queryString: string
}) {
  const buildHref = (slug: string | null) => {
    const params = new URLSearchParams(queryString)
    if (slug === null) params.delete("group")
    else params.set("group", slug)
    const q = params.toString()
    return q ? `${pathname}?${q}` : pathname
  }

  const allActive = currentSlug === "all"

  return (
    <div className="flex flex-wrap gap-1.5">
      {/* ALL タブ */}
      <Link
        href={buildHref(null)}
        scroll={false}
        className={`flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-3.5 text-xs font-bold transition-all ${
          allActive
            ? "bg-accent-600 text-white shadow-md"
            : "border border-gray-200 bg-white text-gray-600 hover:border-accent-400 hover:text-accent-600"
        }`}
      >
        ALL
      </Link>

      {GROUPS.map((g) => {
        const isActive = currentSlug === g.slug
        return (
          <Link
            key={g.slug}
            href={buildHref(g.slug)}
            scroll={false}
            title={g.name}
            aria-label={g.name}
            className={`flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-white px-3 transition-all ${
              isActive
                ? "shadow-md"
                : "border border-gray-200 opacity-70 hover:border-accent-400 hover:opacity-100"
            }`}
            style={
              isActive
                ? { boxShadow: `0 0 0 2px ${g.themeColor}, 0 2px 4px rgba(0,0,0,0.08)` }
                : undefined
            }
          >
            <span
              className="text-xs font-bold whitespace-nowrap"
              style={{ color: isActive ? g.themeColor : "#4b5563" }}
            >
              {g.name}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

function GroupTabsInner({ currentSlug = "all" }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  return (
    <GroupTabsRender
      currentSlug={currentSlug}
      pathname={pathname}
      queryString={searchParams.toString()}
    />
  )
}

/**
 * グループ絞り込みタブ。
 * useSearchParams は Next.js 16 で Suspense 境界が必須なので内部で自己ラップする。
 */
export default function GroupTabs(props: Props) {
  return (
    <Suspense
      fallback={
        <GroupTabsRender
          currentSlug={props.currentSlug ?? "all"}
          pathname=""
          queryString=""
        />
      }
    >
      <GroupTabsInner {...props} />
    </Suspense>
  )
}
