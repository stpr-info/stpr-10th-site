-- 0011_lives_group_slug.sql
-- 目的: lives テーブルを「6グループ対応のライブDB」へ拡張する。
--   - group_slug : 所属グループ識別子（公開 /live ページの GroupTabs 絞り込みに使う）
--   - subtitle / tour_name : サブタイトル・ツアー名
--   - is_active : 公開フラグ（default true）。false で公開一覧から除外する。
--   - is_family : STPR Family / すとふぇす 等の合同ライブ判定
--
-- 並び順は既存の sort_order（integer）をそのまま display_order として流用する
-- （新しい列は追加しない）。
--
-- ▼ 実行方法（手動）:
--   1. Supabase ダッシュボード → SQL Editor を開く
--   2. このファイルの中身を貼り付けて Run
--   3. すべて IF NOT EXISTS / 冪等なので再実行しても安全
--
-- グループ slug の取り得る値（公開ページ・管理フォームと一致させること）:
--   Strawberry_Prince / knightX / amptak / Meteorites / SneakerStep / True_Lip

alter table public.lives
  add column if not exists group_slug text,
  add column if not exists subtitle   text,
  add column if not exists tour_name  text,
  add column if not exists is_active  boolean not null default true,
  add column if not exists is_family  boolean not null default false;

-- 既存行（すとぷり 10th 特設サイトのライブ）はすべて Strawberry_Prince 扱いにする。
update public.lives
   set group_slug = 'Strawberry_Prince'
 where group_slug is null;

-- グループ絞り込み・公開フィルタの索引。
create index if not exists lives_group_slug_idx on public.lives (group_slug);
create index if not exists lives_is_active_idx  on public.lives (is_active);
