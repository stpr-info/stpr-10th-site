-- =========================================================================
-- すとぷり 10th Anniversary — visuals（ビジュアル一覧）テーブルを追加
--
-- 方針: 0001_init.sql の各テーブルと同じ構成（uuid PK / updated_at トリガ /
--       RLS 有効化 + 公開読み取りポリシー）。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

create table if not exists public.visuals (
  id           uuid primary key default gen_random_uuid(),
  slug         text,
  title        text,
  image        text,
  release_date date,
  member       text,
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- updated_at トリガ（set_updated_at は 0001 で定義済み）
drop trigger if exists trg_visuals_updated_at on public.visuals;
create trigger trg_visuals_updated_at
  before update on public.visuals
  for each row execute function public.set_updated_at();

-- RLS 有効化 + 公開読み取り（anon/authenticated は SELECT のみ）
alter table public.visuals enable row level security;

drop policy if exists "visuals public read" on public.visuals;
create policy "visuals public read" on public.visuals
  for select to anon, authenticated using (true);
