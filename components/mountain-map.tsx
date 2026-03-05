"use client"

import { useState, useCallback, useEffect, useRef, useMemo } from "react"
import { TIMELINE_EVENTS as FALLBACK_EVENTS, TRAIL_ANCHORS, CATEGORY_CONFIG, type TimelineEvent } from "@/lib/timeline-data"
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { TattooCorner } from "./tattoo-overlays"
import { buildSplinePath, distributeEvenly } from "@/lib/trail-utils"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { TimelineNotionRenderer } from "@/components/notion/timeline-notion-renderer"
import { TimelineTOC } from "@/components/notion/timeline-toc"
import { useContentTOC } from "@/lib/hooks/use-content-toc"
import type { ExtendedRecordMap } from "notion-types"
import type { PageContentMap } from "@/lib/notion/notion-service"

function TimelineModal({
  events,
  activeIdx,
  onClose,
  onNavigate,
  pageContent,
}: {
  events: TimelineEvent[]
  activeIdx: number
  onClose: () => void
  onNavigate: (idx: number) => void
  pageContent: PageContentMap
}) {
  const event = events[activeIdx]
  if (!event) return null
  const config = CATEGORY_CONFIG[event.category]
  const hasPrev = activeIdx > 0
  const hasNext = activeIdx < events.length - 1
  const contentScrollRef = useRef<HTMLDivElement>(null)

  const recordMap: ExtendedRecordMap | undefined = pageContent[event.id]
  const { nestedSections, sectionIds, showTOC } = useContentTOC(recordMap)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(activeIdx - 1)
      if (e.key === "ArrowRight" && hasNext) onNavigate(activeIdx + 1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeIdx, hasPrev, hasNext, onNavigate])

  useEffect(() => {
    if (contentScrollRef.current) {
      contentScrollRef.current.scrollTop = 0
    }
  }, [activeIdx])

  const hasContent = !!recordMap && Object.keys(recordMap.block || {}).length > 1

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] p-0 gap-0 border-0 bg-transparent shadow-none [&>button]:hidden ${hasContent ? "max-w-5xl" : "max-w-3xl"}`}>
        <DialogTitle className="sr-only">{event.year}: {event.title}</DialogTitle>

        <div className="frost-heavy rounded-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
          <div className="h-2 relative overflow-hidden shrink-0" style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}80)` }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url(/art/tribal-pattern.svg)", backgroundSize: "80px" }} />
          </div>

          <div className="flex flex-1 min-h-0">
            <div ref={contentScrollRef} className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse-glow" style={{ backgroundColor: config.color }} />
                <span className="text-xs text-foreground/55 tracking-[0.25em] uppercase font-semibold">{config.label}</span>
              </div>

              <div className="mb-8">
                <p className="font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-none mb-4" style={{ color: config.color }}>
                  {event.year}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight font-medium">
                  {event.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-foreground/65 leading-relaxed mb-6 max-w-2xl">
                {event.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-primary/60 mb-6">
                <MapPin className="h-3.5 w-3.5" />
                <span className="tracking-wider font-medium">{event.location}</span>
              </div>

              {hasContent && (
                <div className="border-t border-foreground/8 pt-6">
                  <TimelineNotionRenderer recordMap={recordMap} />
                </div>
              )}

              <div className="flex items-center justify-between mt-8 pt-5 border-t border-foreground/8">
                <button
                  onClick={() => hasPrev && onNavigate(activeIdx - 1)}
                  disabled={!hasPrev}
                  className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">{hasPrev ? events[activeIdx - 1].year : ""}</span>
                </button>

                <span className="text-xs text-foreground/30 tracking-wider">
                  {activeIdx + 1} / {events.length}
                </span>

                <button
                  onClick={() => hasNext && onNavigate(activeIdx + 1)}
                  disabled={!hasNext}
                  className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="hidden sm:inline">{hasNext ? events[activeIdx + 1].year : ""}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {showTOC && hasContent && (
              <div className="hidden lg:block w-56 shrink-0 border-l border-foreground/8 p-5 overflow-y-auto">
                <TimelineTOC
                  sections={nestedSections}
                  sectionIds={sectionIds}
                  containerRef={contentScrollRef}
                />
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="!absolute top-5 right-4 sm:top-7 sm:right-6 md:top-8 md:right-8 !z-20 p-2 sm:p-2.5 rounded-xl frost-light transition-all hover:scale-105"
            aria-label="Close"
          >
            <X className="h-4 w-4 text-foreground/50" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Waypoint({ event, position, isActive, onClick }: { event: TimelineEvent; position: { x: number; y: number }; isActive: boolean; onClick: () => void }) {
  const config = CATEGORY_CONFIG[event.category]
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick() }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center md:min-w-0 md:min-h-0"
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
      aria-label={`${event.year}: ${event.title}`}
      aria-pressed={isActive}
    >
      <span
        className={`absolute rounded-full transition-all duration-500 ${isActive ? "-inset-6 opacity-100" : "-inset-3 opacity-0 group-hover:opacity-70"}`}
        style={{ background: `radial-gradient(circle, ${config.color}30, transparent 70%)` }}
      />
      <span
        className={`relative block rounded-full border-2 transition-all duration-300 ${isActive ? "w-5 h-5 border-transparent" : "w-3.5 h-3.5 md:w-3.5 md:h-3.5 border-white/30 group-hover:w-4 group-hover:h-4 group-hover:border-transparent"}`}
        style={{
          backgroundColor: isActive ? config.color : "rgba(255,255,255,0.85)",
          boxShadow: isActive ? `0 0 24px ${config.color}, 0 0 8px ${config.color}80` : "0 0 10px rgba(0,0,0,0.5)",
        }}
      />
      <span className="absolute left-1/2 -translate-x-1/2 -top-9 md:-top-8 whitespace-nowrap text-xs font-bold tracking-[0.2em] text-white text-shadow-sm opacity-100 px-2 py-0.5 rounded-md frost-light">
        {event.year}
      </span>
    </button>
  )
}

function MobileTimeline({ events, onSelect }: { events: TimelineEvent[]; onSelect: (idx: number) => void }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div className="md:hidden px-4 pb-12" ref={ref}>
      <div className="relative">
        <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40 rounded-full" />

        <div className="space-y-4">
          {events.map((event, i) => {
            const config = CATEGORY_CONFIG[event.category]

            return (
              <motion.div
                key={event.id}
                className="relative pl-12"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <div className="absolute left-[12px] top-5 z-10">
                  <motion.div
                    className="w-[14px] h-[14px] rounded-full border-2 border-background"
                    style={{
                      backgroundColor: config.color,
                      boxShadow: `0 0 12px ${config.color}60, 0 0 4px ${config.color}40`,
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                </div>

                <button
                  onClick={() => onSelect(i)}
                  className="w-full text-left frost rounded-xl p-4 transition-all duration-300 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span
                      className="text-xs font-bold tracking-[0.15em] px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${config.color}18`, color: config.color }}
                    >
                      {event.year}
                    </span>
                    <span className="text-[10px] text-foreground/50 tracking-[0.15em] uppercase font-semibold">
                      {config.label}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-foreground leading-tight font-medium">
                    {event.title}
                  </h3>

                  <p className="text-sm text-foreground/50 leading-relaxed mt-2 line-clamp-2">
                    {event.description}
                  </p>
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        {Object.entries(CATEGORY_CONFIG).map(([key, c]) => (
          <div key={key} className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 6px ${c.color}40` }} />
            <span className="text-[10px] text-foreground/50 tracking-wider font-medium">{c.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
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
              <span className="text-xs text-foreground/55 tracking-wide font-medium">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function MountainMap({ events: propEvents, pageContent = {} }: { events?: TimelineEvent[]; pageContent?: PageContentMap }) {
  const events = propEvents && propEvents.length > 0 ? propEvents : FALLBACK_EVENTS
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trailPath = useMemo(() => buildSplinePath(TRAIL_ANCHORS), [])
  const positions = useMemo(() => distributeEvenly(TRAIL_ANCHORS, events.length), [events.length])
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleClick = useCallback((idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx))
  }, [])

  const handleNavigate = useCallback((idx: number) => {
    setActiveIdx(idx)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveIdx(null) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <section id="timeline" className="relative tribal-bg overflow-hidden" ref={sectionRef}>
      <TattooCorner />
      <div className="relative z-10 pt-20 pb-8 md:pt-28 md:pb-12 px-6 md:px-16 lg:px-24 max-w-5xl mx-auto">
        <div className="relative z-[2]">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-[2px] bg-primary rounded-full glow-teal" />
            <p className="text-sm tracking-[0.5em] uppercase text-primary font-semibold">1972 - Present</p>
          </motion.div>
          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9] mb-4 font-light"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Follow the trail
          </motion.h2>
          <motion.p
            className="text-base text-muted-foreground max-w-md leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Each marker tells the story of a community turning point. Click any point on the path.
          </motion.p>
        </div>
      </div>

      <div ref={containerRef} className="relative w-full hidden md:block">
        <img
          src="/art/kaiwi-full-landscape.jpg"
          alt="Illustrated landscape of the Kaiwi region from mountain summit to ocean shore"
          className="w-full h-auto block"
        />

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-[15]" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d={trailPath} fill="none" stroke="rgba(77, 184, 164, 0.18)" strokeWidth="10" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={trailPath} fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeDasharray="6 12" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>

        {events.map((event, i) => (
          <Waypoint key={event.id} event={event} position={positions[i]} isActive={activeIdx === i} onClick={() => handleClick(i)} />
        ))}
        <Legend />
      </div>

      <MobileTimeline events={events} onSelect={handleClick} />

      {activeIdx !== null && activeIdx >= 0 && activeIdx < events.length && (
        <TimelineModal
          events={events}
          activeIdx={activeIdx}
          onClose={() => setActiveIdx(null)}
          onNavigate={handleNavigate}
          pageContent={pageContent}
        />
      )}
    </section>
  )
}
