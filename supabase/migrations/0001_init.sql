-- =========================================================================
-- すとぷり 10th Anniversary 特設サイト — 初期スキーマ（安全版・ベタ書き）
--
-- 7 テーブル: lives / goods / events / songs / albums / magazines / media
--
-- 方針:
--   - DO ブロック / format() を使わず、全文をベタ書き（エラー要因を最小化）
--   - gen_random_uuid() は PostgreSQL 13+ の組み込み関数（拡張不要）
--   - すべて IF NOT EXISTS / DROP ... IF EXISTS で冪等（再実行しても安全）
--   - RLS: 全テーブル有効化、anon/authenticated は SELECT のみ
--          書き込みポリシーは作らない（Secret キーが RLS をバイパスする）
--
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================


-- =========================================================================
-- 1. updated_at 自動更新関数
-- =========================================================================
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- =========================================================================
-- 2. テーブル定義
-- =========================================================================

-- ---- lives（ライブ） ----------------------------------------------------
create table if not exists public.lives (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  date_label  text not null default '',
  start_date  date,
  end_date    date,
  venues      jsonb not null default '[]'::jsonb,
  status      text not null default 'coming'
              check (status in ('coming', 'ongoing', 'finished')),
  key_visual  text,
  ticket_url  text,
  description text,
  note        text,
  is_10th     boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- ---- goods（グッズ） ----------------------------------------------------
create table if not exists public.goods (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  category     text not null default '',
  release_date date,
  price        text,
  image        text,
  shop_url     text,
  description  text,
  member_ids   text[] not null default '{}',
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- events（イベント） -------------------------------------------------
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  event_type   text not null default '',
  date_label   text not null default '',
  start_date   date,
  end_date     date,
  location     text,
  url          text,
  image        text,
  description  text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- songs（楽曲） ------------------------------------------------------
create table if not exists public.songs (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  type         text not null default 'original'
               check (type in ('original', 'cover')),
  release_date date,
  youtube_id   text,
  album_slug   text,
  member_ids   text[] not null default '{}',
  description  text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- albums（アルバム） -------------------------------------------------
create table if not exists public.albums (
  id           uuid primary key default gen_random_uuid(),
  slug         text not null unique,
  title        text not null,
  release_date date,
  cover        text,
  track_slugs  text[] not null default '{}',
  description  text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- magazines（雑誌） --------------------------------------------------
create table if not exists public.magazines (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  issue        text not null default '',
  release_date date,
  publisher    text,
  content      text,
  image        text,
  url          text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ---- media（メディア出演: TV / RADIO） ----------------------------------
create table if not exists public.media (
  id           uuid primary key default gen_random_uuid(),
  type         text not null default 'tv'
               check (type in ('tv', 'radio')),
  program_name text not null,
  station      text not null default '',
  date_label   text not null default '',
  content      text,
  url          text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);


-- =========================================================================
-- 3. updated_at トリガ（テーブルごとにベタ書き）
-- =========================================================================
drop trigger if exists trg_lives_updated_at on public.lives;
create trigger trg_lives_updated_at
  before update on public.lives
  for each row execute function public.set_updated_at();

drop trigger if exists trg_goods_updated_at on public.goods;
create trigger trg_goods_updated_at
  before update on public.goods
  for each row execute function public.set_updated_at();

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();

drop trigger if exists trg_songs_updated_at on public.songs;
create trigger trg_songs_updated_at
  before update on public.songs
  for each row execute function public.set_updated_at();

drop trigger if exists trg_albums_updated_at on public.albums;
create trigger trg_albums_updated_at
  before update on public.albums
  for each row execute function public.set_updated_at();

drop trigger if exists trg_magazines_updated_at on public.magazines;
create trigger trg_magazines_updated_at
  before update on public.magazines
  for each row execute function public.set_updated_at();

drop trigger if exists trg_media_updated_at on public.media;
create trigger trg_media_updated_at
  before update on public.media
  for each row execute function public.set_updated_at();


-- =========================================================================
-- 4. RLS 有効化（テーブルごとにベタ書き）
-- =========================================================================
alter table public.lives     enable row level security;
alter table public.goods     enable row level security;
alter table public.events    enable row level security;
alter table public.songs     enable row level security;
alter table public.albums    enable row level security;
alter table public.magazines enable row level security;
alter table public.media     enable row level security;


-- =========================================================================
-- 5. 公開読み取りポリシー（anon/authenticated は SELECT のみ）
--    書き込みポリシーは作らない → Secret キーのみが書き込み可能
-- =========================================================================
drop policy if exists "lives public read" on public.lives;
create policy "lives public read" on public.lives
  for select to anon, authenticated using (true);

drop policy if exists "goods public read" on public.goods;
create policy "goods public read" on public.goods
  for select to anon, authenticated using (true);

drop policy if exists "events public read" on public.events;
create policy "events public read" on public.events
  for select to anon, authenticated using (true);

drop policy if exists "songs public read" on public.songs;
create policy "songs public read" on public.songs
  for select to anon, authenticated using (true);

drop policy if exists "albums public read" on public.albums;
create policy "albums public read" on public.albums
  for select to anon, authenticated using (true);

drop policy if exists "magazines public read" on public.magazines;
create policy "magazines public read" on public.magazines
  for select to anon, authenticated using (true);

drop policy if exists "media public read" on public.media;
create policy "media public read" on public.media
  for select to anon, authenticated using (true);


-- =========================================================================
-- 6. PostgREST にスキーマ変更を通知（即時リロード）
-- =========================================================================
notify pgrst, 'reload schema';
