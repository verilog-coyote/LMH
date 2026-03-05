"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { TattooBand } from "./tattoo-overlays"

const PILLARS = [
  {
    title: "\u2018\u0100ina",
    subtitle: "The Land",
    description: "The 182-acre mauka lands capture rain, feed streams, and sustain the watershed from ridge to reef. The land is chief.",
    color: "hsl(170, 55%, 44%)",
  },
  {
    title: "K\u016Bpuna",
    subtitle: "The Elders",
    description: "Since 1972, community elders have led the fight to rezone, reclassify, and protect every acre from resort and urban development.",
    color: "hsl(195, 65%, 50%)",
  },
  {
    title: "Kai",
    subtitle: "The Ocean",
    description: "The Kaiwi Scenic Shoreline from Aw\u0101wamalu to Makapu\u2018u, now permanently classified as conservation land.",
    color: "hsl(185, 55%, 48%)",
  },
  {
    title: "K\u0101kou",
    subtitle: "Together",
    description: "40,000 signatures, decades of advocacy, and $600,000 raised in three months. This is what a community can do.",
    color: "hsl(160, 55%, 40%)",
  },
] as const

export function AboutSection() {
  const headerRef = useRef(null)
  const proverbRef = useRef(null)
  const pillarsRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" })
  const proverbInView = useInView(proverbRef, { once: true, margin: "-80px" })
  const pillarsInView = useInView(pillarsRef, { once: true, margin: "-80px" })

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-36 tribal-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20" ref={headerRef}>
          <div>
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="w-10 h-[2px] bg-accent rounded-full glow-blue" />
              <p className="text-sm tracking-[0.5em] uppercase text-accent font-semibold">Our Story</p>
            </motion.div>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl md:text-7xl text-foreground leading-[0.9] font-light"
              initial={{ opacity: 0, y: 40 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Forty-five years of community aloha
            </motion.h2>
          </div>
          <motion.div
            className="flex items-end"
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-base text-muted-foreground leading-relaxed font-light">
              {"From Hanauma Bay to Makapu\u2018u, the Kaiwi Coast is \"the crescendo of a continuous visual sequence\" from Hawai\u2018i Kai to Waim\u0101nalo. Since 1972, residents from all parts of O\u2018ahu have opposed urban development, protecting this sacred corridor from mauka to makai."}
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative rounded-2xl overflow-hidden mb-20"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={headerInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <img src="/art/coast-aerial.jpg" alt="Aerial illustration of the Kaiwi coastline" className="w-full h-auto block" loading="lazy" />
        </motion.div>

        {/* Proverb */}
        <div className="text-center mb-20 relative py-12 overflow-hidden" ref={proverbRef}>
          <TattooBand className="top-0" />
          <TattooBand className="bottom-0 [&>div]:rotate-180" />
          <div className="relative z-[2]">
            <motion.p
              className="font-serif text-3xl sm:text-4xl md:text-6xl text-foreground italic font-light leading-snug"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={proverbInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              {"\"He ali\u2018i ka \u2018\u0101ina, he kauwa ke kanaka\""}
            </motion.p>
            <motion.p
              className="text-base text-primary mt-4 font-light"
              initial={{ opacity: 0 }}
              animate={proverbInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              The land is chief, man is its servant
            </motion.p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" ref={pillarsRef}>
          {PILLARS.map((pillar, i) => (
            <motion.article
              key={pillar.title}
              className="frost rounded-2xl p-5 sm:p-7 md:p-9 group"
              initial={{ opacity: 0, y: 50 }}
              animate={pillarsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="w-3 h-3 rounded-full mb-4"
                style={{ backgroundColor: pillar.color, boxShadow: `0 0 16px ${pillar.color}50` }}
                animate={{ scale: [1, 1.3, 1], boxShadow: [`0 0 16px ${pillar.color}50`, `0 0 28px ${pillar.color}70`, `0 0 16px ${pillar.color}50`] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              />
              <p className="text-xs tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color: pillar.color }}>{pillar.subtitle}</p>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 font-light">{pillar.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed font-light">{pillar.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
