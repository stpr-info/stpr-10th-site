import ImageGallery from "@/components/common/ImageGallery"

export type EventGridItem = {
  title?: string
  images: string[]
  /** 補助テキスト行（販売期間など） */
  meta?: string[]
  description?: string
  info?: string
  linkUrl?: string
  linkLabel?: string
}

/**
 * メニュー・特典 / グッズ販売 用の表示。
 * 各アイテムの画像を全部サムネイル（アスペクト比維持）で並べ、
 * タップで画面いっぱいのライトボックス（ImageGallery）。
 */
export default function EventItemGrid({ items }: { items: EventGridItem[] }) {
  if (items.length === 0) return null

  return (
    <div className="flex flex-col gap-5">
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border border-gold-100/70 bg-white/40 p-4">
          {it.title && (
            <h3 className="mb-2 font-serif text-base font-bold text-[#3a2540]">{it.title}</h3>
          )}

          {it.images.length > 0 && (
            <div className="mb-2">
              <ImageGallery images={it.images} />
            </div>
          )}

          {it.meta && it.meta.length > 0 && (
            <div className="space-y-0.5 text-sm text-[#6a5570]">
              {it.meta.map((m, k) => (
                <p key={k}>{m}</p>
              ))}
            </div>
          )}
          {it.description && (
            <p className="mt-1 whitespace-pre-wrap text-sm text-[#6a5570]">{it.description}</p>
          )}
          {it.info && (
            <p className="mt-1 whitespace-pre-wrap text-xs text-[#9a8aa0]">{it.info}</p>
          )}
          {it.linkUrl && (
            <a
              href={it.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block rounded-xl bg-gold-400 px-4 py-2 text-xs text-white transition-colors hover:bg-gold-500"
            >
              {it.linkLabel ?? "リンク"} →
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
