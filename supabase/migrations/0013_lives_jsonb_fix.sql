-- 0013_lives_jsonb_fix.sql
-- 0012 で jsonb 化を意図したが、既存列の型が残っていた3列を実際に jsonb へ変換する。
--   fc_info            : text[] → jsonb   （microCMS fcInfo は [{url,height,width}] のオブジェクト配列）
--   upgrade_goods_info : text[] → jsonb   （同上 upgradeGoodsInfo）
--   report_gallery     : text   → jsonb   （reportGallery は画像オブジェクト配列）
--
-- これを実行しないと import-lives-from-microcms.ts が
-- これら3列に jsonb を入れようとして型不一致で各行が失敗する。
--
-- 冪等: 既に jsonb の場合は変換をスキップする（do ブロックで型を判定）。
-- 既存データ（10th の text[] / text）は to_jsonb で JSON 配列/文字列へ可逆的に移行する。

do $$
begin
  -- fc_info: text[] → jsonb（空配列はそのまま []）
  if exists (
    select 1 from information_schema.columns
    where table_name = 'lives' and column_name = 'fc_info' and data_type <> 'jsonb'
  ) then
    alter table public.lives
      alter column fc_info drop default,
      alter column fc_info type jsonb using to_jsonb(fc_info),
      alter column fc_info set default '[]'::jsonb;
  end if;

  -- upgrade_goods_info: text[] → jsonb
  if exists (
    select 1 from information_schema.columns
    where table_name = 'lives' and column_name = 'upgrade_goods_info' and data_type <> 'jsonb'
  ) then
    alter table public.lives
      alter column upgrade_goods_info drop default,
      alter column upgrade_goods_info type jsonb using to_jsonb(upgrade_goods_info),
      alter column upgrade_goods_info set default '[]'::jsonb;
  end if;

  -- report_gallery: text → jsonb（null/空文字は []、それ以外は JSON 値として包む）
  if exists (
    select 1 from information_schema.columns
    where table_name = 'lives' and column_name = 'report_gallery' and data_type <> 'jsonb'
  ) then
    alter table public.lives
      alter column report_gallery drop default,
      alter column report_gallery type jsonb using (
        case
          when report_gallery is null or report_gallery = '' then '[]'::jsonb
          else to_jsonb(report_gallery)
        end
      ),
      alter column report_gallery set default '[]'::jsonb;
  end if;
end $$;

notify pgrst, 'reload schema';
