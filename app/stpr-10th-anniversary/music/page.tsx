import PageContainer from "@/components/common/PageContainer"
import MusicListView from "@/components/music/MusicListView"

export default function MusicPage() {
  return (
    <PageContainer subtitle="MUSIC" title="ミュージック">
      <MusicListView />
    </PageContainer>
  )
}
