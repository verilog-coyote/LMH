"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { NotionRenderer as ReactNotionRenderer } from "react-notion-x"
import type { ExtendedRecordMap } from "notion-types"

const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  { ssr: false }
)

function Collection() {
  return null
}

interface TimelineNotionRendererProps {
  recordMap: ExtendedRecordMap
  className?: string
}

export function TimelineNotionRenderer({
  recordMap,
  className,
}: TimelineNotionRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName !== "IMG") return
      const notionBlock = target.closest(".notion-image, .notion-asset-wrapper")
      if (!notionBlock) return
      e.preventDefault()
      e.stopPropagation()
      setLightboxSrc((target as HTMLImageElement).src)
    }

    container.addEventListener("click", handleClick, true)
    return () => container.removeEventListener("click", handleClick, true)
  }, [recordMap])

  return (
    <div ref={containerRef} className={className}>
      <ReactNotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        previewImages
        showTableOfContents={false}
        className="notion-timeline-page"
        components={{ Code, Collection }}
      />

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm cursor-zoom-out"
          onClick={closeLightbox}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-[90vw] max-h-[85vh] rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  )
}
