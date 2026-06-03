-- =========================================================================
-- すとぷり 10th Anniversary — events に「コラボ先」カラムを追加
--
-- 方針: add column if not exists で冪等（再実行しても安全）。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

alter table public.events add column if not exists collab_partner text;
