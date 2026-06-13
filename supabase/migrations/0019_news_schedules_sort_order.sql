-- =========================================================================
-- news / schedules に sort_order 列を追加
--
-- 管理画面の一覧は全テーブル共通で sort_order（並び順）で order するため、
-- 0017 で作成した news / schedules にも sort_order を持たせる。
-- 既存テーブルへの後追い ALTER（0017 適用済みの環境向け）。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

alter table public.news add column if not exists sort_order integer not null default 0;
alter table public.schedules add column if not exists sort_order integer not null default 0;
