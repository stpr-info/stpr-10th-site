import Link from "next/link"
import type { Song } from "@/data/songs"
import { getYoutubeThumbnail } from "@/lib/utils"
import SafeImage from "@/components/common/SafeImage"

const BASE = "/stpr-10th-anniversary"

const TYPE_LABEL: Record<Song["type"], string> = {
  original: "ORIGINAL",
  cover: "COVER",
}

/** 楽曲一覧のカード */
export default function SongCard({ song }: { song: Song }) {
  return (
    <Link
      href={`${BASE}/music/${song.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 backdrop-blur-sm transition-all hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(212,168,83,0.22)]"
    >
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <SafeImage
          src={song.youtubeId ? getYoutubeThumbnail(song.youtubeId) : undefined}
          alt={song.title}
          fill
          fallbackLabel="MUSIC"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 33vw, 100vw"
        />
        <span className="absolute right-2 top-2 rounded-full bg-rose-400/90 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white">
          {TYPE_LABEL[song.type]}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-serif text-sm font-bold leading-snug text-[#3a2540]">
          {song.title}
        </h3>
      </div>
    </Link>
  )
}
