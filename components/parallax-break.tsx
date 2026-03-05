"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface ImageBreakProps {
  src: string
  alt: string
  height?: string
  quote?: string
  attribution?: string
}

export function ImageBreak({ src, alt, height = "60vh", quote, attribution }: ImageBreakProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div className="relative w-full overflow-hidden max-md:!h-[50vh]" style={{ height }} ref={ref}>
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      {quote && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8 text-center">
          <motion.div
            className="frost rounded-xl sm:rounded-2xl px-5 py-5 sm:px-8 sm:py-6 md:px-12 md:py-8 max-w-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <blockquote className="font-serif text-xl sm:text-2xl md:text-4xl text-foreground leading-snug italic font-light">
              {quote}
            </blockquote>
            {attribution && (
              <motion.cite
                className="mt-3 block text-sm tracking-[0.4em] uppercase text-primary not-italic font-semibold"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {attribution}
              </motion.cite>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
