import PageContainer from "@/components/common/PageContainer"
import LiveListView from "@/components/live/LiveListView"

export default function LivePage() {
  return (
    <PageContainer subtitle="LIVE" title="ライブ">
      <LiveListView />
    </PageContainer>
  )
}
