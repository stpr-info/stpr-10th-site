import HeroSection from "@/components/home/HeroSection"
import CategoryGrid from "@/components/home/CategoryGrid"
import Section from "@/components/common/Section"
import MemberCard from "@/components/members/MemberCard"
import LiveListView from "@/components/live/LiveListView"
import EventListView from "@/components/event/EventListView"
import GoodsListView from "@/components/goods/GoodsListView"
import MusicListView from "@/components/music/MusicListView"
import AlbumListView from "@/components/album/AlbumListView"
import MagazineListView from "@/components/magazine/MagazineListView"
import MediaListView from "@/components/media/MediaListView"
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

// 管理画面の編集が即時反映されるよう常に動的レンダリング。
export const dynamic = "force-dynamic"

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

      {/* 5. LIVE */}
      <Section id="live" subtitle="LIVE" title="ライブ" tone="pearl">
        <LiveListView lives={lives} showControls={false} />
      </Section>

      {/* 6. EVENT */}
      <Section id="event" subtitle="EVENT" title="イベント" tone="white">
        <EventListView events={events} showControls={false} />
      </Section>

      {/* 7. GOODS */}
      <Section id="goods" subtitle="GOODS" title="グッズ" tone="pearl">
        <GoodsListView goods={goods} showControls={false} />
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
