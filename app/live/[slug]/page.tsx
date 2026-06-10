import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLiveBySlug } from "@/lib/repo"
import { getGroupName } from "@/data/groups"
import { formatPeriod, formatVenueName, getLiveStatus } from "@/lib/utils"
import SetlistSelector from "@/components/live/SetlistSelector"

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const live = await getLiveBySlug(slug)
  if (!live) return { title: "ライブが見つかりません" }
  return { title: live.title, description: live.description ?? undefined }
}

function StatusBadge({ status }: { status: ReturnType<typeof getLiveStatus> }) {
  if (status === "coming")
    return <span className="rounded-full bg-slate-500 px-2.5 py-1 text-xs font-bold text-white">COMING SOON</span>
  if (status === "ongoing")
    return <span className="rounded-full bg-green-500 px-2.5 py-1 text-xs font-bold text-white">● LIVE NOW</span>
  return <span className="rounded-full bg-gray-500/80 px-2.5 py-1 text-xs font-bold text-white">FINISHED</span>
}

export default async function LiveDetailPage({ params }: Params) {
  const { slug } = await params
  const live = await getLiveBySlug(slug)
  if (!live || live.isActive === false) notFound()

  const status = getLiveStatus(live.periodStart, live.periodEnd)
  const venues = live.venues ?? []
  const officialLinks: Array<{ label: string; url?: string }> = [
    { label: "公式サイト", url: live.officialSiteUrl },
    { label: "プレイリスト", url: live.officialPlaylistUrl },
    { label: "公式レポート", url: live.officialReportUrl },
    { label: "非公式レポート", url: live.unofficialReportUrl },
  ]

  return (
    <article>
      {/* パンくず */}
      <nav className="mb-4 text-xs text-gray-500">
        <Link href="/live" className="hover:text-accent-600">
          ライブ
        </Link>
        <span className="mx-1">/</span>
        <span className="text-gray-700">{live.title}</span>
      </nav>

      {/* キービジュアル */}
      {live.keyVisual && (
        <div style={{ aspectRatio: "16 / 9" }} className="mb-6 overflow-hidden rounded-2xl bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={live.keyVisual} alt={live.title} className="h-full w-full object-cover" />
        </div>
      )}

      {/* バッジ */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {live.groupSlug && (
          <span className="rounded-full border border-accent-200 bg-accent-50 px-2.5 py-1 text-xs font-bold text-accent-700">
            {getGroupName(live.groupSlug)}
          </span>
        )}
        {live.liveType && (
          <span className="rounded-full bg-accent-600 px-2.5 py-1 text-xs font-bold text-white">{live.liveType}</span>
        )}
        {live.isFamily && (
          <span className="rounded-full bg-rose-400 px-2.5 py-1 text-xs font-bold text-white">STPR Family</span>
        )}
        <StatusBadge status={status} />
      </div>

      {/* タイトル */}
      <h1 className="text-xl font-bold leading-tight text-gray-900 md:text-2xl">{live.title}</h1>
      {live.subtitle && <p className="mt-1 text-sm text-gray-600">{live.subtitle}</p>}
      {live.tourName && <p className="mt-0.5 text-sm text-accent-700">{live.tourName}</p>}

      <p className="mt-3 text-sm text-gray-600">{formatPeriod(live.periodStart, live.periodEnd)}</p>
      {live.hashtag && <p className="mt-1 text-sm text-accent-600">{live.hashtag}</p>}
      {live.description && (
        <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-gray-700">{live.description}</p>
      )}

      {/* 公式リンク */}
      {officialLinks.some((l) => l.url) && (
        <div className="mt-5 flex flex-wrap gap-2">
          {officialLinks
            .filter((l) => l.url)
            .map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-accent-600 px-4 py-1.5 text-sm font-medium text-accent-600 transition-colors hover:bg-accent-600 hover:text-white"
              >
                {l.label}
              </a>
            ))}
        </div>
      )}

      {/* 会場 */}
      {venues.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
            <span aria-hidden className="inline-block h-5 w-1 rounded-sm bg-accent-600" />
            会場・公演
          </h2>
          <div className="space-y-4">
            {venues.map((v, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="font-semibold text-gray-800">{formatVenueName(v)}</p>
                {v.shows && v.shows.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    {v.shows.map((s, j) => (
                      <li key={j} className="flex flex-wrap gap-x-2">
                        {s.date && <span>{s.date}</span>}
                        {s.partLabel && <span className="text-accent-700">{s.partLabel}</span>}
                        {s.scheduleText && <span className="text-gray-500">{s.scheduleText}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* チケット */}
      {live.ticketLineup && live.ticketLineup.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
            <span aria-hidden className="inline-block h-5 w-1 rounded-sm bg-accent-600" />
            チケット
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {live.ticketLineup.map((t, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm">
                <span className="text-gray-700">{t.ticketName}</span>
                <span className="font-semibold text-gray-900">{t.price}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* セットリスト（基本 + 公演ごとをタブ切替） */}
      {((live.setlist && live.setlist.length > 0) ||
        (live.showSetlists ?? []).some(
          (ss) =>
            ss.showRef &&
            ((ss.setlist && ss.setlist.length > 0) || (ss.note && ss.note.trim().length > 0)),
        )) && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
            <span aria-hidden className="inline-block h-5 w-1 rounded-sm bg-accent-600" />
            セットリスト
          </h2>
          <SetlistSelector base={live.setlist} showSetlists={live.showSetlists} variant="plain" />
        </section>
      )}

      {/* レポート */}
      {live.hasReport && (live.reportLeadTitle || live.reportContent) && (
        <section className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-bold text-gray-900">
            <span aria-hidden className="inline-block h-5 w-1 rounded-sm bg-accent-600" />
            ライブレポート
          </h2>
          {live.reportThumbnail && (
            <div style={{ aspectRatio: "16 / 9" }} className="mb-3 overflow-hidden rounded-xl bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={live.reportThumbnail} alt="" className="h-full w-full object-cover" />
            </div>
          )}
          {live.reportLeadTitle && <p className="mb-2 font-bold text-gray-900">{live.reportLeadTitle}</p>}
          {live.reportContent && (
            <div
              className="prose prose-sm max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: live.reportContent }}
            />
          )}
        </section>
      )}
    </article>
  )
}
