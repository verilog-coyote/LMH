export function SiteFooter() {
  return (
    <footer className="relative py-24 md:py-32 tribal-bg">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 md:px-16 text-center">
        <p className="font-serif text-5xl md:text-7xl text-foreground mb-4 font-light italic">
          M{"\u0101"}lama {"\u2018"}{"\u0100"}ina
        </p>
        <p className="text-sm text-muted-foreground tracking-wide mb-10 max-w-md mx-auto leading-relaxed font-light">
          Care for the land, and the land will care for you. Join us in preserving the Ka Iwi region for future generations.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a href="https://www.kaiwicoast.org" target="_blank" rel="noopener noreferrer" className="frost rounded-full px-7 py-3 text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-primary transition-all duration-300 font-medium hover:scale-[1.03]">
            kaiwicoast.org
          </a>
          <a href="https://www.facebook.com/KaIwiCoast/" target="_blank" rel="noopener noreferrer" className="frost rounded-full px-7 py-3 text-[10px] tracking-[0.15em] uppercase text-foreground/60 hover:text-primary transition-all duration-300 font-medium hover:scale-[1.03]">
            Facebook
          </a>
        </div>

        <div className="w-8 h-0.5 bg-primary/20 mx-auto mb-8 rounded-full" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-[9px] text-muted-foreground/50 tracking-[0.2em] uppercase">
          <span>Ka Iwi Coalition</span>
          <span className="hidden md:inline text-primary/20">{"\u2022"}</span>
          <span>Livable Hawai{"\u2018"}i Kai Hui</span>
          <span className="hidden md:inline text-primary/20">{"\u2022"}</span>
          <span>O{"\u2018"}ahu, Hawai{"\u2018"}i</span>
        </div>
      </div>
    </footer>
  )
}
