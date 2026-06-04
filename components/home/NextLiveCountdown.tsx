import Link from "next/link"
import type { Live } from "@/data/lives"
import { getDaysUntil } from "@/lib/utils"

const BASE = "/stpr-10th-anniversary"

/**
 * 次のライブまでのカウントダウン帯（TOP の HERO 下に表示）。
 * lives のうち開催日が未来のものから最も近い 1 件を表示する。
 * 未来のライブが無ければ何も描画しない（null）。
 */
export default function NextLiveCountdown({ lives }: { lives: Live[] }) {
  const upcoming = lives
    .map((live) => ({ live, days: getDaysUntil(live.periodStart) }))
    .filter((x): x is { live: Live; days: number } => x.days !== null && x.days > 0)
    .sort((a, b) => a.days - b.days)

  const next = upcoming[0]
  if (!next) return null

  return (
    <section className="px-4 py-5" style={{ background: "#fff8fb" }}>
      <Link
        href={`${BASE}/live/${next.live.slug}`}
        className="mx-auto flex max-w-[760px] flex-col items-center gap-1.5 rounded-2xl border border-gold-200/70 bg-gradient-to-r from-rose-100/80 to-gold-100/80 px-5 py-4 text-center shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:justify-center sm:gap-3"
      >
        <span className="font-display text-[11px] font-bold tracking-[0.2em] text-gold-700">
          NEXT LIVE
        </span>
        <span className="font-serif text-sm font-bold text-[#3a2540] sm:text-base">
          次のライブ：{next.live.title}
        </span>
        <span className="text-sm text-[#6a5570]">
          まであと
          <span className="mx-1 font-serif text-2xl font-bold tabular-nums text-gold-600">
            {next.days}
          </span>
          日
        </span>
      </Link>
    </section>
  )
}
