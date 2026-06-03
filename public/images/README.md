# 画像配置ガイド

各データの画像はここに配置する。ファイルが無い場合はゴールドの
プレースホルダーが表示されるため、未配置でもビルド・表示は問題ない。

## 命名規則

| 種別 | パス | 参照元フィールド |
| --- | --- | --- |
| メンバー 10周年ビジュアル | `members/{id}-visual.jpg` | `Member.visual10th` |
| メンバー ミニキャラ | `members/{id}-mini.png` | `Member.miniChara` |
| ライブ キービジュアル | `lives/{slug}.jpg` | `Live.keyVisual` |
| グッズ | `goods/{slug}.jpg` | `Goods.image` |
| イベント | `events/{slug}.jpg` | `Event.image` |
| アルバム カバー | `albums/{slug}.jpg` | `Album.cover` |

※ `data/*.ts` の各フィールドには `/images/...` から始まる絶対パスを記入する。
   例: `visual10th: "/images/members/rinu-visual.jpg"`

## 10周年ロゴ

トップ HERO のロゴは `public/logo-10th.png`（`<Image>` で表示）。
未配置時はゴールドシマーのテキストロゴにフォールバックする。
