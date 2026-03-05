"use client"

import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <img
        src="/art/hero.jpg"
        alt="Illustrated panoramic view of the Kaiwi Coast from mountain ridgeline to ocean"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-background to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12 md:pb-16 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="w-10 md:w-12 h-[2px] bg-[hsl(170,55%,44%)] rounded-full glow-teal" />
            <p className="text-xs tracking-[0.5em] md:tracking-[0.6em] uppercase text-[hsl(170,55%,60%)] font-semibold">
              Mauka to Makai
            </p>
          </motion.div>

          <motion.h1
            className="font-serif text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] text-white leading-[0.85] tracking-tight text-shadow-lg font-light"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Kaiwi
          </motion.h1>

          <motion.p
            className="font-serif text-2xl sm:text-3xl md:text-6xl text-[hsl(170,55%,60%)] italic font-light mt-2 glow-teal text-shadow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8, ease: "easeOut" }}
          >
            Coast
          </motion.p>

          <motion.p
            className="text-sm md:text-base text-white/50 max-w-md leading-relaxed mt-4 md:mt-6 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            Forty-five years of community aloha protecting the last
            undeveloped coastline on O{"\u2018"}ahu.
          </motion.p>

          <motion.a
            href="#timeline"
            className="inline-flex items-center gap-3 mt-8 frost rounded-full px-7 py-3.5 text-[13px] tracking-[0.15em] uppercase text-foreground/90 hover:text-foreground transition-all duration-300 group hover:scale-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore the trail
            <ChevronDown className="h-3.5 w-3.5 text-[hsl(170,55%,44%)] group-hover:translate-y-0.5 transition-transform" />
          </motion.a>
        </div>
      </div>

      {/* Desktop scroll indicator with Framer Motion bounce */}
      <motion.div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="w-[3px] h-20 bg-gradient-to-b from-transparent to-[hsl(170,55%,44%)] rounded-full"
          animate={{ opacity: [0.5, 1, 0.5], scaleY: [0.9, 1, 0.9] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-[hsl(170,55%,44%)]"
          animate={{ y: [0, 6, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  )
}
