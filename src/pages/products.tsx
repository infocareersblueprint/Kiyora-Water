import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPhone } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../components/ui/Reveal'
import SectionLabel, { Divider, WaveLine } from '../components/ui/SectionLabel'
import { useEnquiry } from '../lib/enquiry-context'
import ArrowLink from '../components/ui/ArrowLink'
import { SITE } from '../lib/config'

const PRODUCTS = [
  {
    badge: '250 ML',
    size: '250 ml',
    label: 'The Dining Essential',
    text: 'The KIYORA 250 ml bottle is the perfect companion for office tables, individual servings, corporate meetings, and hospitality settings. Its compact and elegant design makes it ideal for occasions where presentation, convenience, and purity matter.',
    uses: ['Events & Celebrations', 'Corporate Meetings', 'Offices & Workplaces'],
  },
  {
    badge: '500 ML',
    size: '500 ml',
    label: 'The Everyday Premium',
    text: 'The KIYORA 500 ml bottle is our most versatile format — suited for everyday hydration, cafes, catering and hospitality. A balanced size that delivers premium quality for both individual and bulk requirements.',
    uses: ['Fine dining restaurants', 'Cafes and lounges', 'Catering and banquets'],
  },
  {
    badge: '1 LITRE',
    size: '1 Litre',
    label: 'The Generous Pour',
    text: 'The KIYORA 1 Litre bottle is designed for Hotels-Lodge, Restaurants, extended gatherings, and households that demand premium water without compromise. Ideal for bulk orders and long-format events.',
    uses: ['Homes and households', 'Hotels and hospitality', 'Cafes and lounges'],
  },
]

const INSIDE = [
  'RO Purification',
  'UV Treatment',
  'Ozonation',
  'Added Minerals',
  'Hygienic Packaging',
  'Quality Controlled',
]

export default function ProductsPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <>
      {/* Page header */}
      <section className="bg-primary px-6 pb-20 pt-36 text-center text-white md:pb-24 md:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <SectionLabel light>Our Products</SectionLabel>
          <h1 className="mt-5 text-4xl font-light md:text-6xl">
            Crafted for Every Occasion
          </h1>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mt-6 text-[15px] font-light text-white/70">
            Three elegant formats, one uncompromising standard of quality.
          </p>
        </Reveal>
      </section>

      {/* Intro strip */}
      <section className="bg-tint px-6 py-14 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <p className="text-[15px] font-light leading-relaxed text-foreground/75">
            Every KIYORA bottle is a statement of quality — purified through RO,
            UV treatment and ozonation, enriched with essential minerals, and
            packaged with care. Whether for a dining table, a corporate event or
            a grand celebration, KIYORA is designed to make an impression.
          </p>
        </Reveal>
      </section>

      {/* Product rows */}
      <section className="overflow-hidden bg-white">
        {PRODUCTS.map((p, i) => {
          const flip = i % 2 === 1
          return (
            <div
              key={p.size}
              className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:px-10 lg:grid-cols-2 lg:gap-24 lg:py-24"
            >
              {/* Image */}
              <Reveal
                direction={flip ? 'right' : 'left'}
                distance={60}
                duration={0.9}
                className={flip ? 'lg:order-2' : ''}
              >
                <div className="relative isolate mx-auto max-w-md">
                  <div className="group overflow-hidden bg-white">
                    <img
                      src="/images/bottle.png"
                      alt={`KIYORA ${p.size} packaged drinking water bottle`}
                      loading="lazy"
                      className="h-[26rem] w-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 md:h-[30rem]"
                    />
                  </div>
                  <span className="absolute left-0 top-0 bg-primary px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                    {p.badge}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-5 -right-5 -z-10 h-24 w-24 border border-accent"
                  />
                </div>
              </Reveal>

              {/* Text */}
              <Reveal
                direction={flip ? 'left' : 'right'}
                distance={60}
                duration={0.9}
                delay={0.15}
                className={flip ? 'lg:order-1' : ''}
              >
                <SectionLabel>{p.label}</SectionLabel>
                <h2 className="mt-4 text-4xl font-light text-primary md:text-5xl">
                  {p.size}
                </h2>
                <WaveLine className="mt-6" />
                <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/75">
                  {p.text}
                </p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {p.uses.map((u) => (
                    <li
                      key={u}
                      className="flex items-center gap-2 text-[13px] text-foreground/70"
                    >
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-xs text-accent"
                      />
                      {u}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ArrowLink
                    variant="navy"
                    arrow
                    onClick={() => openEnquiry(p.size)}
                  >
                    Enquire about {p.size}
                  </ArrowLink>
                </div>
              </Reveal>
            </div>
          )
        })}
      </section>

      {/* What's inside */}
      <section className="bg-primary px-6 py-20 text-white">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-light md:text-4xl">
            What&apos;s Inside Every Bottle
          </h2>
          <div className="mt-6">
            <Divider light />
          </div>
        </Reveal>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
          {INSIDE.map((item, i) => (
            <Reveal key={item} delay={i * 0.1}>
              <span className="block border border-white/30 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-white/85">
                {item}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Custom branding CTA */}
      <section className="bg-tint px-6 py-20 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-light text-primary md:text-4xl">
            Want Your Logo on the Bottle?
          </h2>
          <div className="mt-6">
            <Divider />
          </div>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/70">
            KIYORA offers custom label branding for all bottle sizes. Perfect for
            restaurants, hotels, weddings, corporate events and special
            occasions.
          </p>
          <div className="mt-8">
            <ArrowLink
              variant="orange"
              arrow
              onClick={() => openEnquiry('Custom Branding')}
            >
              Request Custom Branding
            </ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* Ready to order */}
      <section className="bg-white px-6 py-20 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-light text-primary md:text-4xl">
            Ready to Order?
          </h2>
          <p className="mt-5 text-[15px] font-light text-foreground/70">
            Contact us for bulk pricing, minimum order quantities and custom
            branding options.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ArrowLink
              variant="outline"
              icon={faPhone}
              href={`tel:+${SITE.whatsappNumber}`}
            >
              Call Us
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}