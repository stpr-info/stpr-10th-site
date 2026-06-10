"use client"

import { useState } from "react"
import Link from "next/link"

const ABOUT_URL = "https://www.stprinformalfansite.com/siteoverview"

/**
 * 公開 /live ページ専用のシンプルヘッダー（旧 Wix サイト互換）。
 * サイドバーなし・STPR Blue ベース。スマホはハンバーガーメニュー。
 */
export default function LiveHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-accent-600 text-white shadow-sm">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/live" className="flex items-center gap-2 font-bold tracking-wide">
          <span className="text-base md:text-lg">STPR LIVE</span>
          <span className="hidden text-xs font-medium opacity-80 sm:inline">DATABASE</span>
        </Link>

        {/* PC ナビ */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/live" className="font-medium transition-opacity hover:opacity-80">
            ライブ
          </Link>
          <a
            href={ABOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-opacity hover:opacity-80"
          >
            当サイトについて
          </a>
        </nav>

        {/* ハンバーガー（SP） */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="メニュー"
          className="flex h-9 w-9 items-center justify-center rounded md:hidden"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* SP メニュー本体 */}
      {open && (
        <nav className="border-t border-white/20 bg-accent-700 md:hidden">
          <Link
            href="/live"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-accent-600"
          >
            ライブ
          </Link>
          <a
            href={ABOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-medium transition-colors hover:bg-accent-600"
          >
            当サイトについて
          </a>
        </nav>
      )}
    </header>
  )
}
