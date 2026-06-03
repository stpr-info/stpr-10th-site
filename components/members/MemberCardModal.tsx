"use client"

import { useEffect, useState } from "react"
import type { Member } from "@/data/members"
import SafeImage from "@/components/common/SafeImage"

type Props = {
  member: Member
  onClose: () => void
}

/**
 * メンバーカードの拡大モーダル。
 * FLIP ボタンで 3D フリップし、裏面にミニキャラを表示する。
 */
export default function MemberCardModal({ member, onClose }: Props) {
  const [flipped, setFlipped] = useState(false)

  // Esc で閉じる + 背景スクロール抑止。
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
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#3a2540]/60 px-6 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${member.name} のカード`}
    >
      <div
        className="flex w-full max-w-sm flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* フリップ領域 */}
        <div className="w-full" style={{ perspective: "1200px" }}>
          <div
            className="relative w-full transition-transform duration-700"
            style={{
              aspectRatio: "2/3",
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* 表面 */}
            <div
              className="absolute inset-0"
              style={{ backfaceVisibility: "hidden" }}
            >
              <CardFace member={member}>
                <SafeImage
                  src={member.visual10th}
                  alt={`${member.name} 10周年ビジュアル`}
                  fill
                  fallbackLabel={member.nameEn}
                  className="object-cover"
                  sizes="384px"
                />
                <NameBanner member={member} />
              </CardFace>
            </div>

            {/* 裏面 */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <CardFace member={member}>
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{ backgroundColor: member.bgColor }}
                >
                  <div className="relative h-3/4 w-3/4">
                    <SafeImage
                      src={member.miniChara}
                      alt={`${member.name} ミニキャラ`}
                      fill
                      fallbackLabel={member.nameEn}
                      className="object-contain"
                      sizes="288px"
                    />
                  </div>
                </div>
                <NameBanner member={member} />
              </CardFace>
            </div>
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="rounded-full border border-gold-300 bg-white/90 px-6 py-2 font-display text-xs tracking-[0.2em] text-gold-700 transition-colors hover:bg-white"
          >
            {flipped ? "BACK" : "FLIP"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/60 bg-white/20 px-6 py-2 font-display text-xs tracking-[0.2em] text-white transition-colors hover:bg-white/30"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  )
}

/** カードの額縁（ゴールド + メンバーカラー） */
function CardFace({
  member,
  children,
}: {
  member: Member
  children: React.ReactNode
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      style={{
        padding: 6,
        background: `linear-gradient(135deg, #F5E6B8, #D4A853 40%, ${member.color} 100%)`,
        boxShadow: `0 16px 48px ${member.color}40`,
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-xl">
        <DiamondPattern color={member.color} />
        {children}
      </div>
    </div>
  )
}

/** 下部の名前バナー（EN + JP） */
function NameBanner({ member }: { member: Member }) {
  return (
    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-4 pt-10 text-center">
      <p className="font-display text-sm tracking-[0.3em] text-gold-200">
        {member.nameEn}
      </p>
      <p className="font-serif text-lg font-bold text-white">{member.name}</p>
    </div>
  )
}

/** メンバーカラーのひし形パターン背景（SVG） */
function DiamondPattern({ color }: { color: string }) {
  const id = `diamond-${color.replace("#", "")}`
  return (
    <svg className="absolute inset-0 -z-10 h-full w-full" aria-hidden>
      <defs>
        <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
          <rect width="28" height="28" fill={color} opacity="0.12" />
          <path d="M14 0 L28 14 L14 28 L0 14 Z" fill={color} opacity="0.18" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
