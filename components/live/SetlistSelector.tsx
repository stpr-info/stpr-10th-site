"use client"

import { useState } from "react"
import type { SetlistItem, ShowSetlist } from "@/data/lives"

type Variant = "gold" | "plain"

const THEME: Record<
  Variant,
  { active: string; idle: string; list: string; num: string; title: string; memo: string }
> = {
  gold: {
    active: "bg-gold-400 text-white",
    idle: "border border-gold-200 bg-white text-gold-700 hover:bg-gold-50",
    list: "rounded-xl bg-gold-50/40 p-2",
    num: "text-[#9a8aa0]",
    title: "text-[#3a2540]",
    memo: "text-[#9a8aa0]",
  },
  plain: {
    active: "bg-accent-600 text-white",
    idle: "border border-gray-200 bg-white text-accent-700 hover:bg-gray-50",
    list: "rounded-lg bg-gray-50 p-2",
    num: "text-accent-600",
    title: "text-gray-800",
    memo: "text-gray-400",
  },
}

type Tab = { key: string; label: string; items: SetlistItem[] }

/**
 * 基本セトリ＋公演ごとのセトリをタブで切り替えて 1 つだけ表示する。
 * 公演ごとのセトリが多くても縦積みにならず見やすい。
 */
export default function SetlistSelector({
  base,
  showSetlists,
  variant = "gold",
}: {
  base?: SetlistItem[]
  showSetlists?: ShowSetlist[]
  variant?: Variant
}) {
  const t = THEME[variant]
  const tabs: Tab[] = []
  if (base && base.length > 0) tabs.push({ key: "__base__", label: "基本セトリ", items: base })
  for (const ss of showSetlists ?? []) {
    if (ss.showRef && ss.setlist && ss.setlist.length > 0) {
      tabs.push({ key: ss.showRef, label: ss.showRef, items: ss.setlist })
    }
  }

  const [active, setActive] = useState(0)
  if (tabs.length === 0) return null

  const idx = Math.min(active, tabs.length - 1)
  const sorted = [...tabs[idx].items].sort((a, b) => (a.trackNumber ?? 0) - (b.trackNumber ?? 0))

  return (
    <div>
      {tabs.length > 1 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {tabs.map((tab, i) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                i === idx ? t.active : t.idle
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <ol className={t.list}>
        {sorted.map((s, j) => (
          <li key={j} className="flex items-center gap-3 rounded p-1.5">
            <span className={`w-8 shrink-0 text-right text-xs ${t.num}`}>
              {s.trackNumber != null ? String(s.trackNumber).padStart(2, "0") : "－"}
            </span>
            <span className={`flex-1 text-sm ${t.title}`}>{s.title || "?"}</span>
            {s.memo && <span className={`text-xs ${t.memo}`}>{s.memo}</span>}
          </li>
        ))}
      </ol>
    </div>
  )
}
