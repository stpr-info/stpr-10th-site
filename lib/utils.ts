// 純粋関数ユーティリティ。
// データ取得は data/ のハードコード定数から行う（DB・API なし）。

import { LIVES, type Live, type LiveStatus } from "@/data/lives"
import { GOODS, type Goods } from "@/data/goods"
import { EVENTS, type Event } from "@/data/events"
import { SONGS, type Song } from "@/data/songs"
import { ALBUMS, type Album } from "@/data/albums"
import { MEMBERS, type Member } from "@/data/members"

/**
 * ライブのステータスを日付から判定する。
 * - startDate より前: "coming"
 * - startDate 〜 endDate（endDate 省略時は startDate 当日）: "ongoing"
 * - endDate を過ぎた: "finished"
 *
 * 日付が無い場合は "coming" を返す（情報未確定の扱い）。
 * 比較は日単位（時刻を切り捨て）で行う。
 */
export function getLiveStatus(startDate?: string, endDate?: string): LiveStatus {
  if (!startDate) return "coming"

  const today = startOfDay(new Date())
  const start = startOfDay(new Date(startDate))
  const end = startOfDay(new Date(endDate ?? startDate))

  if (today < start) return "coming"
  if (today > end) return "finished"
  return "ongoing"
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/**
 * "2026-06-04" → "2026年6月4日" に整形する。
 * パースできない文字列はそのまま返す。
 */
export function formatDate(dateStr: string): string {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(dateStr)
  if (!m) return dateStr
  const [, y, mo, d] = m
  return `${Number(y)}年${Number(mo)}月${Number(d)}日`
}

/**
 * YouTube の動画 ID からサムネイル URL を生成する。
 */
export function getYoutubeThumbnail(youtubeId: string): string {
  return `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
}

// === slug / id からのデータ取得 ===

export function getLiveBySlug(slug: string): Live | undefined {
  return LIVES.find((l) => l.slug === slug)
}

export function getGoodsBySlug(slug: string): Goods | undefined {
  return GOODS.find((g) => g.slug === slug)
}

export function getEventBySlug(slug: string): Event | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

export function getSongBySlug(slug: string): Song | undefined {
  return SONGS.find((s) => s.slug === slug)
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return ALBUMS.find((a) => a.slug === slug)
}

export function getMemberById(id: string): Member | undefined {
  return MEMBERS.find((m) => m.id === id)
}

/**
 * ライブを開催日の新しい順（startDate 降順）に並べた配列を返す。
 * startDate が無いものは末尾に回す。
 */
export function getLivesSortedByDateDesc(): Live[] {
  return [...LIVES].sort((a, b) => {
    if (!a.startDate) return 1
    if (!b.startDate) return -1
    return b.startDate.localeCompare(a.startDate)
  })
}
