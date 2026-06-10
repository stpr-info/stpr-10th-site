alter table public.lives
  add column if not exists hashtag text,
  add column if not exists period_start timestamptz,
  add column if not exists period_end timestamptz,
  add column if not exists key_visual_url text,
  add column if not exists key_visual_height integer,
  add column if not exists key_visual_width integer,
  add column if not exists group_slugs text[] not null default '{}',
  add column if not exists member_slugs text[] not null default '{}',
  add column if not exists venues_json jsonb not null default '[]'::jsonb,
  add column if not exists ticket_info jsonb not null default '[]'::jsonb,
  add column if not exists fc_info jsonb not null default '[]'::jsonb,
  add column if not exists ticket_lineup jsonb not null default '[]'::jsonb,
  add column if not exists goods_info jsonb not null default '[]'::jsonb,
  add column if not exists upgrade_goods_info jsonb not null default '[]'::jsonb,
  add column if not exists ppv_info jsonb not null default '[]'::jsonb,
  add column if not exists live_viewing jsonb not null default '[]'::jsonb,
  add column if not exists related_live_slugs text[] not null default '{}',
  add column if not exists related_album_slugs text[] not null default '{}',
  add column if not exists official_site_url text,
  add column if not exists official_playlist_url text,
  add column if not exists official_report_url text,
  add column if not exists has_report boolean not null default false,
  add column if not exists report_gallery jsonb not null default '[]'::jsonb,
  add column if not exists microcms_id text unique;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'lives' and column_name = 'live_type' and data_type = 'text'
  ) then
    alter table public.lives alter column live_type type text[] using array[live_type];
  end if;
end $$;

create index if not exists lives_group_slugs_idx on public.lives using gin(group_slugs);
create index if not exists lives_member_slugs_idx on public.lives using gin(member_slugs);
create index if not exists lives_period_start_idx on public.lives (period_start);

notify pgrst, 'reload schema';
