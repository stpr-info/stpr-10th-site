import type { Magazine } from "@/data/magazines"
import { getMagazines } from "@/lib/repo"
import { formatDateDot } from "@/lib/utils"
import SafeImage from "@/components/common/SafeImage"
import EmptyState from "@/components/common/EmptyState"

/** 雑誌一覧（カード形式・詳細ページなし）。
 *  magazines 未指定時は自身で取得（既存の /magazine ページ互換）。
 *  レスポンシブな表紙グリッド（SP2 / sm3 / lg4 列）。表紙はアスペクト比保持
 *  （object-contain）で表示し、説明文は表示しない。 */
export default async function MagazineListView({
  magazines: magazinesProp,
}: {
  magazines?: Magazine[]
} = {}) {
  const magazines = magazinesProp ?? (await getMagazines())

  if (magazines.length === 0) {
    return <EmptyState label="雑誌情報を準備中です" />
  }

  // 雑誌に詳細ページは無いため、カードはリンクにしない（不正な URL による 404 を防止）。
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {magazines.map((mag) => (
        <div
          key={mag.id}
          className="flex flex-col rounded-2xl border border-gold-200/70 bg-white/55 p-3 backdrop-blur-sm"
        >
          {/* 表紙：アスペクト比を保持（contain）。潰れ・小さすぎを防ぐ。 */}
          <div
            className="relative w-full overflow-hidden rounded-lg bg-gold-50/40"
            style={{ aspectRatio: "3 / 4" }}
          >
            <SafeImage
              src={mag.image}
              alt={mag.name}
              fill
              fallbackLabel="MAG"
              className="object-contain"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
            />
          </div>
          <h3 className="mt-2 line-clamp-2 font-serif text-sm font-bold leading-snug text-[#3a2540]">
            {mag.name}
          </h3>
          <p className="text-xs text-[#6a5570]">{mag.issue}</p>
          {mag.releaseDate && (
            <p className="mt-0.5 text-[11px] text-[#9a8aa0]">
              発売: {formatDateDot(mag.releaseDate)}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
