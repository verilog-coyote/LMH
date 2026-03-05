"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TattooMotif } from "./tattoo-overlays"

export function SiteFooter() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <footer className="relative py-16 sm:py-24 md:py-32 tribal-bg" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <TattooMotif />

      <div className="relative z-[2] max-w-6xl mx-auto px-4 sm:px-6 md:px-16 text-center">
        <motion.p
          className="font-serif text-4xl sm:text-6xl md:text-8xl text-foreground mb-4 font-light italic"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          M{"\u0101"}lama {"\u2018"}{"\u0100"}ina
        </motion.p>

        <motion.p
          className="text-base text-muted-foreground tracking-wide mb-10 max-w-md mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Care for the land, and the land will care for you. Join us in preserving the Kaiwi region for future generations.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.a
            href="https://www.kaiwicoast.org"
            target="_blank"
            rel="noopener noreferrer"
            className="frost rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-primary transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            kaiwicoast.org
          </motion.a>
          <motion.a
            href="https://www.facebook.com/KaIwiCoast/"
            target="_blank"
            rel="noopener noreferrer"
            className="frost rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-xs tracking-[0.15em] uppercase text-foreground/70 hover:text-primary transition-all duration-300 font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Facebook
          </motion.a>
        </motion.div>

        <motion.div
          className="w-8 h-0.5 bg-primary/20 mx-auto mb-8 rounded-full"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-xs text-muted-foreground/70 tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span>Kaiwi Coalition</span>
          <span className="hidden md:inline text-primary/20">{"\u2022"}</span>
          <span>Livable Maunalua Hui</span>
          <span className="hidden md:inline text-primary/20">{"\u2022"}</span>
          <span>O{"\u2018"}ahu, Hawai{"\u2018"}i</span>
        </motion.div>
      </div>
    </footer>
  )
}
