import HeroSection from "@/components/home/HeroSection"
import CategoryGrid from "@/components/home/CategoryGrid"
import SectionHeading from "@/components/common/SectionHeading"
import MemberCard from "@/components/members/MemberCard"
import LiveCard from "@/components/live/LiveCard"
import GoodsCard from "@/components/goods/GoodsCard"
import EmptyState from "@/components/common/EmptyState"
import { MEMBERS } from "@/data/members"
import { GOODS } from "@/data/goods"
import { getLivesSortedByDateDesc } from "@/lib/utils"

export default function TopPage() {
  // 注目ライブ/グッズ（先頭数件）。データが無ければ EmptyState を表示。
  const pickupLives = getLivesSortedByDateDesc().slice(0, 3)
  const pickupGoods = GOODS.slice(0, 3)

  return (
    <>
      <HeroSection />

      <div className="mx-auto flex max-w-6xl flex-col gap-20 px-6 py-20">
        {/* カテゴリ */}
        <section className="flex flex-col gap-6">
          <SectionHeading subtitle="CONTENTS" title="コンテンツ" />
          <CategoryGrid />
        </section>

        {/* メンバー */}
        <section className="flex flex-col gap-6">
          <SectionHeading subtitle="MEMBERS" title="メンバー" />
          <div className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {MEMBERS.map((m) => (
              <MemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>

        {/* 注目ライブ */}
        <section className="flex flex-col gap-6">
          <SectionHeading subtitle="PICK UP LIVE" title="注目のライブ" />
          {pickupLives.length === 0 ? (
            <EmptyState label="ライブ情報を準備中です" />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pickupLives.map((live) => (
                <LiveCard key={live.slug} live={live} />
              ))}
            </div>
          )}
        </section>

        {/* 注目グッズ */}
        <section className="flex flex-col gap-6">
          <SectionHeading subtitle="PICK UP GOODS" title="注目のグッズ" />
          {pickupGoods.length === 0 ? (
            <EmptyState label="グッズ情報を準備中です" />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {pickupGoods.map((goods) => (
                <GoodsCard key={goods.slug} goods={goods} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
