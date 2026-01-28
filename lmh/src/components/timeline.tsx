"use client"

import { useEffect, useRef, useState } from "react"
import timelineData from "@/data/timeline.json"

type TimelineEntry = {
  year: string
  content: string
}

export default function Timeline() {
  const pathRef = useRef<SVGPathElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [markers, setMarkers] = useState<Array<{ x: number; y: number; index: number }>>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const svgLength = path.getTotalLength()
    const numSegments = timelineData.timeline.length
    const segmentLength = svgLength / numSegments

    const newMarkers: Array<{ x: number; y: number; index: number }> = []

    for (let i = 0; i < numSegments; i++) {
      const distance = i * segmentLength
      const point = path.getPointAtLength(distance)
      newMarkers.push({
        x: point.x,
        y: point.y,
        index: i,
      })
    }

    setMarkers(newMarkers)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpenIndex(null)
      }
    }

    if (openIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openIndex])

  const timeline: TimelineEntry[] = timelineData.timeline

  return (
    <div ref={containerRef} className="w-full h-[80vh] bg-[#e3ecec] p-5 relative">
      <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0">
        <path
          ref={pathRef}
          d="M -55.091427714147 32.93482667420345 C 144.80113790883007 97.3739627535241, -63.952133266506024 143.62058439792494, 38.26398948256795 214.25147018169218 C 162.46181137734635 22.644965168521622, 274.9332664498524 358.1171925569978, 225.70283492497651 78.7704555568541"
          fill="none"
          stroke="black"
          strokeWidth="4"
        />
        {markers.map((marker) => (
          <circle
            key={marker.index}
            cx={marker.x}
            cy={marker.y}
            r={openIndex === marker.index ? "7" : "5"}
            fill="black"
            className="cursor-pointer transition-all"
            onClick={() => setOpenIndex(openIndex === marker.index ? null : marker.index)}
          />
        ))}
        {openIndex !== null && markers[openIndex] && (
          <foreignObject
            x={markers[openIndex].x + 15}
            y={markers[openIndex].y - 60}
            width="320"
            height="200"
            className="pointer-events-none"
          >
            <div className="w-80 rounded-md border bg-popover p-4 text-popover-foreground shadow-md">
              <h2 className="text-lg font-bold text-[#3451bc] mb-2">{timeline[openIndex].year}</h2>
              <p className="text-sm">{timeline[openIndex].content}</p>
            </div>
          </foreignObject>
        )}
      </svg>
    </div>
  )
}
