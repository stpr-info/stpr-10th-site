import type { Metadata } from "next"
import { getSchedules } from "@/lib/repo"
import ScheduleView from "@/components/info/ScheduleView"

export const metadata: Metadata = {
  title: "SCHEDULE | STPR INFO",
  description: "STPR FAMILY 各グループのライブ・イベント・配信スケジュール。",
}

export const dynamic = "force-dynamic"

export default async function SchedulePage() {
  const events = await getSchedules()
  // サーバー時刻から「今日」を確定し、ハイドレーション不一致を防ぐ。
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  return <ScheduleView today={today} events={events} />
}
