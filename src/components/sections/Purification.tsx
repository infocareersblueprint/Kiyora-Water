import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import Reveal from '../ui/Reveal'
import SectionLabel, { Divider } from '../ui/SectionLabel'

/* ---------- Thin line icons (1px stroke) ---------- */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const ROIcon = () => (
  <Icon>
    <rect x="3" y="3.5" width="18" height="4.5" rx="1" />
    <rect x="3" y="9.75" width="18" height="4.5" rx="1" />
    <rect x="3" y="16" width="18" height="4.5" rx="1" />
    <path d="M7 5.75h10M7 12h10M7 18.25h10" />
  </Icon>
)

const UVIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" />
  </Icon>
)

const OzoneIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5.5" />
    <circle cx="12" cy="12" r="1.5" />
  </Icon>
)

const MineralIcon = () => (
  <Icon>
    <path d="M6.5 3h11L22 9l-10 12L2 9z" />
    <path d="M2 9h20M9 9l3-6 3 6-3 12z" />
  </Icon>
)

const STAGES = [
  {
    icon: <ROIcon />,
    title: 'RO Purification',
    text: 'Reverse osmosis filtration removes dissolved impurities, ensuring clean and clear water.',
  },
  {
    icon: <UVIcon />,
    title: 'UV Treatment',
    text: 'Ultraviolet treatment provides an additional layer of purification for consistent quality.',
  },
  {
    icon: <OzoneIcon />,
    title: 'Ozonation',
    text: 'Ozone treatment ensures freshness and maintains the integrity of every bottle.',
  },
  {
    icon: <MineralIcon />,
    title: 'Added Minerals',
    text: 'Essential minerals — Calcium | Magnesium | Potassium | Sodium — are carefully added for balanced water.',
  },
]

export default function Purification() {
  const reduce = useReducedMotion()

  return (
    <section id="purification" className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel light>Our Water</SectionLabel>
          <h2 className="mt-5 text-4xl font-light md:text-5xl">
            Quality at Every Stage
          </h2>
          <div className="mt-6">
            <Divider light />
          </div>
          {/* PLACEHOLDER: edit this line to match your real process */}
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
            KIYORA water undergoes a multi-stage purification process to ensure
            consistent freshness and clarity in every bottle.
          </p>
        </Reveal>

        {/* 4 columns */}
        <div className="mt-16 grid gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stage, i) => (
            <Reveal
              key={stage.title}
              delay={i * 0.15}
              className={`px-6 text-center lg:px-8 ${
                i > 0 ? 'lg:border-l lg:border-white/15' : ''
              }`}
            >
              <motion.div
                className="mx-auto flex h-12 w-12 items-center justify-center text-white/80"
                initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
              >
                {stage.icon}
              </motion.div>
              <h3 className="mt-5 font-serif text-xl font-normal tracking-wide">
                {stage.title}
              </h3>
              <p className="mt-3 text-[13px] font-light leading-relaxed text-white/60">
                {stage.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}