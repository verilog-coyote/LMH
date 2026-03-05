type Point = { x: number; y: number }

/**
 * Evaluate the Catmull-Rom spline defined by `anchors` at global parameter
 * `t` in [0, 1].  Uses the same tangent formulation as buildSplinePath so
 * the sampled curve matches the SVG path exactly.
 */
export function evalCatmullRom(anchors: Point[], t: number): Point {
  const n = anchors.length
  if (n < 2) return anchors[0] ?? { x: 0, y: 0 }

  const segments = n - 1
  const scaled = Math.max(0, Math.min(1, t)) * segments
  const seg = Math.min(Math.floor(scaled), segments - 1)
  const local = scaled - seg

  const p0 = anchors[Math.max(seg - 1, 0)]
  const p1 = anchors[seg]
  const p2 = anchors[Math.min(seg + 1, n - 1)]
  const p3 = anchors[Math.min(seg + 2, n - 1)]

  const cp1x = p1.x + (p2.x - p0.x) / 6
  const cp1y = p1.y + (p2.y - p0.y) / 6
  const cp2x = p2.x - (p3.x - p1.x) / 6
  const cp2y = p2.y - (p3.y - p1.y) / 6

  const u = local
  const u2 = u * u
  const u3 = u2 * u
  const inv = 1 - u
  const inv2 = inv * inv
  const inv3 = inv2 * inv

  return {
    x: inv3 * p1.x + 3 * inv2 * u * cp1x + 3 * inv * u2 * cp2x + u3 * p2.x,
    y: inv3 * p1.y + 3 * inv2 * u * cp1y + 3 * inv * u2 * cp2y + u3 * p2.y,
  }
}

interface ArcLengthTable {
  params: number[]
  lengths: number[]
  totalLength: number
}

export function buildArcLengthTable(
  anchors: Point[],
  numSamples = 500
): ArcLengthTable {
  const params: number[] = [0]
  const lengths: number[] = [0]
  let prev = evalCatmullRom(anchors, 0)
  let cumulative = 0

  for (let i = 1; i <= numSamples; i++) {
    const t = i / numSamples
    const pt = evalCatmullRom(anchors, t)
    const dx = pt.x - prev.x
    const dy = pt.y - prev.y
    cumulative += Math.sqrt(dx * dx + dy * dy)
    params.push(t)
    lengths.push(cumulative)
    prev = pt
  }

  return { params, lengths, totalLength: cumulative }
}

/**
 * Return `count` points distributed at equal arc-length intervals along
 * the spline.  The first point is at the start, the last at the end.
 */
export function distributeEvenly(anchors: Point[], count: number): Point[] {
  if (count <= 0) return []
  if (count === 1) return [evalCatmullRom(anchors, 0.5)]

  const table = buildArcLengthTable(anchors)
  const positions: Point[] = []

  for (let i = 0; i < count; i++) {
    const targetLen = (i / (count - 1)) * table.totalLength
    let lo = 0
    let hi = table.lengths.length - 1
    while (lo < hi - 1) {
      const mid = (lo + hi) >> 1
      if (table.lengths[mid] < targetLen) lo = mid
      else hi = mid
    }
    const segLen = table.lengths[hi] - table.lengths[lo]
    const frac = segLen > 0 ? (targetLen - table.lengths[lo]) / segLen : 0
    const t = table.params[lo] + frac * (table.params[hi] - table.params[lo])
    const pt = evalCatmullRom(anchors, t)
    positions.push({ x: Math.round(pt.x * 10) / 10, y: Math.round(pt.y * 10) / 10 })
  }

  return positions
}

export function buildSplinePath(anchors: Point[]): string {
  if (anchors.length < 2) return ""
  const n = anchors.length
  let d = `M ${anchors[0].x} ${anchors[0].y}`
  for (let i = 0; i < n - 1; i++) {
    const p0 = anchors[Math.max(i - 1, 0)]
    const p1 = anchors[i]
    const p2 = anchors[Math.min(i + 1, n - 1)]
    const p3 = anchors[Math.min(i + 2, n - 1)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`
  }
  return d
}
