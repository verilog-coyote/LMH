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
    description: "The Ka Iwi Scenic Shoreline from Aw\u0101wamalu to Makapu\u2018u, now permanently classified as conservation land.",
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
  return (
    <section id="about" className="relative py-24 md:py-36 tribal-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-accent rounded-full glow-blue" />
              <p className="text-[10px] tracking-[0.5em] uppercase text-accent font-semibold">Our Story</p>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.9] font-light">
              Forty-five years of community aloha
            </h2>
          </div>
          <div className="flex items-end">
            <p className="text-sm text-muted-foreground leading-relaxed font-light">
              {"From Hanauma Bay to Makapu\u2018u, the Ka Iwi Coast is \"the crescendo of a continuous visual sequence\" from Hawai\u2018i Kai to Waim\u0101nalo. Since 1972, residents from all parts of O\u2018ahu have opposed urban development, protecting this sacred corridor from mauka to makai."}
            </p>
          </div>
        </div>

        {/* Full bleed image */}
        <div className="relative rounded-2xl overflow-hidden mb-20">
          <img src="/art/coast-aerial.jpg" alt="Aerial illustration of the Ka Iwi coastline" className="w-full h-auto block" loading="lazy" />
        </div>

        {/* Proverb */}
        <div className="text-center mb-20 relative">
          {/* Tribal divider lines */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 w-32 h-px opacity-20" style={{ backgroundImage: "url(/art/tribal-pattern.svg)", backgroundSize: "80px" }} />
          <p className="font-serif text-3xl md:text-5xl text-foreground italic font-light leading-snug">
            {"\"He ali\u2018i ka \u2018\u0101ina, he kauwa ke kanaka\""}
          </p>
          <p className="text-sm text-primary mt-4 font-light">The land is chief, man is its servant</p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="frost rounded-2xl p-7 md:p-9 group hover:scale-[1.008] transition-transform duration-500">
              <div className="w-3 h-3 rounded-full mb-4" style={{ backgroundColor: pillar.color, boxShadow: `0 0 16px ${pillar.color}50` }} />
              <p className="text-[9px] tracking-[0.3em] uppercase mb-2 font-semibold" style={{ color: pillar.color }}>{pillar.subtitle}</p>
              <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-3 font-light">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{pillar.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
