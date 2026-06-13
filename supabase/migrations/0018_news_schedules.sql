-- =========================================================================
-- STPR INFO — news / schedules テーブルを追加
--
-- NEWS     … お知らせ記事（速報・注目・ネタバレ注意フラグ、カテゴリ、複数グループ）
-- SCHEDULE … ライブ/イベント/配信などの予定（種別・開始/終了日時）
--
-- 方針: RLS 有効化 + 公開読み取り（anon/authenticated は SELECT のみ）。
-- 書き込みは管理画面の service-role クライアント（RLS バイパス）で行う。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  group_slugs text[] not null default '{}',
  category text,
  thumbnail text,
  is_breaking boolean not null default false,
  is_featured boolean not null default false,
  spoiler boolean not null default false,
  published_at timestamptz,
  status text not null default 'draft', -- draft / scheduled / published
  created_at timestamptz not null default now()
);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  group_slug text,
  type text, -- live / event / goods / ticket / stream
  start_at timestamptz,
  end_at timestamptz,
  venue text,
  note text,
  created_at timestamptz not null default now()
);

-- 並び替え用インデックス
create index if not exists news_published_at_idx on public.news (published_at desc);
create index if not exists schedules_start_at_idx on public.schedules (start_at);

-- RLS 有効化 + 公開読み取り
alter table public.news enable row level security;
alter table public.schedules enable row level security;

drop policy if exists "news public read" on public.news;
create policy "news public read" on public.news
  for select to anon, authenticated using (true);

drop policy if exists "schedules public read" on public.schedules;
create policy "schedules public read" on public.schedules
  for select to anon, authenticated using (true);
