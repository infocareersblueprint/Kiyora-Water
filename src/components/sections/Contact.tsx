import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Reveal from '../ui/Reveal'
import SectionLabel, { Divider } from '../ui/SectionLabel'
import ArrowLink from '../ui/ArrowLink'
import { SITE, whatsappLink } from '../../lib/config'

/* ---------- Thin line icons ---------- */
function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
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

const PhoneIcon = () => (
  <Icon>
    <path d="M5 4h3l2 5-2.5 1.5a11 11 0 006 6L15 14l5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </Icon>
)

const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </Icon>
)

const InstagramIcon = () => (
  <Icon>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" />
  </Icon>
)

const PinIcon = () => (
  <Icon>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </Icon>
)

const ITEMS: {
  icon: ReactNode
  label: string
  value: string
  href?: string
  external?: boolean
}[] = [
  {
    icon: <PhoneIcon />,
    label: 'Customer Care',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
  },
  {
    icon: <MailIcon />,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    icon: <InstagramIcon />,
    label: 'Instagram',
    value: SITE.instagramHandle,
    href: SITE.instagramUrl,
    external: true, // opens the Instagram page in a new tab
  },
  { icon: <PinIcon />, label: 'Address', value: SITE.address },
]

/* Thin lines between items only (no outer border) */
const LINES = [
  '',
  'border-t sm:border-l sm:border-t-0',
  'border-t',
  'border-t sm:border-l',
]

export default function Contact() {
  const reduce = useReducedMotion()

  return (
    <section id="contact" className="bg-primary py-20 text-white md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <SectionLabel light>Get in Touch</SectionLabel>
          <h2 className="mt-5 text-4xl font-light md:text-5xl">Let&apos;s Talk</h2>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
            Whether you&apos;re placing a bulk order, exploring custom branding
            or simply want to know more about KIYORA, we&apos;d love to hear
            from you.
          </p>
          <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/50">
            {SITE.parent}
          </p>
          <img
            src="/images/logo-header.png"
            alt={SITE.brand}
            className="mx-auto -mb-4 -mt-3 h-24 w-auto scale-[1.8] object-contain brightness-0 invert md:scale-[2]"
          />
        </Reveal>

        {/* 4 items, thin lines between them only */}
        <div className="mt-12 grid text-left sm:grid-cols-2">
          {ITEMS.map((item, i) => {
            const content = (
              <div className="flex items-start gap-4 px-2 py-6 sm:px-6">
                <span className="mt-0.5 text-[#8fa3bf]">{item.icon}</span>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#7f95b3]">
                    {item.label}
                  </p>
                  <p className="mt-1 text-[14px] font-light text-white/90">
                    {item.value}
                  </p>
                </div>
              </div>
            )

            return (
              <Reveal
                key={item.label}
                delay={i * 0.1}
                className={`border-white/15 ${LINES[i]}`}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="block transition-colors hover:bg-white/5"
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            )
          })}
        </div>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="relative">
            {!reduce && (
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-whatsapp"
                animate={{ scale: [1, 1.25], opacity: [0.5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            <ArrowLink
              variant="whatsapp"
              icon={faWhatsapp}
              href={whatsappLink()}
              external
              className="relative"
            >
              Chat on WhatsApp
            </ArrowLink>
          </div>
          <ArrowLink
            variant="outlineLight"
            icon={faPhone}
            href={`tel:+${SITE.whatsappNumber}`}
          >
            Call Us
          </ArrowLink>
        </div>
      </div>
    </section>
  )
}