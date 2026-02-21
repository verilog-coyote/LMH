interface ImageBreakProps {
  src: string
  alt: string
  height?: string
  quote?: string
  attribution?: string
}

export function ImageBreak({ src, alt, height = "60vh", quote, attribution }: ImageBreakProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />

      {quote && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center">
          <div className="frost rounded-2xl px-8 py-6 md:px-12 md:py-8 max-w-2xl">
            <blockquote className="font-serif text-xl md:text-3xl text-foreground leading-snug italic font-light">
              {quote}
            </blockquote>
            {attribution && (
              <cite className="mt-3 block text-[9px] tracking-[0.4em] uppercase text-primary not-italic font-semibold">
                {attribution}
              </cite>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
