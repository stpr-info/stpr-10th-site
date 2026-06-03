import type { Metadata } from "next"
import PageContainer from "@/components/common/PageContainer"
import EmptyState from "@/components/common/EmptyState"
import SafeImage from "@/components/common/SafeImage"
import { getVisuals } from "@/lib/repo"
import { formatDateDot } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "ビジュアル",
  description: "すとぷり 10周年の描き下ろし・ビジュアル一覧。",
}

export default async function VisualPage() {
  const visuals = await getVisuals()

  return (
    <PageContainer subtitle="VISUAL" title="ビジュアル">
      {visuals.length === 0 ? (
        <EmptyState label="ビジュアルを準備中です" />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visuals.map((v) => (
            <figure
              key={v.id}
              className="group overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 shadow-sm backdrop-blur-sm"
            >
              <div className="relative aspect-[4/5] w-full bg-gold-50/40">
                <SafeImage
                  src={v.image}
                  alt={v.title ?? "ビジュアル"}
                  fill
                  fallbackLabel="VISUAL"
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <figcaption className="p-3">
                {v.title && (
                  <p className="font-serif text-sm font-bold leading-snug text-[#3a2540]">
                    {v.title}
                  </p>
                )}
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#9a8aa0]">
                  {v.member && (
                    <span className="rounded-full bg-gold-50 px-2 py-0.5 text-gold-700">
                      {v.member}
                    </span>
                  )}
                  {v.releaseDate && <span>{formatDateDot(v.releaseDate)}</span>}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </PageContainer>
  )
}
