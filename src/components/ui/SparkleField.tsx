'use client'

interface SparkleFieldProps {
  count?: number
  color?: string
  size?: number
  style?: React.CSSProperties
}

const CHARS = ['✦', '✧', '⋆', '✦', '✧', '⭑', '✦', '⋆']

export default function SparkleField({ count = 14, color = 'rgba(255,255,255,0.6)', size = 14, style }: SparkleFieldProps) {
  // Deterministic positions so SSR and client match (no Math.random in render)
  const particles = Array.from({ length: count }, (_, i) => {
    const seed = i + 1
    const x = ((seed * 67 + 13) % 94) + 3        // 3–97%
    const y = ((seed * 41 + 7)  % 88) + 5        // 5–93%
    const dur = 2.2 + (seed % 5) * 0.45           // 2.2–4.4s
    const delay = (seed % 8) * 0.38               // 0–2.66s
    const sz = size * (0.7 + (seed % 4) * 0.15)  // 70–115% of size
    const char = CHARS[seed % CHARS.length]
    return { x, y, dur, delay, sz, char }
  })

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, ...style }}>
      {particles.map((p, i) => (
        <span
          key={i}
          className="sparkle-ambient"
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: p.sz,
            color,
            lineHeight: 1,
            ['--dur' as string]: `${p.dur}s`,
            ['--delay' as string]: `${p.delay}s`,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}
