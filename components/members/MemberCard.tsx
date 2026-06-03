"use client"

import { useState } from "react"
import type { Member } from "@/data/members"
import SafeImage from "@/components/common/SafeImage"
import MemberCardModal from "./MemberCardModal"

/**
 * メンバーカード。タップで拡大モーダルを開く。
 * - 背景: メンバーカラーのひし形パターン
 * - 額縁: ゴールド + メンバーカラー
 * - 表: 10周年ビジュアル（縦長 2:3）
 * - 下部に名前バナー
 * - ホバー: 浮き上がり + カラー glow
 */
export default function MemberCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left transition-transform duration-300 hover:-translate-y-1.5"
        aria-label={`${member.name} のカードを開く`}
      >
        <div
          className="relative w-full overflow-hidden rounded-2xl transition-shadow duration-300"
          style={{
            aspectRatio: "2/3",
            padding: 5,
            background: `linear-gradient(135deg, #F5E6B8, #D4A853 45%, ${member.color} 100%)`,
          }}
        >
          {/* glow（ホバー時のみ） */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: `0 12px 36px ${member.color}66` }}
          />
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            {/* ひし形パターン */}
            <svg className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <pattern
                  id={`mc-${member.id}`}
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <rect width="24" height="24" fill={member.bgColor} />
                  <path
                    d="M12 0 L24 12 L12 24 L0 12 Z"
                    fill={member.color}
                    opacity="0.16"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#mc-${member.id})`} />
            </svg>

            {/* ビジュアル */}
            <SafeImage
              src={member.visual10th}
              alt={`${member.name} 10周年ビジュアル`}
              fill
              fallbackLabel={member.nameEn}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 50vw, 33vw"
            />

            {/* 名前バナー */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-3 pb-3 pt-8 text-center">
              <p className="font-display text-[11px] tracking-[0.25em] text-gold-200">
                {member.nameEn}
              </p>
              <p className="font-serif text-sm font-bold text-white">
                {member.name}
              </p>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <MemberCardModal member={member} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
