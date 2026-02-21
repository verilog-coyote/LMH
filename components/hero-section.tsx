"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] overflow-hidden">
      <img
        src="/art/hero.jpg"
        alt="Illustrated panoramic view of the Ka Iwi Coast from mountain ridgeline to ocean"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-0 left-0 right-0 h-[35%] bg-gradient-to-b from-[hsl(195,40%,5%)]/80 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-[hsl(195,40%,5%)]/80 to-transparent pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-16 md:px-16 lg:px-24">
        <div className="max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-[hsl(170,55%,44%)] rounded-full glow-teal" />
            <p className="text-[10px] tracking-[0.6em] uppercase text-[hsl(170,55%,60%)] font-semibold">
              Mauka to Makai
            </p>
          </div>

          <h1 className="font-serif text-7xl md:text-[7rem] lg:text-[9rem] text-white leading-[0.85] tracking-tight text-shadow-lg font-light">
            Ka Iwi
          </h1>
          <p className="font-serif text-3xl md:text-5xl text-[hsl(170,55%,60%)] italic font-light mt-2 glow-teal text-shadow">
            Coast
          </p>

          <p className="text-sm text-white/50 max-w-md leading-relaxed mt-6 font-light">
            Forty-five years of community aloha protecting the last
            undeveloped coastline on O{"\u2018"}ahu.
          </p>

          <a
            href="#timeline"
            className="inline-flex items-center gap-3 mt-8 frost rounded-full px-7 py-3.5 text-[11px] tracking-[0.15em] uppercase text-white/80 hover:text-white transition-all duration-300 group hover:scale-[1.02]"
          >
            Explore the trail
            <ChevronDown className="h-3.5 w-3.5 text-[hsl(170,55%,44%)] group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-[hsl(170,55%,44%)] opacity-60" />
      </div>
    </section>
  )
}
