"use client"

import { motion } from "framer-motion"

export function TattooCorner() {
  return (
    <div className="tattoo-corner" aria-hidden="true">
      <motion.div
        className="absolute top-[-20px] right-[-20px]"
        style={{
          width: "min(450px, 40vw)",
          height: "min(450px, 40vw)",
          backgroundImage: "url(/art/hawaiian-tattoo-corner.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "contain",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0.55, 0.75, 0.55],
          x: [0, 6, -4, 0],
          y: [0, -5, 3, 0],
          rotate: [0, 0.8, -0.5, 0],
          filter: [
            "drop-shadow(0 0 20px rgba(50, 173, 220, 0.4)) drop-shadow(0 0 50px rgba(50, 173, 220, 0.15))",
            "drop-shadow(0 0 35px rgba(50, 190, 240, 0.7)) drop-shadow(0 0 70px rgba(50, 190, 240, 0.3))",
            "drop-shadow(0 0 20px rgba(50, 173, 220, 0.4)) drop-shadow(0 0 50px rgba(50, 173, 220, 0.15))",
          ],
        }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 22, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          filter: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
          default: { duration: 1.2 },
        }}
      />
    </div>
  )
}

export function TattooBand({ className = "" }: { className?: string }) {
  return (
    <div className={`tattoo-band ${className}`} aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/art/hawaiian-tattoo-band.svg)",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
          backgroundSize: "min(800px, 100vw) auto",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.5, 0.7, 0.5],
          x: [0, 15, -5, 0],
          filter: [
            "drop-shadow(0 0 18px rgba(50, 173, 220, 0.35)) drop-shadow(0 0 40px rgba(50, 173, 220, 0.12))",
            "drop-shadow(0 0 30px rgba(50, 190, 240, 0.6)) drop-shadow(0 0 65px rgba(50, 190, 240, 0.25))",
            "drop-shadow(0 0 18px rgba(50, 173, 220, 0.35)) drop-shadow(0 0 40px rgba(50, 173, 220, 0.12))",
          ],
        }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
          x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          filter: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
          default: { duration: 1 },
        }}
      />
    </div>
  )
}

export function TattooMotif() {
  return (
    <div className="tattoo-motif" aria-hidden="true">
      <motion.div
        className="absolute"
        style={{
          width: "min(600px, 80vw)",
          height: "min(360px, 48vw)",
          left: "50%",
          top: "50%",
          backgroundImage: "url(/art/hawaiian-tattoo-motif.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
        initial={{ opacity: 0, x: "-50%", y: "-50%" }}
        animate={{
          opacity: [0.55, 0.75, 0.55],
          x: "-50%",
          y: "-50%",
          rotate: [0, 0.5, -0.4, 0],
          scale: [1, 1.02, 0.98, 1],
          filter: [
            "drop-shadow(0 0 20px rgba(50, 173, 220, 0.4)) drop-shadow(0 0 50px rgba(50, 173, 220, 0.15))",
            "drop-shadow(0 0 35px rgba(50, 190, 240, 0.65)) drop-shadow(0 0 70px rgba(50, 190, 240, 0.28))",
            "drop-shadow(0 0 20px rgba(50, 173, 220, 0.4)) drop-shadow(0 0 50px rgba(50, 173, 220, 0.15))",
          ],
        }}
        transition={{
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
          rotate: { duration: 24, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 20, repeat: Infinity, ease: "easeInOut" },
          filter: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2.6 },
          default: { duration: 1.2 },
        }}
      />
    </div>
  )
}
