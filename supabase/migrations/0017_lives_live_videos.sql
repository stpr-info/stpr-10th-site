-- ライブ映像（YouTube）一覧を追加。
-- 集合写真（公演ごと）は venues(jsonb) 内の shows[].groupPhotos に格納するため、
-- スキーマ変更は不要（このマイグレーションは live_videos 列のみ追加）。
alter table public.lives
  add column if not exists live_videos jsonb not null default '[]'::jsonb;
