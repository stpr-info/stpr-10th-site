import Link from "next/link"
import { notFound } from "next/navigation"
import { ALBUMS } from "@/data/albums"
import { getAlbumBySlug, getSongBySlug, formatDate } from "@/lib/utils"
import SafeImage from "@/components/common/SafeImage"
import SectionHeading from "@/components/common/SectionHeading"

const BASE = "/stpr-10th-anniversary"

export function generateStaticParams() {
  return ALBUMS.map((a) => ({ slug: a.slug }))
}

export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const album = getAlbumBySlug(slug)
  if (!album) notFound()

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
        {/* カバー */}
        <div
          className="relative w-full overflow-hidden rounded-3xl border border-gold-200/70"
          style={{ aspectRatio: "1/1" }}
        >
          <SafeImage
            src={album.cover}
            alt={album.title}
            fill
            fallbackLabel="ALBUM"
            className="object-cover"
            sizes="(min-width: 768px) 280px, 100vw"
            priority
          />
        </div>

        {/* 情報 */}
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-2xl font-bold leading-snug text-[#3a2540]">
            {album.title}
          </h1>
          {album.releaseDate && (
            <p className="text-sm text-[#6a5570]">
              発売日: {formatDate(album.releaseDate)}
            </p>
          )}
          {album.description && (
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#6a5570]">
              {album.description}
            </p>
          )}
        </div>
      </div>

      {/* トラックリスト */}
      <div className="mt-12 flex flex-col gap-5">
        <SectionHeading subtitle="TRACK LIST" title="収録曲" variant="compact" />
        <ol className="flex flex-col overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 backdrop-blur-sm">
          {album.trackSlugs.map((trackSlug, i) => {
            const song = getSongBySlug(trackSlug)
            return (
              <li
                key={trackSlug}
                className="flex items-center gap-4 border-b border-gold-100/70 px-5 py-3 last:border-0"
              >
                <span className="font-display text-sm text-gold-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {song ? (
                  <Link
                    href={`${BASE}/music/${song.slug}`}
                    className="font-serif text-sm text-[#3a2540] underline-offset-2 hover:text-gold-700 hover:underline"
                  >
                    {song.title}
                  </Link>
                ) : (
                  <span className="font-serif text-sm text-[#9a8aa0]">
                    {trackSlug}
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
