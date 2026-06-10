-- 公演ごとのセットリスト（会場・日付・部ごとにセトリが変わる場合）。
-- [{ showRef, setlist: [{trackNumber, title, memo}] }] 形式の jsonb 配列。
alter table public.lives
  add column if not exists show_setlists jsonb not null default '[]'::jsonb;
