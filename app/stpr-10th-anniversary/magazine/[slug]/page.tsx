import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatDateDot } from "@/lib/utils"
import { getMagazineById } from "@/lib/repo"
import SafeImage from "@/components/common/SafeImage"

const BASE = "/stpr-10th-anniversary"

export const dynamic = "force-dynamic"

// 雑誌は slug を持たず id（uuid）で管理するため、ルートパラメータを id として扱う。
function isHttpUrl(u?: string): boolean {
  return !!u && /^https?:\/\//i.test(u)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const mag = await getMagazineById(slug)
  if (!mag) return { title: "雑誌が見つかりません" }
  const description = mag.content?.slice(0, 100) || `${mag.name} ${mag.issue}`
  const images = mag.image ? [mag.image] : []
  return {
    title: mag.name,
    description,
    openGraph: { title: mag.name, description, images },
    twitter: { card: "summary_large_image", title: mag.name, description, images },
  }
}

export default async function MagazineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const mag = await getMagazineById(slug)
  if (!mag) notFound()

  return (
    <div className="mx-auto max-w-4xl p-4 md:p-6">
      {/* パンくず */}
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-[#9a8aa0]">
        <Link href={`${BASE}/magazine`} className="transition-colors hover:text-gold-600">
          MAGAZINE
        </Link>
        <span className="text-gold-200">›</span>
        <span className="font-medium text-[#3a2540]">{mag.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr] md:gap-8">
        {/* 表紙（大きめ・比率維持） */}
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-2xl border border-gold-200/70 bg-gold-50/40 shadow-sm">
          <SafeImage
            src={mag.image}
            alt={mag.name}
            fill
            fallbackLabel="MAG"
            className="object-contain"
            sizes="280px"
            priority
          />
        </div>

        {/* 基本情報 */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-[11px] tracking-[0.3em] text-gold-600">
            MAGAZINE
          </span>
          <h1 className="font-serif text-2xl font-bold text-[#3a2540] md:text-3xl">
            {mag.name}
          </h1>
          {mag.issue && (
            <p className="text-base font-medium text-gold-700">{mag.issue}</p>
          )}

          <dl className="mt-1 flex flex-col gap-2 text-sm">
            {mag.releaseDate && (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[#9a8aa0]">発売日</dt>
                <dd className="text-[#3a2540]">{formatDateDot(mag.releaseDate)}</dd>
              </div>
            )}
            {mag.publisher && (
              <div className="flex gap-3">
                <dt className="w-20 shrink-0 text-[#9a8aa0]">出版社</dt>
                <dd className="text-[#3a2540]">{mag.publisher}</dd>
              </div>
            )}
          </dl>

          {isHttpUrl(mag.url) && (
            <a
              href={mag.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block w-fit rounded-xl bg-gold-400 px-5 py-2 text-sm text-white transition-colors hover:bg-gold-500"
            >
              公式サイト →
            </a>
          )}
        </div>
      </div>

      {/* 内容・特典情報 */}
      {mag.content && (
        <section className="mt-6 rounded-2xl border border-gold-200/70 bg-white/55 p-4 shadow-sm backdrop-blur-sm md:p-6">
          <h2 className="mb-3 flex items-center gap-2 font-serif font-bold text-[#3a2540]">
            内容・特典情報
          </h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#6a5570]">
            {mag.content}
          </p>
        </section>
      )}

      {/* 一覧へ戻る */}
      <div className="mt-8">
        <Link
          href={`${BASE}/magazine`}
          className="inline-flex items-center gap-1.5 rounded-full border border-gold-300 bg-white/70 px-5 py-2 text-sm text-gold-700 transition-colors hover:bg-gold-50"
        >
          ← 雑誌一覧へ
        </Link>
      </div>
    </div>
  )
}
