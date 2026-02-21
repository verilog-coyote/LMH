"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"

const NAV_LINKS = [
  { label: "Timeline", href: "#timeline" },
  { label: "About", href: "#about" },
  { label: "Organizations", href: "#organizations" },
] as const

export function GlassNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
    >
      <nav
        className="frost-heavy mx-4 mt-3 md:mx-8 md:mt-4 rounded-2xl px-5 py-3 md:px-8 flex items-center justify-between max-w-5xl lg:mx-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#home" className="font-serif text-lg text-foreground/80 tracking-wide hover:text-primary transition-colors font-light italic">
          Ka Iwi Coast
        </a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-[10px] text-foreground/50 hover:text-primary transition-colors tracking-[0.2em] uppercase rounded-lg hover:bg-primary/[0.06] font-medium"
            >
              {link.label}
            </a>
          ))}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 p-2.5 rounded-xl frost-light transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-foreground/50" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-foreground/50" />
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl frost-light transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-foreground/50" /> : <Moon className="h-4 w-4 text-foreground/50" />}
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl frost-light transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="md:hidden frost-heavy mx-4 mt-2 rounded-2xl px-5 py-3" role="menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="block text-xs text-foreground/50 hover:text-primary transition-colors py-3 tracking-[0.15em] uppercase" role="menuitem">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
