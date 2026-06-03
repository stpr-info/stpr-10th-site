"use client"

import Image from "next/image"
import { useState } from "react"

/**
 * 10周年ロゴ。public/logo-10th.png を next/image で表示する。
 * 画像が未配置（プレースホルダー状態）の場合は、ゴールドシマーの
 * テキストロゴにフォールバックして見た目を保つ。
 */
export default function HeroLogo() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-2 fade-up">
        <span className="gold-shimmer font-display text-5xl font-bold tracking-[0.15em] sm:text-7xl">
          10th
        </span>
        <span className="font-display text-sm tracking-[0.5em] text-gold-600 sm:text-base">
          ANNIVERSARY
        </span>
      </div>
    )
  }

  return (
    <Image
      src="/logo-10th.png"
      alt="すとぷり 10th Anniversary ロゴ"
      width={320}
      height={160}
      priority
      onError={() => setFailed(true)}
      className="h-auto w-[220px] drop-shadow-[0_4px_16px_rgba(212,168,83,0.35)] sm:w-[320px]"
    />
  )
}
