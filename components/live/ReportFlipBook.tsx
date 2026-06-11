"use client"

import { useEffect, useRef, useState } from "react"
import Script from "next/script"

const PAGE_FLIP_SRC = "https://unpkg.com/page-flip@2.0.7/dist/js/page-flip.browser.js"

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    St?: any
  }
}

/**
 * ライブレポートを雑誌風（StPageFlip）で表示する。
 * - PC: 見開きでページめくり（端をドラッグ / 前へ・次へ）
 * - スマホ: 画像を縦スクロール
 * StPageFlip は next/script(CDN) で読み込み、ロード後に初期化する。
 */
export default function ReportFlipBook({ images }: { images: string[] }) {
  const bookRef = useRef<HTMLDivElement>(null)
  const pfRef = useRef<any>(null)
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!loaded || typeof window === "undefined") return
    if (window.innerWidth < 768) return // スマホは縦スクロール表示なので初期化しない
    if (!window.St || !bookRef.current || pfRef.current) return

    const pf = new window.St.PageFlip(bookRef.current, {
      width: 300,
      height: 420,
      size: "fixed",
      drawShadow: true,
      flippingTime: 700,
      usePortrait: false,
      showCover: false,
      autoSize: false,
      maxShadowOpacity: 0.5,
    })
    pf.loadFromHTML(bookRef.current.querySelectorAll(".page"))
    pf.on("flip", () => setPage(pf.getCurrentPageIndex() + 1))
    pfRef.current = pf

    return () => {
      try {
        pf.destroy()
      } catch {
        /* noop */
      }
      pfRef.current = null
    }
  }, [loaded, images])

  if (images.length === 0) return null

  return (
    <>
      <Script src={PAGE_FLIP_SRC} strategy="afterInteractive" onLoad={() => setLoaded(true)} />

      {/* PC: 見開きページめくり */}
      <div className="hidden md:block">
        <div className="flex justify-center rounded-t-xl bg-[#1a1a1a] px-5 pt-5">
          <div ref={bookRef} className="book">
            {images.map((src, i) => (
              <div key={i} className="page overflow-hidden bg-[#111]" data-density="soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`レポート ${i + 1}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 rounded-b-xl bg-[#1a1a1a] p-3">
          <button
            type="button"
            onClick={() => pfRef.current?.flipPrev()}
            className="rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
          >
            ‹ 前へ
          </button>
          <span className="min-w-[64px] text-center text-xs text-white/60">
            {page} / {images.length}
          </span>
          <button
            type="button"
            onClick={() => pfRef.current?.flipNext()}
            className="rounded-md border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white transition-colors hover:bg-white/20"
          >
            次へ ›
          </button>
        </div>
        <p className="mt-1.5 text-center text-[11px] text-gray-400">
          ページの端をドラッグしてめくれます
        </p>
      </div>

      {/* スマホ: 縦スクロール */}
      <div className="overflow-hidden rounded-lg md:hidden">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={src} alt={`レポート ${i + 1}`} className="block w-full" />
        ))}
      </div>
    </>
  )
}
