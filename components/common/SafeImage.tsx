"use client"

import Image, { type ImageProps } from "next/image"
import { useState } from "react"

type Props = Omit<ImageProps, "src" | "alt"> & {
  src?: string
  alt: string
  /** フォールバック時に中央へ表示するラベル（省略時はロゴ風） */
  fallbackLabel?: string
}

/**
 * 画像が無い / 読み込み失敗時にゴールドのプレースホルダーを表示する画像。
 * 親要素は relative + サイズ指定（fill 利用）であること。
 */
export default function SafeImage({
  src,
  alt,
  fallbackLabel,
  className,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gold-100 via-rose-50 to-lavender/40">
        <span className="gold-shimmer font-display text-xs tracking-[0.3em]">
          {fallbackLabel ?? "10th"}
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
