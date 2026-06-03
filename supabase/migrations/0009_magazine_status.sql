-- =========================================================================
-- すとぷり 10th Anniversary — magazines に発売ステータスを追加
--
-- status: 'released'（発売済み） / 'upcoming'（発売予定）
-- 方針: add column if not exists で冪等。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

alter table public.magazines add column if not exists status text;
