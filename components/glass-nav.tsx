"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={scrolled ? { opacity: 1, y: 0 } : { opacity: 0, y: -20, pointerEvents: "none" as const }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <nav
        className="frost-heavy mx-3 mt-2 sm:mx-4 sm:mt-3 md:mx-8 md:mt-4 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 md:px-8 flex items-center justify-between max-w-5xl lg:mx-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#home" className="font-serif text-base sm:text-lg text-foreground/80 tracking-wide hover:text-primary transition-colors font-light italic">
          Kaiwi Coast
        </a>

        <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="px-3 lg:px-4 py-2 text-xs text-foreground/65 hover:text-primary transition-colors tracking-[0.15em] lg:tracking-[0.2em] uppercase rounded-lg hover:bg-primary/[0.06] font-medium"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              {link.label}
            </motion.a>
          ))}
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="ml-2 p-2.5 rounded-xl frost-light transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-foreground/50" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-foreground/50" />
              )}
            </motion.button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl frost-light transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              whileTap={{ scale: 0.9 }}
            >
              {theme === "dark" ? <Sun className="h-4 w-4 text-foreground/50" /> : <Moon className="h-4 w-4 text-foreground/50" />}
            </motion.button>
          )}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl frost-light transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="h-4 w-4 text-foreground" /> : <Menu className="h-4 w-4 text-foreground" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden frost-heavy mx-3 sm:mx-4 mt-2 rounded-2xl px-4 sm:px-5 py-3"
            role="menu"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-xs text-foreground/65 hover:text-primary transition-colors py-3 tracking-[0.15em] uppercase"
                role="menuitem"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
