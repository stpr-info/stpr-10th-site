// SCHEDULE 機能のダミーデータと型。後で microCMS と接続する想定。
import type { GroupSlug } from "./groups"

// 種別（管理画面の「配信 / ライブイベント / オンラインイベント」等に対応）
export type ScheduleType = "live" | "event" | "goods" | "ticket" | "stream"

export const SCHEDULE_TYPES: { key: ScheduleType; label: string }[] = [
  { key: "live", label: "ライブ" },
  { key: "event", label: "イベント" },
  { key: "goods", label: "グッズ" },
  { key: "ticket", label: "チケット" },
  { key: "stream", label: "配信" },
]

export function scheduleTypeLabel(t: ScheduleType): string {
  return SCHEDULE_TYPES.find((x) => x.key === t)?.label ?? t
}

export type ScheduleEvent = {
  id: string
  title: string
  groupSlug: GroupSlug
  type: ScheduleType
  /** 開始日時（ISO） */
  start: string
  /** 終了日時（ISO・任意） */
  end?: string
  venue?: string
  note?: string
}

// ── ダミー予定（2026年6月中心） ──
export const SCHEDULE_EVENTS: ScheduleEvent[] = [
  { id: "s1", title: "すとぷり話しタイム", groupSlug: "Strawberry_Prince", type: "stream", start: "2026-06-13T19:00:00+09:00", note: "公式チャンネル配信" },
  { id: "s2", title: "We are SneakerStep! 札幌公演", groupSlug: "SneakerStep", type: "live", start: "2026-06-15T18:00:00+09:00", venue: "Zepp Sapporo" },
  { id: "s3", title: "SneakerStep グッズ通販開始", groupSlug: "SneakerStep", type: "goods", start: "2026-06-15T10:00:00+09:00" },
  { id: "s4", title: "騎士X ラジオ生放送", groupSlug: "knightX", type: "stream", start: "2026-06-19T22:00:00+09:00" },
  { id: "s5", title: "AMPTAK×COLORS 新曲先行配信", groupSlug: "amptak", type: "stream", start: "2026-06-20T20:00:00+09:00" },
  { id: "s6", title: "Meteorites オンラインイベント", groupSlug: "Meteorites", type: "event", start: "2026-06-21T13:00:00+09:00", end: "2026-06-21T15:00:00+09:00" },
  { id: "s7", title: "とぅるりぷ チケット一般販売", groupSlug: "True_Lip", type: "ticket", start: "2026-06-22T10:00:00+09:00" },
  { id: "s8", title: "すとぷり 夏グッズ受注締切", groupSlug: "Strawberry_Prince", type: "goods", start: "2026-06-25T23:59:00+09:00" },
  { id: "s9", title: "STPR FAMILY 合同イベント", groupSlug: "Strawberry_Prince", type: "event", start: "2026-06-27T17:00:00+09:00", end: "2026-06-27T20:00:00+09:00", venue: "幕張メッセ" },
  { id: "s10", title: "We are SneakerStep! 仙台公演", groupSlug: "SneakerStep", type: "live", start: "2026-06-28T18:00:00+09:00", venue: "Zepp Sendai" },
  { id: "s11", title: "騎士X 新ビジュアル公開", groupSlug: "knightX", type: "event", start: "2026-06-10T18:00:00+09:00" },
  { id: "s12", title: "AMPTAK×COLORS グッズ受注開始", groupSlug: "amptak", type: "goods", start: "2026-06-05T10:00:00+09:00" },
  { id: "s13", title: "すとぷり TVアニメ放送開始", groupSlug: "Strawberry_Prince", type: "stream", start: "2026-07-04T23:00:00+09:00" },
  { id: "s14", title: "とぅるりぷ 初ワンマン", groupSlug: "True_Lip", type: "live", start: "2026-07-12T17:00:00+09:00", venue: "LINE CUBE SHIBUYA" },
]

export function getScheduleEvents(): ScheduleEvent[] {
  return [...SCHEDULE_EVENTS].sort((a, b) => a.start.localeCompare(b.start))
}
