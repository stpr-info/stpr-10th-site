import PageContainer from "@/components/common/PageContainer"
import GoodsListView from "@/components/goods/GoodsListView"

export default function GoodsPage() {
  return (
    <PageContainer subtitle="GOODS" title="グッズ">
      <GoodsListView />
    </PageContainer>
  )
}
