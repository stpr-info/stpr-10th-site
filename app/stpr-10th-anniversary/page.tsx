import HeroSection from "@/components/home/HeroSection"
import CategoryGrid from "@/components/home/CategoryGrid"
import Section from "@/components/common/Section"
import MemberCard from "@/components/members/MemberCard"
import LiveCard from "@/components/live/LiveCard"
import EventCard from "@/components/event/EventCard"
import GoodsCard from "@/components/goods/GoodsCard"
import MusicListView from "@/components/music/MusicListView"
import AlbumListView from "@/components/album/AlbumListView"
import MagazineListView from "@/components/magazine/MagazineListView"
import MediaListView from "@/components/media/MediaListView"
import EmptyState from "@/components/common/EmptyState"
import MoreLink from "@/components/common/MoreLink"
import { MEMBERS } from "@/data/members"
import {
  getLives,
  getEvents,
  getGoods,
  getSongs,
  getAlbums,
  getMagazines,
  getMedia,
} from "@/lib/repo"
import { T } from "@/lib/theme"

const BASE = "/stpr-10th-anniversary"

// 管理画面の編集が即時反映されるよう常に動的レンダリング。
export const dynamic = "force-dynamic"

// 日付文字列の降順比較（新しい順）。空は末尾。
function byDateDesc(a?: string, b?: string): number {
  return (b ?? "").localeCompare(a ?? "")
}

/**
 * 10周年特設サイト TOP（完全版）。
 * HERO → 期間/キャッチ → カテゴリグリッド → 全カテゴリの全件表示。
 * 各 ListView は showControls={false} で UI を隠し、グリッド表示で全件を見せる。
 * 0 件のカテゴリは各 ListView 内部で EmptyState を表示する。
 */
export default async function TopPage() {
  // 全カテゴリのデータを並行取得。
  const [lives, events, goods, songs, albums, magazines, media] = await Promise.all([
    getLives(),
    getEvents(),
    getGoods(),
    getSongs(),
    getAlbums(),
    getMagazines(),
    getMedia(),
  ])

  // TOP は各カテゴリの最新数件だけを見せ、残りは「もっと見る」で全件ページへ。
  const latestLives = [...lives].sort((a, b) => byDateDesc(a.periodStart, b.periodStart)).slice(0, 1)
  const latestEvents = [...events].sort((a, b) => byDateDesc(a.periodStart, b.periodStart)).slice(0, 3)
  const latestGoods = [...goods].sort((a, b) => byDateDesc(a.releaseDate, b.releaseDate)).slice(0, 1)

  return (
    <div>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. 期間・キャッチコピー（画像下の帯） */}
      <section
        style={{
          textAlign: "center",
          padding: "20px 16px",
          background: T.pearl,
          borderTop: "1px solid rgba(212,168,83,0.15)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "13px",
            letterSpacing: "0.3em",
            color: T.goldD,
          }}
        >
          2026.6.4 — 2027.6.3
        </p>
        <p
          style={{
            fontFamily: "var(--font-noto-serif-jp), serif",
            fontSize: "15px",
            color: T.muted,
            marginTop: "8px",
          }}
        >
          10年間の軌跡を、ここに。
        </p>
      </section>

      {/* 3. カテゴリーグリッド（同一ページ内アンカーへ） */}
      <section style={{ padding: "24px 16px" }}>
        <CategoryGrid />
      </section>

      {/* 4. MEMBERS */}
      <Section id="members" subtitle="MEMBERS" title="メンバー" tone="white">
        <div
          className="theme-strawberry mx-auto grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4"
          style={{ maxWidth: "960px" }}
        >
          {MEMBERS.map((m) => (
            <MemberCard key={m.id} member={m} />
          ))}
        </div>
      </Section>

      {/* 5. LIVE（最新1件 + もっと見る） */}
      <Section id="live" subtitle="LIVE" title="ライブ" tone="pearl">
        {lives.length === 0 ? (
          <EmptyState label="ライブ情報を準備中です" />
        ) : (
          <div className="theme-strawberry">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {latestLives.map((l, i) => (
                <LiveCard key={l.slug} live={l} index={i} />
              ))}
            </div>
            {lives.length > latestLives.length && <MoreLink href={`${BASE}/live`} />}
          </div>
        )}
      </Section>

      {/* 6. EVENT（種別で分けず最新3件をまとめて表示 + もっと見る） */}
      <Section id="event" subtitle="EVENT" title="イベント" tone="white">
        {events.length === 0 ? (
          <EmptyState label="イベント情報を準備中です" />
        ) : (
          <div className="theme-strawberry">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
              {latestEvents.map((e, i) => (
                <EventCard key={e.slug} event={e} index={i} />
              ))}
            </div>
            {events.length > latestEvents.length && <MoreLink href={`${BASE}/event`} />}
          </div>
        )}
      </Section>

      {/* 7. GOODS（最新1件 + もっと見る） */}
      <Section id="goods" subtitle="GOODS" title="グッズ" tone="pearl">
        {goods.length === 0 ? (
          <EmptyState label="グッズ情報を準備中です" />
        ) : (
          <div className="theme-strawberry">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
              {latestGoods.map((g, i) => (
                <GoodsCard key={g.slug} goods={g} index={i} />
              ))}
            </div>
            {goods.length > latestGoods.length && <MoreLink href={`${BASE}/goods`} />}
          </div>
        )}
      </Section>

      {/* 8. MUSIC */}
      <Section id="music" subtitle="MUSIC" title="ミュージック" tone="white">
        <MusicListView songs={songs} showControls={false} />
      </Section>

      {/* 9. ALBUM */}
      <Section id="album" subtitle="ALBUM" title="アルバム" tone="pearl">
        <AlbumListView albums={albums} showControls={false} />
      </Section>

      {/* 10. MAGAZINE */}
      <Section id="magazine" subtitle="MAGAZINE" title="雑誌" tone="white">
        <MagazineListView magazines={magazines} />
      </Section>

      {/* 11. MEDIA */}
      <Section id="media" subtitle="MEDIA" title="メディア" tone="pearl">
        <MediaListView media={media} showControls={false} />
      </Section>
    </div>
  )
}
