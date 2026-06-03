import type { Metadata } from "next"
import PageContainer from "@/components/common/PageContainer"
import HistoryView from "@/components/history/HistoryView"
import { getLives, getEvents, getGoods, getSongs, getAlbums } from "@/lib/repo"
import { buildTimeline } from "@/lib/utils"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "ヒストリー",
  description: "すとぷり 10周年の年表。ライブ・イベント・グッズ・楽曲・アルバムを年ごとに集約。",
}

export default async function HistoryPage() {
  const [lives, events, goods, songs, albums] = await Promise.all([
    getLives(),
    getEvents(),
    getGoods(),
    getSongs(),
    getAlbums(),
  ])

  const items = buildTimeline({ lives, events, goods, songs, albums })

  return (
    <PageContainer subtitle="HISTORY" title="ヒストリー">
      <HistoryView items={items} />
    </PageContainer>
  )
}
