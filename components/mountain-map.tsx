"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { TIMELINE_EVENTS, CATEGORY_CONFIG, type TimelineEvent } from "@/lib/timeline-data"
import { X, MapPin } from "lucide-react"

function buildTrailPath(events: TimelineEvent[]): string {
  if (events.length < 2) return ""
  const pts = events.map((e) => ({ x: e.position.x, y: e.position.y }))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const dx = curr.x - prev.x
    const dy = curr.y - prev.y
    d += ` C ${prev.x + dx * 0.4} ${prev.y + dy * 0.15}, ${curr.x - dx * 0.4} ${curr.y - dy * 0.15}, ${curr.x} ${curr.y}`
  }
  return d
}

function Waypoint({ event, isActive, onClick }: { event: TimelineEvent; isActive: boolean; onClick: () => void }) {
  const config = CATEGORY_CONFIG[event.category]
  return (
    <button
      onClick={onClick}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
      style={{ left: `${event.position.x}%`, top: `${event.position.y}%` }}
      aria-label={`${event.year}: ${event.title}`}
      aria-pressed={isActive}
    >
      <span
        className={`absolute rounded-full transition-all duration-500 ${isActive ? "-inset-6 opacity-100" : "-inset-3 opacity-0 group-hover:opacity-70"}`}
        style={{ background: `radial-gradient(circle, ${config.color}30, transparent 70%)` }}
      />
      <span
        className={`relative block rounded-full border-2 transition-all duration-300 ${isActive ? "w-5 h-5 border-transparent" : "w-3.5 h-3.5 border-white/30 group-hover:w-4 group-hover:h-4 group-hover:border-transparent"}`}
        style={{
          backgroundColor: isActive ? config.color : "rgba(255,255,255,0.85)",
          boxShadow: isActive ? `0 0 24px ${config.color}, 0 0 8px ${config.color}80` : "0 0 10px rgba(0,0,0,0.5)",
        }}
      />
      <span className={`absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap text-[10px] font-bold tracking-[0.2em] text-white text-shadow-sm transition-all ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        {event.year}
      </span>
    </button>
  )
}

function DetailPopup({ event, containerRef, onClose }: { event: TimelineEvent; containerRef: React.RefObject<HTMLDivElement | null>; onClose: () => void }) {
  const config = CATEGORY_CONFIG[event.category]
  const popupRef = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const xPx = (event.position.x / 100) * rect.width
    const yPx = (event.position.y / 100) * rect.height
    const goLeft = event.position.x > 50

    setStyle({
      position: "absolute",
      top: yPx,
      ...(goLeft ? { right: rect.width - xPx + 28 } : { left: xPx + 28 }),
      transform: "translateY(-50%)",
      width: "clamp(260px, 28vw, 360px)",
      zIndex: 40,
    })
  }, [event, containerRef])

  return (
    <>
      <div className="absolute inset-0 z-30" onClick={onClose} />
      <div ref={popupRef} className="animate-slide-up" style={style} role="dialog" aria-modal="true" aria-label={`${event.year}: ${event.title}`}>
        <div className="frost-heavy rounded-2xl overflow-hidden">
          {/* Tribal pattern accent top */}
          <div className="h-1.5 relative overflow-hidden" style={{ background: config.color }}>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(/art/tribal-pattern.svg)", backgroundSize: "80px" }} />
          </div>

          <div className="p-5 md:p-6">
            <button onClick={onClose} className="absolute top-3 right-3 p-1.5 rounded-lg frost-light transition-colors" aria-label="Close">
              <X className="h-3.5 w-3.5 text-foreground/40" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: config.color }} />
              <span className="text-[9px] text-foreground/35 tracking-[0.2em] uppercase font-semibold">{config.label}</span>
              <span className="ml-auto font-serif text-sm italic" style={{ color: config.color }}>{event.year}</span>
            </div>

            <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight mb-3 font-medium">
              {event.title}
            </h3>

            <p className="text-[11px] text-foreground/45 leading-relaxed mb-4">{event.description}</p>

            <div className="flex items-center gap-2 text-[9px] text-primary/50 pt-3 border-t border-foreground/5">
              <MapPin className="h-3 w-3" />
              <span className="tracking-wide">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Legend() {
  return (
    <div className="absolute bottom-4 left-4 z-30 hidden md:block">
      <div className="frost rounded-xl px-4 py-2.5">
        <div className="flex items-center gap-5">
          {Object.entries(CATEGORY_CONFIG).map(([key, c]) => (
            <div key={key} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 8px ${c.color}50` }} />
              <span className="text-[9px] text-foreground/40 tracking-wide font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MountainMap() {
  const [activeEvent, setActiveEvent] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trailPath = buildTrailPath(TIMELINE_EVENTS)

  const handleClick = useCallback((id: string) => {
    setActiveEvent((prev) => (prev === id ? null : id))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveEvent(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const active = TIMELINE_EVENTS.find((e) => e.id === activeEvent)

  return (
    <section id="timeline" className="relative tribal-bg">
      <div className="relative z-10 pt-20 pb-8 md:pt-28 md:pb-12 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-10 h-[2px] bg-primary rounded-full glow-teal" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-primary font-semibold">1972 - Present</p>
        </div>
        <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.9] mb-4 font-light">
          Follow the trail
        </h2>
        <p className="text-sm text-muted-foreground max-w-md leading-relaxed font-light">
          Each marker tells the story of a community turning point. Click any point on the path.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full">
        <img
          src="/art/kaiwi-full-landscape.jpg"
          alt="Illustrated landscape of the Ka Iwi region from mountain summit to ocean shore"
          className="w-full h-auto block"
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[15]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={trailPath} fill="none" stroke="rgba(77, 184, 164, 0.18)" strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={trailPath} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="6 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {TIMELINE_EVENTS.map((event) => (
          <Waypoint key={event.id} event={event} isActive={activeEvent === event.id} onClick={() => handleClick(event.id)} />
        ))}
        <Legend />
        {active && <DetailPopup event={active} containerRef={containerRef} onClose={() => setActiveEvent(null)} />}
      </div>
    </section>
  )
}
