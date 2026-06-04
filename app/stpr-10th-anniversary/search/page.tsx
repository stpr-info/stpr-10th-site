import type { Metadata } from "next"
import Link from "next/link"
import PageContainer from "@/components/common/PageContainer"
import SearchBox from "@/components/common/SearchBox"
import { searchAll, type SearchCategory } from "@/lib/repo"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "検索",
  description: "すとぷり 10周年サイト内検索。ライブ・グッズ・イベント・楽曲・アルバム・雑誌・メディアを横断検索。",
}

// カテゴリ別のバッジ配色（HISTORY と統一感を持たせる）。
const CATEGORY_BADGE: Record<SearchCategory, string> = {
  live: "bg-rose-100 text-rose-600",
  goods: "bg-emerald-100 text-emerald-700",
  event: "bg-amber-100 text-amber-700",
  song: "bg-sky-100 text-sky-700",
  album: "bg-violet-100 text-violet-700",
  magazine: "bg-fuchsia-100 text-fuchsia-700",
  media: "bg-gold-100 text-gold-700",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const query = (q ?? "").trim()
  const groups = query ? await searchAll(query) : []
  const total = groups.reduce((n, g) => n + g.hits.length, 0)

  return (
    <PageContainer subtitle="SEARCH" title="検索">
      <div className="mb-6 max-w-xl">
        <SearchBox defaultValue={query} autoFocus />
      </div>

      {!query ? (
        <p className="py-12 text-center text-sm text-[#9a8aa0]">
          キーワードを入力して検索してください。
        </p>
      ) : total === 0 ? (
        <p className="py-12 text-center text-sm text-[#9a8aa0]">
          「{query}」に一致する結果は見つかりませんでした。
        </p>
      ) : (
        <>
          <p className="mb-6 text-xs text-[#9a8aa0]">
            「<span className="font-bold text-[#3a2540]">{query}</span>」の検索結果: {total} 件
          </p>

          <div className="flex flex-col gap-8">
            {groups.map((group) => (
              <section key={group.category}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${CATEGORY_BADGE[group.category]}`}
                  >
                    {group.label}
                  </span>
                  <span className="text-xs text-[#9a8aa0]">{group.hits.length} 件</span>
                </div>

                <ul className="flex flex-col gap-2">
                  {group.hits.map((hit, i) => {
                    const isExternal = hit.href.startsWith("http")
                    const isHash = hit.href === "#"
                    const inner = (
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-gold-200/70 bg-white/70 px-4 py-3 transition-colors hover:bg-gold-50/60">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#3a2540]">{hit.title}</p>
                          {hit.sub && (
                            <p className="truncate text-xs text-[#9a8aa0]">{hit.sub}</p>
                          )}
                        </div>
                        {!isHash && <span className="shrink-0 text-gold-500">→</span>}
                      </div>
                    )
                    if (isHash) {
                      return <li key={`${group.category}-${i}`}>{inner}</li>
                    }
                    return (
                      <li key={`${group.category}-${i}`}>
                        {isExternal ? (
                          <a href={hit.href} target="_blank" rel="noopener noreferrer">
                            {inner}
                          </a>
                        ) : (
                          <Link href={hit.href}>{inner}</Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </>
      )}
    </PageContainer>
  )
}
