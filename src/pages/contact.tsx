import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPhone,
  faEnvelope,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons'
import Reveal from '../components/ui/Reveal'
import SectionLabel, { Divider, WaveLine } from '../components/ui/SectionLabel'
import ArrowLink from '../components/ui/ArrowLink'
import ContactForm from '../components/sections/ContactForm'
import { SITE, whatsappLink } from '../lib/config'

const AREAS = [
  { name: 'Hyderabad', sub: 'Telangana' },
  { name: 'Kurnool', sub: 'Andhra Pradesh' },
  { name: 'Telangana', sub: 'State-wide' },
  { name: 'Andhra Pradesh', sub: 'State-wide' },
]

export default function ContactPage() {
  const cards: {
    icon: typeof faPhone
    label: string
    lines: string[]
    href?: string
  }[] = [
    {
      icon: faPhone,
      label: 'Customer Care',
      lines: [SITE.phone],
      href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    },
    {
      icon: faEnvelope,
      label: 'Email',
      lines: [SITE.email],
      href: `mailto:${SITE.email}`,
    },
    {
      icon: faInstagram,
      label: 'Instagram',
      lines: [SITE.instagramHandle],
      href: SITE.instagramUrl,
    },
    {
      icon: faLocationDot,
      label: 'Address',
      lines: [SITE.address],
    },
  ]

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-primary px-6 pb-24 pt-36 text-center text-white md:pb-32 md:pt-44">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-jp text-[22rem] font-light leading-none text-white/[0.04] md:text-[30rem]"
        >
          話
        </span>
        <Reveal className="relative mx-auto max-w-3xl">
          <SectionLabel light>Get in Touch</SectionLabel>
          <h1 className="mt-5 text-4xl font-light md:text-6xl">
            We&apos;d Love to Hear From You
          </h1>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
            Whether you&apos;re looking to place a bulk order, explore custom
            branding or simply learn more about KIYORA — we&apos;re here.
          </p>
        </Reveal>
      </section>

      {/* Details + form */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* Left: contact details */}
          <div>
            <Reveal>
              <SectionLabel>Contact Details</SectionLabel>
              <h2 className="mt-4 text-4xl font-light text-primary">
                Reach Us Directly
              </h2>
              <WaveLine className="mt-6" />
            </Reveal>

            <div className="mt-10 space-y-4">
              {cards.map((c, i) => {
                const body = (
                  <div className="flex items-start gap-5 border border-border p-6 transition-colors duration-300 hover:border-primary/40">
                    <FontAwesomeIcon
                      icon={c.icon}
                      className="mt-1 text-lg text-primary"
                    />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-muted">
                        {c.label}
                      </p>
                      {c.lines.map((line, j) => (
                        <p
                          key={line}
                          className={
                            j === 0
                              ? 'mt-1 text-[15px] text-foreground'
                              : 'mt-1 text-[13px] font-light text-foreground/60'
                          }
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )
                return (
                  <Reveal key={c.label} delay={i * 0.1}>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="block"
                      >
                        {body}
                      </a>
                    ) : (
                      body
                    )}
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.5} className="mt-6">
              <ArrowLink
                variant="whatsapp"
                icon={faWhatsapp}
                href={whatsappLink()}
                external
                className="w-full"
              >
                Chat on WhatsApp
              </ArrowLink>
            </Reveal>
          </div>

          {/* Right: form */}
          <div>
            <Reveal direction="right" distance={50}>
              <SectionLabel>Send an Enquiry</SectionLabel>
              <h2 className="mt-4 text-4xl font-light text-primary">
                How Can We Help?
              </h2>
              <WaveLine className="mt-6" />
              <p className="mt-8 text-[15px] font-light text-foreground/70">
                Fill in the form and send it to us on WhatsApp. Our team will
                reply to you there.
              </p>
            </Reveal>
            <Reveal className="mt-8" delay={0.15}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Where we deliver */}
      <section className="bg-primary px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <SectionLabel light>Service Areas</SectionLabel>
            <h2 className="mt-5 text-4xl font-light md:text-5xl">
              Where We Deliver
            </h2>
            <div className="mt-6">
              <Divider light />
            </div>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4">
            {AREAS.map((a, i) => (
              <Reveal
                key={a.name}
                delay={i * 0.15}
                className={`border-white/15 ${i % 2 === 1 ? 'border-l' : ''} ${
                  i > 0 ? 'lg:border-l' : ''
                } ${i > 1 ? 'mt-10 lg:mt-0' : ''}`}
              >
                <div className="px-4 py-6 text-center">
                  <p className="font-serif text-2xl">{a.name}</p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                    {a.sub}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}