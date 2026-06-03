"use client"

import { useEffect, useState } from "react"

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
 * メニュー・特典 / グッズ販売 用のサムネイルグリッド。
 * - PC では複数列で一覧表示（SP 2列 / sm 3列 / md 4列）
 * - 各アイテムをタップ/クリックでモーダル拡大表示し、画像・詳細を見られる
 */
export default function EventItemGrid({ items }: { items: EventGridItem[] }) {
  const [active, setActive] = useState<number | null>(null)

  if (items.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((it, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className="group flex flex-col overflow-hidden rounded-xl border border-gold-100/70 bg-white/60 text-left transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:shadow-sm"
          >
            <div className="relative aspect-square w-full bg-gold-50">
              {it.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={it.images[0]}
                  alt={it.title ?? ""}
                  className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-[10px] text-[#9a8aa0]">
                  NO IMAGE
                </div>
              )}
              {it.images.length > 1 && (
                <span className="absolute bottom-1 right-1 rounded-full bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
                  +{it.images.length - 1}
                </span>
              )}
            </div>
            {it.title && (
              <p className="truncate px-2 py-1.5 text-xs font-medium text-[#3a2540]">
                {it.title}
              </p>
            )}
          </button>
        ))}
      </div>

      {active != null && items[active] && (
        <ItemModal item={items[active]} onClose={() => setActive(null)} />
      )}
    </>
  )
}

function ItemModal({ item, onClose }: { item: EventGridItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#3a2540]/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? "詳細"}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-xl md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          {item.title && (
            <h3 className="font-serif text-lg font-bold text-[#3a2540]">{item.title}</h3>
          )}
          <button
            type="button"
            onClick={onClose}
            aria-label="閉じる"
            className="shrink-0 rounded-full border border-gold-200 px-3 py-1 text-xs text-[#6a5570] transition-colors hover:bg-gold-50"
          >
            閉じる
          </button>
        </div>

        {item.images.length > 0 && (
          <div className="flex flex-col gap-3">
            {item.images.map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={i} src={src} alt={item.title ?? ""} className="w-full rounded-lg" />
            ))}
          </div>
        )}

        {item.meta && item.meta.length > 0 && (
          <div className="mt-3 space-y-1 text-sm text-[#6a5570]">
            {item.meta.map((m, i) => (
              <p key={i}>{m}</p>
            ))}
          </div>
        )}

        {item.description && (
          <p className="mt-3 whitespace-pre-wrap text-sm text-[#6a5570]">{item.description}</p>
        )}
        {item.info && (
          <p className="mt-2 whitespace-pre-wrap text-xs text-[#9a8aa0]">{item.info}</p>
        )}

        {item.linkUrl && (
          <a
            href={item.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-gold-400 px-4 py-2 text-xs text-white transition-colors hover:bg-gold-500"
          >
            {item.linkLabel ?? "リンク"} →
          </a>
        )}
      </div>
    </div>
  )
}
