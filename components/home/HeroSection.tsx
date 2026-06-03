import Image from "next/image"
import { T, MEMBER_COLORS } from "@/lib/theme"

// 花びらパーティクルの配置（決定的な値でハイドレーション不一致を回避）。控えめに9個。
const PETALS = [
  { left: "6%", delay: "0s", duration: "15s", size: 13 },
  { left: "17%", delay: "3s", duration: "18s", size: 10 },
  { left: "29%", delay: "6s", duration: "16s", size: 15 },
  { left: "42%", delay: "1.5s", duration: "20s", size: 11 },
  { left: "55%", delay: "4.5s", duration: "17s", size: 9 },
  { left: "67%", delay: "2s", duration: "19s", size: 14 },
  { left: "78%", delay: "5.5s", duration: "14s", size: 11 },
  { left: "88%", delay: "7s", duration: "18s", size: 13 },
  { left: "95%", delay: "3.5s", duration: "16s", size: 10 },
]

// 小さな星（✦）20個。サイズ4〜10px / opacity 0.3〜0.6 / twinkle。
// 決定的座標でハイドレーション不一致を回避。
const STARS = [
  { top: 8, left: 12, size: 8, opacity: 0.5, delay: 0 },
  { top: 14, left: 78, size: 6, opacity: 0.45, delay: 0.6 },
  { top: 21, left: 30, size: 5, opacity: 0.4, delay: 1.2 },
  { top: 11, left: 55, size: 7, opacity: 0.55, delay: 0.9 },
  { top: 27, left: 88, size: 4, opacity: 0.35, delay: 1.6 },
  { top: 33, left: 8, size: 9, opacity: 0.5, delay: 0.3 },
  { top: 38, left: 64, size: 5, opacity: 0.4, delay: 2.0 },
  { top: 44, left: 20, size: 7, opacity: 0.5, delay: 1.1 },
  { top: 18, left: 42, size: 4, opacity: 0.3, delay: 2.4 },
  { top: 52, left: 82, size: 6, opacity: 0.45, delay: 0.5 },
  { top: 58, left: 14, size: 8, opacity: 0.55, delay: 1.8 },
  { top: 63, left: 48, size: 5, opacity: 0.4, delay: 0.8 },
  { top: 69, left: 73, size: 6, opacity: 0.5, delay: 2.2 },
  { top: 74, left: 26, size: 5, opacity: 0.4, delay: 1.4 },
  { top: 78, left: 90, size: 7, opacity: 0.5, delay: 0.2 },
  { top: 83, left: 6, size: 6, opacity: 0.45, delay: 1.9 },
  { top: 86, left: 58, size: 10, opacity: 0.6, delay: 0.7 },
  { top: 90, left: 37, size: 5, opacity: 0.4, delay: 1.3 },
  { top: 47, left: 95, size: 4, opacity: 0.3, delay: 2.6 },
  { top: 55, left: 38, size: 6, opacity: 0.45, delay: 1.0 },
]

// 小さな宝石（ひし形）6個。サイズ8〜12px / メンバーカラー / opacity 0.25。
const GEMS = [
  { top: 20, left: 24, size: 10, color: 0 },
  { top: 35, left: 70, size: 8, color: 2 },
  { top: 50, left: 10, size: 12, color: 3 },
  { top: 62, left: 60, size: 9, color: 4 },
  { top: 30, left: 50, size: 8, color: 5 },
  { top: 72, left: 84, size: 11, color: 1 },
]

// 背景にうっすら描く花のアーチの、左右の柱に配るバラ（円の集合で表現）。
const FAINT_ROSES = [
  { cx: 150, cy: 300, s: 26 },
  { cx: 138, cy: 415, s: 30 },
  { cx: 162, cy: 525, s: 24 },
  { cx: 1050, cy: 300, s: 26 },
  { cx: 1062, cy: 415, s: 30 },
  { cx: 1038, cy: 525, s: 24 },
]

// ✦ 4方向星のポリゴン頂点（viewBox 0 0 24 24）。
const STAR_POINTS = "12,2 13.6,10.4 22,12 13.6,13.6 12,22 10.4,13.6 2,12 10.4,10.4"
// ひし形（宝石）のポリゴン頂点（viewBox 0 0 24 24）。
const GEM_POINTS = "12,1 21,11 12,23 3,11"

// 円の集合で1輪のバラを描く（中心 + 周囲5枚の花びら）。
function Rose({ cx, cy, s }: { cx: number; cy: number; s: number }) {
  const petals = [0, 1, 2, 3, 4].map((i) => {
    const a = (i * 72 - 90) * (Math.PI / 180)
    return { x: cx + Math.cos(a) * s * 0.5, y: cy + Math.sin(a) * s * 0.5 }
  })
  return (
    <g fill="#F472B6">
      {petals.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={s * 0.42} />
      ))}
      <circle cx={cx} cy={cy} r={s * 0.5} />
    </g>
  )
}

