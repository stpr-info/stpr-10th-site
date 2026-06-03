import { ALBUMS } from "@/data/albums"
import AlbumCard from "./AlbumCard"
import EmptyState from "@/components/common/EmptyState"

/** アルバム一覧（グリッド） */
export default function AlbumListView() {
  if (ALBUMS.length === 0) {
    return <EmptyState label="アルバム情報を準備中です" />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {ALBUMS.map((album) => (
        <AlbumCard key={album.slug} album={album} />
      ))}
    </div>
  )
}
