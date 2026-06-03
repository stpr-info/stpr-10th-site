import HeroClock from "./HeroClock"
import HeroLogo from "./HeroLogo"

// 花びらパーティクルの配置（決定的な値でハイドレーション不一致を回避）。
const PETALS = [
  { left: "8%", delay: "0s", duration: "14s", size: 14 },
  { left: "20%", delay: "3s", duration: "18s", size: 10 },
  { left: "34%", delay: "6s", duration: "15s", size: 16 },
  { left: "48%", delay: "1.5s", duration: "20s", size: 12 },
  { left: "61%", delay: "4.5s", duration: "16s", size: 9 },
  { left: "73%", delay: "2s", duration: "19s", size: 15 },
  { left: "86%", delay: "5.5s", duration: "13s", size: 11 },
  { left: "93%", delay: "7s", duration: "17s", size: 13 },
]

// 星のきらめき配置。
const STARS = [
  { top: "12%", left: "14%", delay: "0s", r: 2.5 },
  { top: "22%", left: "82%", delay: "0.6s", r: 3 },
  { top: "34%", left: "30%", delay: "1.2s", r: 2 },
  { top: "18%", left: "60%", delay: "0.9s", r: 2.5 },
  { top: "44%", left: "88%", delay: "1.6s", r: 2 },
  { top: "52%", left: "10%", delay: "0.3s", r: 3 },
  { top: "60%", left: "70%", delay: "2s", r: 2.2 },
]

/**
 * トップの HERO。
 * - ピンク→ラベンダー→スカイのグラデーション背景
 * - 花のアーチ・柱の SVG 装飾
 * - リアルタイム時計盤（HeroClock）
 * - 10周年ロゴ（HeroLogo）
 * - 花びらパーティクル / 星のきらめき（CSS アニメーション）
 */
export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* グラデーション背景 */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(170deg, #FBCFE8 0%, #FDF4F0 30%, #C4B5FD 70%, #BAE6FD 100%)",
        }}
      />

      {/* 花のアーチ（上部に額縁状の弧） */}
      <svg
        viewBox="0 0 1200 400"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full w-full opacity-70"
        aria-hidden
      >
        <defs>
          <linearGradient id="archGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D4A853" />
            <stop offset="50%" stopColor="#F5E6B8" />
            <stop offset="100%" stopColor="#D4A853" />
          </linearGradient>
        </defs>
        {/* アーチ本体 */}
        <path
          d="M40 400 V160 Q40 40 240 40 H960 Q1160 40 1160 160 V400"
          fill="none"
          stroke="url(#archGrad)"
          strokeWidth="6"
          opacity="0.8"
        />
        {/* 柱の装飾 */}
        <rect x="30" y="160" width="20" height="240" rx="6" fill="url(#archGrad)" opacity="0.5" />
        <rect x="1150" y="160" width="20" height="240" rx="6" fill="url(#archGrad)" opacity="0.5" />
        {/* アーチ上の花（円で簡略表現） */}
        {[240, 360, 600, 840, 960].map((cx, i) => (
          <g key={cx} opacity="0.85">
            <circle cx={cx} cy={48 + (i % 2) * 6} r="14" fill="#F9A8D4" />
            <circle cx={cx} cy={48 + (i % 2) * 6} r="6" fill="#FDF5D3" />
          </g>
        ))}
      </svg>

      {/* 花びらパーティクル */}
      <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden>
        {PETALS.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 block rounded-[50%_50%_50%_0]"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              background: "linear-gradient(135deg, #FBCFE8, #F9A8D4)",
              animation: `floatPetal ${p.duration} linear ${p.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* 星のきらめき */}
      <svg
        className="pointer-events-none absolute inset-0 -z-[5] h-full w-full"
        aria-hidden
      >
        {STARS.map((s, i) => (
          <circle
            key={i}
            cx={s.left}
            cy={s.top}
            r={s.r}
            fill="#FFFDF7"
            style={{ animation: `twinkle 3s ease-in-out ${s.delay} infinite` }}
          />
        ))}
      </svg>

      {/* 本体 */}
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 py-24 text-center sm:py-32">
        {/* 時計盤 */}
        <div className="h-40 w-40 sm:h-52 sm:w-52" style={{ animation: "fadeUp 1s ease-out both" }}>
          <HeroClock />
        </div>

        {/* ロゴ */}
        <HeroLogo />

        {/* キャッチ */}
        <p className="max-w-md font-serif text-sm leading-7 text-[#6a5570] sm:text-base">
          すとぷり、10周年。
          <br />
          時計塔と祝福の庭園で紡ぐ、感謝のアニバーサリー。
        </p>
      </div>
    </section>
  )
}
