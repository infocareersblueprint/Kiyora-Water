import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import ArrowLink from '../ui/ArrowLink'

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Light parallax: background drifts down slower than the page scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  // CHANGED: 15% -> 8% (less drift, so the image can be shorter)
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  // Fade-up helper for the staggered entrance
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: 'easeOut' as const },
        }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary text-white"
    >
      {/* Background image with light parallax */}
      {/* CHANGED: h-[120%] -> h-[110%] (less zoom/crop = sharper) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -top-[10%] h-[110%]"
        style={reduce ? undefined : { y: bgY }}
      >
        <img
          src="/images/hero.webp"
          alt=""
          className="h-full w-full object-cover"
          decoding="async"
        />
      </motion.div>

      {/* Navy overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-primary/65" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-28 text-center">
        <motion.h1 {...fadeUp(0.2)} className="m-0">
          {/* CHANGED: width 680px -> 520px. brightness-0 invert turns the dark
              logo white. Remove the filter if your logo is already white. */}
          <img
            src="/images/logo-transparent.png"
            alt="KIYORA - Inspired by Japan, sourced in India"
            className="-mb-5 block h-auto w-[min(90vw,520px)] brightness-0 invert sm:-mb-10"
          />
        </motion.h1>

        <motion.p
          {...fadeUp(0.7)}
          className="mt-5 max-w-xl text-[15px] font-light leading-relaxed text-white/75 md:text-base"
        >
          Premium packaged drinking water for homes, businesses, restaurants,
          hotels, cafes, events and celebrations.
        </motion.p>

        <motion.div
          {...fadeUp(1)}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <ArrowLink variant="white" arrow href="#products">
            Explore KIYORA
          </ArrowLink>
          <ArrowLink variant="outlineLight" href="#custom-branding">
            Custom Branding
          </ArrowLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(1.4)}
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
          Scroll
        </span>
        <span className="relative block h-8 w-px overflow-hidden bg-white/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-full bg-white/80"
            animate={reduce ? undefined : { y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}