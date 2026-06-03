import PageContainer from "@/components/common/PageContainer"
import EventListView from "@/components/event/EventListView"

export default function EventPage() {
  return (
    <PageContainer subtitle="EVENT" title="イベント">
      <EventListView />
    </PageContainer>
  )
}