/**
 * トップの HERO。
 * - 背景: hero-bg.webp（花のアーチ・キャラ）を全面表示（唯一の背景）
 * - 薄い花のアーチ(SVG) / 花びら / 小さな星(✦) / 宝石(ひし形)（装飾オーバーレイ）
 * - 主役: 10周年ロゴ（next/image）
 * - 期間テキスト / キャッチコピー / スクロール誘導（上部中央に固める）
 *
 * グラデーション背景・時計シルエットは廃止。コンテンツはキャラに被らないよう
 * 上部に寄せ、白い影で可読性を確保する。アニメーションは fadeUp / twinkle /
 * floatPetal / scrollLine のみ。
 */
export default function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[75vh] items-center justify-start overflow-hidden">
      {/* 背景画像レイヤー（HERO の唯一の背景・最背面・全面表示） */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/images/hero-bg.webp"
          alt=""
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center top",
            opacity: 1,
          }}
          priority
        />
      </div>

      {/* ごく薄い花のアーチ（左下→上部中央→右下 + 柱のバラ） */}
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        style={{ opacity: 0.06 }}
      >
        <path
          d="M150 600 C 150 220 360 90 600 90 C 840 90 1050 220 1050 600"
          fill="none"
          stroke="#F472B6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {FAINT_ROSES.map((r, i) => (
          <Rose key={i} cx={r.cx} cy={r.cy} s={r.s} />
        ))}
      </svg>

      {/* 花びらパーティクル（HERO 内に閉じ込め・absolute） */}
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

      {/* 小さな星(✦) + 宝石(ひし形) */}
      <div className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden" aria-hidden>
        {STARS.map((s, i) => (
          <span
            key={`star-${i}`}
            className="absolute"
            style={{ top: `${s.top}%`, left: `${s.left}%`, opacity: s.opacity }}
          >
            <svg
              width={s.size}
              height={s.size}
              viewBox="0 0 24 24"
              style={{ display: "block", animation: `twinkle 3s ease-in-out ${s.delay}s infinite` }}
            >
              <polygon points={STAR_POINTS} fill="#FFFDF7" />
            </svg>
          </span>
        ))}
        {GEMS.map((g, i) => (
          <span
            key={`gem-${i}`}
            className="absolute"
            style={{ top: `${g.top}%`, left: `${g.left}%`, opacity: 0.25 }}
          >
            <svg width={g.size} height={g.size} viewBox="0 0 24 24" style={{ display: "block" }}>
              <polygon points={GEM_POINTS} fill={MEMBER_COLORS[g.color]} />
            </svg>
          </span>
        ))}
      </div>

      {/* === コンテンツ（キャラに被らないよう上部中央に固める） === */}
      <div
        className="relative z-10 flex flex-col items-center px-6 pb-16 text-center"
        style={{ paddingTop: "60px" }}
      >
        {/* ロゴ（主役） */}
        <div className="mb-6" style={{ animation: "fadeUp 0.8s ease-out both" }}>
          <Image
            src="/logo-10th.png"
            alt="すとぷり 10th Anniversary"
            width={360}
            height={200}
            priority
            className="h-auto"
            style={{ width: "clamp(240px, 40vw, 320px)", height: "auto", objectFit: "contain" }}
          />
        </div>

        {/* 期間テキスト */}
        <p
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "clamp(12px, 2vw, 15px)",
            letterSpacing: "0.3em",
            color: T.goldD,
            textShadow: "0 2px 8px rgba(255,255,255,0.8)",
            animation: "fadeUp 0.8s 0.2s ease-out both",
          }}
        >
          2026.6.4 — 2027.6.3
        </p>

        {/* キャッチコピー */}
        <p
          style={{
            fontFamily: "var(--font-noto-serif-jp), serif",
            fontSize: "clamp(13px, 2vw, 16px)",
            color: T.muted,
            marginTop: "12px",
            letterSpacing: "0.1em",
            textShadow: "0 2px 8px rgba(255,255,255,0.8)",
            animation: "fadeUp 0.8s 0.4s ease-out both",
          }}
        >
          10年間の軌跡を、ここに。
        </p>

        {/* スクロール誘導 */}
        <div
          className="mt-10 flex flex-col items-center gap-2"
          style={{ animation: "fadeUp 0.8s 0.6s ease-out both" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: T.muted,
              textShadow: "0 2px 8px rgba(255,255,255,0.8)",
            }}
          >
            SCROLL
          </span>
          <svg width="1" height="40" viewBox="0 0 1 40" aria-hidden>
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="40"
              stroke={T.gold}
              strokeWidth="1"
              style={{ animation: "scrollLine 1.5s ease-in-out infinite" }}
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
