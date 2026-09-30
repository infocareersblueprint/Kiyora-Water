import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function SectionLabel({
  children,
  light = false,
  className = '',
}: {
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <p
      className={`text-[11px] font-normal uppercase tracking-[0.3em] ${
        light ? 'text-white/60' : 'text-muted'
      } ${className}`}
    >
      {children}
    </p>
  )
}

export function WaveLine({
  light = false,
  center = false,
  className = '',
}: {
  light?: boolean
  center?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 256 8"
      preserveAspectRatio="none"
      className={`block h-2 w-64 max-w-full ${
        center ? 'mx-auto origin-center' : 'origin-left'
      } ${light ? 'text-white/30' : 'text-foreground/20'} ${className}`}
      fill="none"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
    >
      <path
        d="M0 4 C 21 1.5, 43 6.5, 64 4 S 107 1.5, 128 4 S 171 6.5, 192 4 S 235 1.5, 256 4"
        stroke="currentColor"
        strokeWidth="1"
      />
    </motion.svg>
  )
}

export function Divider({ light = false }: { light?: boolean }) {
  return <WaveLine light={light} center />
}