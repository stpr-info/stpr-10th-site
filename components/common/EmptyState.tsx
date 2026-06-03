type Props = {
  /** 表示メッセージ（例: "ライブ情報を準備中です"） */
  label: string
}

/**
 * データが空配列のときに表示する「準備中」プレースホルダー。
 * 時計モチーフの円弧装飾を添えて、空でも世界観を保つ。
 */
export default function EmptyState({ label }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 rounded-3xl border border-gold-200/70 bg-white/50 px-8 py-16 text-center backdrop-blur-sm">
      <svg
        viewBox="0 0 64 64"
        className="h-14 w-14 text-gold-400"
        fill="none"
        aria-hidden
      >
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M32 18v14l10 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="32" r="2.5" fill="currentColor" />
      </svg>
      <p className="font-serif text-base text-[#6a5570]">{label}</p>
    </div>
  )
}
