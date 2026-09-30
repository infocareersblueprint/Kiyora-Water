import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import ArrowLink from '../ui/ArrowLink'

const WORD = 'KIYORA'.split('')

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  // Light parallax: background drifts down slower than the page scrolls
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '2%'])

  // Fade-up helper for the staggered entrance
  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: 'easeOut' as const },
        }

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary text-white"
    >
      {/* Background image with parallax + slow zoom-out */}
      <motion.div
        aria-hidden="true"
className="absolute inset-x-0 -top-[2%] h-[104%]"
        style={reduce ? undefined : { y: bgY }}
      >
   <motion.img
  src="/images/hero.webp"
  alt=""
  className="h-full w-full object-cover"
  initial={reduce ? false : { scale: 1.03 }}
  animate={{ scale: 1 }}
  transition={{ duration: 2.5, ease: 'easeOut' }}
/>
      </motion.div>

      {/* Navy overlay */}
 <div aria-hidden="true" className="absolute inset-0 bg-primary/75" />

      {/* Large faint kanji on the right */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-jp text-[28rem] font-light leading-none text-white/[0.05] lg:block"
      >
        水
      </span>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-32 pt-32 text-center">
        <motion.p
          {...fadeUp(0.2)}
          className="text-[11px] uppercase tracking-[0.3em] text-[#a9bddb] md:text-xs"
        >
          Inspired by Japan, Sourced in India
        </motion.p>

        <motion.p
          {...fadeUp(0.4)}
          aria-hidden="true"
          className="mt-8 font-jp text-2xl font-light tracking-[1.6em] text-white/30 md:text-3xl"
          style={{ marginRight: '-1.6em' }}
        >
          清水
        </motion.p>

        {/* Wordmark: letters reveal one by one */}
        <h1
          aria-label="KIYORA"
          className="mt-4 flex justify-center font-serif font-light leading-none text-white"
          style={{ fontSize: 'clamp(3.5rem, 12vw, 9rem)' }}
        >
          {WORD.map((letter, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block"
              style={{ marginRight: '0.3em' }}
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Short divider + katakana */}
        <motion.div {...fadeUp(1.5)} className="mt-8 flex flex-col items-center">
          <span aria-hidden="true" className="block h-px w-16 bg-white/40" />
          <span
            aria-hidden="true"
            className="mt-3 font-jp text-xs tracking-[0.6em] text-white/40"
            style={{ marginRight: '-0.6em' }}
          >
            キヨラ
          </span>
        </motion.div>

        {/* Thin wavy line */}
        <motion.svg
          {...fadeUp(1.7)}
          aria-hidden="true"
          viewBox="0 0 256 8"
          className="mt-8 h-2 w-64 text-white/30"
          fill="none"
        >
          <path
            d="M0 4 C 21 1, 43 7, 64 4 S 107 1, 128 4 S 171 7, 192 4 S 235 1, 256 4"
            stroke="currentColor"
            strokeWidth="1"
          />
        </motion.svg>

        <motion.p
          {...fadeUp(1.9)}
          className="mt-10 max-w-xl text-[15px] font-light leading-relaxed text-white/80 md:text-lg"
        >
          Premium packaged drinking water for homes, businesses, restaurants,
          hotels, cafes, events and celebrations.
        </motion.p>

        <motion.div
          {...fadeUp(2.1)}
          className="mt-12 flex flex-col gap-3 sm:flex-row"
        >
          <ArrowLink variant="white" arrow href="/products">
            Explore KIYORA
          </ArrowLink>
          <ArrowLink variant="outlineLight" href="/custom-branding">
            Custom Branding
          </ArrowLink>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        {...fadeUp(2.4)}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
          Scroll
        </span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/20">
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