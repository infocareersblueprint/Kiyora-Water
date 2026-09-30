import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import Reveal from '../ui/Reveal'
import SectionLabel, { Divider } from '../ui/SectionLabel'

/* ---------- Thin line icons ---------- */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const StarIcon = () => (
  <Icon>
    <polygon points="12 3 14.8 8.8 21 9.7 16.5 14.1 17.6 20.3 12 17.3 6.4 20.3 7.5 14.1 3 9.7 9.2 8.8" />
  </Icon>
)

const ShieldIcon = () => (
  <Icon>
    <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
  </Icon>
)

const CheckIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l2.7 2.7L16 9.8" />
  </Icon>
)

const TagIcon = () => (
  <Icon>
    <path d="M3 12V4h8l10 10-8 8z" />
    <circle cx="7.5" cy="8.5" r="1" />
  </Icon>
)

const CalendarIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Icon>
)

const BriefcaseIcon = () => (
  <Icon>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18" />
  </Icon>
)

const REASONS = [
  {
    icon: <StarIcon />,
    title: 'Premium Presentation',
    text: 'Elegant packaging designed to complement fine dining, luxury hospitality and corporate settings.',
  },
  {
    icon: <ShieldIcon />,
    title: 'Hygienic Packaging',
    text: 'Sealed and packaged under strict hygienic conditions for consistent quality.',
  },
  {
    icon: <CheckIcon />,
    title: 'Quality Purification',
    text: 'Multi-stage purification including RO, UV and ozonation for reliable water quality.',
  },
  {
    icon: <TagIcon />,
    title: 'Custom Branding',
    text: 'Bespoke label and bottle branding for businesses, events and special occasions.',
  },
  {
    icon: <CalendarIcon />,
    title: 'Event-Ready',
    text: 'Suitable for weddings, conferences, corporate gatherings and large-scale catering.',
  },
  {
    icon: <BriefcaseIcon />,
    title: 'Professional Service',
    text: 'Reliable supply, timely delivery and dedicated support for business clients.',
  },
]

/* Thin lines between items only (no outer border):
   1 column on mobile, 2 on tablet, 3 on desktop */
const LINES = [
  '',
  'border-t sm:border-l sm:border-t-0',
  'border-t lg:border-l lg:border-t-0',
  'border-t sm:border-l lg:border-l-0',
  'border-t lg:border-l',
  'border-t sm:border-l',
]

export default function WhyUs() {
  const reduce = useReducedMotion()

  return (
    <section id="why-us" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Why KIYORA</SectionLabel>
          <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
            The Standard of Premium Water
          </h2>
          <div className="mt-6">
            <Divider />
          </div>
        </Reveal>

        {/* 3x2 grid, thin lines between items only */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal
              key={r.title}
              delay={(i % 3) * 0.12}
              className={`border-border ${LINES[i]}`}
            >
              <motion.div className="h-full px-2 py-10 sm:px-8" whileHover="hover">
                <motion.div
                  className="inline-flex text-primary"
                  variants={
                    reduce ? undefined : { hover: { rotate: 10, scale: 1.12 } }
                  }
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {r.icon}
                </motion.div>
                <h3 className="mt-5 font-serif text-xl font-medium tracking-wide text-primary">
                  {r.title}
                </h3>
                <p className="mt-3 text-[14px] font-light leading-relaxed text-foreground/65">
                  {r.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}