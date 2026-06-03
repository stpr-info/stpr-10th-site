-- =========================================================================
-- すとぷり 10th Anniversary — magazines に画像ギャラリー（複数画像）を追加
--
-- 方針: add column if not exists で冪等。
-- Supabase の SQL Editor に貼り付けて実行する。
-- =========================================================================

-- 画像ギャラリー（表紙以外の複数画像）: 公開URLの配列
alter table public.magazines add column if not exists images text[] not null default '{}';
