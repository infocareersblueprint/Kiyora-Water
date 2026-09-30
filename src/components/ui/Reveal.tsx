import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Direction = 'up' | 'left' | 'right' | 'none'

type RevealProps = {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
  scale?: number
  className?: string
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 40,
  scale,
  className,
}: RevealProps) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const offset = {
    up: { y: distance },
    left: { x: -distance },
    right: { x: distance },
    none: {},
  }[direction]

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}