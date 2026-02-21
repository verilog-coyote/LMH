import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

type FrostVariant = "standard" | "heavy" | "light"

interface GlassCardProps {
  children: ReactNode
  className?: string
  variant?: FrostVariant
  as?: "div" | "article" | "section"
}

const VARIANT_CLASS: Record<FrostVariant, string> = {
  standard: "frost",
  heavy: "frost-heavy",
  light: "frost-light",
}

export function GlassCard({
  children,
  className,
  variant = "standard",
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag className={cn(VARIANT_CLASS[variant], "rounded-2xl", className)}>
      {children}
    </Tag>
  )
}
