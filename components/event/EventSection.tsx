"use client"

import { useState, type ReactNode } from "react"

/**
 * イベント詳細の折りたたみ式セクション（アコーディオン）。
 * - デフォルトは閉じた状態
 * - 見出しクリック/タップで開閉
 * - grid-rows 0fr→1fr による控えめな高さアニメーション（激しい動きなし）
 */
export default function EventSection({
  title,
  count,
  defaultOpen = false,
  children,
}: {
  title: string
  count?: number
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-gold-200/70 bg-white/55 shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-4 text-left transition-colors hover:bg-gold-50/40 md:p-6"
      >
        <span className="flex items-center gap-2 font-serif font-bold text-[#3a2540]">
          {title}
          {count != null && (
            <span className="text-xs font-normal text-[#9a8aa0]">全{count}件</span>
          )}
        </span>
        <svg
          viewBox="0 0 20 20"
          aria-hidden
          className={`h-4 w-4 shrink-0 text-gold-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 7.5 L10 12.5 L15 7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-200 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 md:px-6 md:pb-6">{children}</div>
        </div>
      </div>
    </section>
  )
}
