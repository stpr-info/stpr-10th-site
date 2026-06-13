"use client"

import { useState } from "react"

type Props = {
  name: string
  options: string[]
  optionLabels?: Record<string, string>
  initial?: string[]
}

/** 複数選択をチップ（ピル）トグルで行う。選択値は hidden input（同名・複数）で送信し、
 *  既存の multiselect 保存処理（formData.getAll → text[]）と互換。 */
export default function ChipMultiSelect({ name, options, optionLabels, initial }: Props) {
  const [selected, setSelected] = useState<string[]>(initial ?? [])

  const toggle = (opt: string) =>
    setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]))

  return (
    <div className="flex flex-wrap gap-2">
      {selected.map((opt) => (
        <input key={opt} type="hidden" name={name} value={opt} />
      ))}
      {options.map((opt) => {
        const on = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              on
                ? "border-gold-400 bg-gold-400 text-white"
                : "border-gold-200 bg-white text-[#6a5570] hover:bg-gold-50"
            }`}
          >
            {optionLabels?.[opt] ?? opt}
          </button>
        )
      })}
    </div>
  )
}
