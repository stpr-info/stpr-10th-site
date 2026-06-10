import { getActiveLives } from "@/lib/repo"
import { formatPeriod, getLiveStatus } from "@/lib/utils"
import FeaturedBanner from "@/components/live/public/FeaturedBanner"
import LiveBrowser from "@/components/live/public/LiveBrowser"

export const dynamic = "force-dynamic"

function statusBadge(status: ReturnType<typeof getLiveStatus>) {
  if (status === "coming")
    return <span className="rounded-full bg-slate-500 px-2 py-0.5 text-[10px] font-bold text-white">COMING SOON</span>
  if (status === "ongoing")
    return <span className="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">● LIVE NOW</span>
  return <span className="rounded-full bg-gray-500/80 px-2 py-0.5 text-[10px] font-bold text-white">FINISHED</span>
}

export default async function LivePage() {
  const lives = await getActiveLives()
  const featured = lives[0]

  return (
    <>
      {featured && (
        <FeaturedBanner
          href={`/live/${featured.slug}`}
          image={featured.keyVisual}
          label="最新LIVE"
          title={featured.title}
          meta={formatPeriod(featured.periodStart, featured.periodEnd)}
          badges={statusBadge(getLiveStatus(featured.periodStart, featured.periodEnd))}
        />
      )}

      {/* セクション見出し（STPR Blue） */}
      <div className="mb-5 flex items-center gap-3">
        <span aria-hidden className="h-7 w-1 shrink-0 rounded-sm bg-accent-600 md:h-9" />
        <div className="flex min-w-0 flex-col leading-tight">
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-accent-600">LIVE</span>
          <h1 className="text-lg font-bold text-gray-900 md:text-2xl">ライブ</h1>
        </div>
      </div>

      <LiveBrowser lives={lives} />
    </>
  )
}
