import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'
import ArrowLink from '../ui/ArrowLink'
import { SITE, whatsappLink } from '../../lib/config'

export default function Partner({
  onContact,
}: {
  onContact: () => void
}) {
  const cities = SITE.cities.map((c) => c.name).join(' & ')

  return (
    <section id="partner" className="overflow-hidden bg-tint py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Left: heading from the LEFT */}
        <Reveal direction="left" distance={60} duration={0.9}>
          <SectionLabel>Bulk &amp; Business Orders</SectionLabel>
          <h2 className="mt-5 text-4xl font-light text-primary md:text-6xl">
            Partner With KIYORA
          </h2>
        </Reveal>

        {/* Right: paragraph and buttons from the RIGHT */}
        <Reveal direction="right" distance={60} duration={0.9} delay={0.15}>
          <p className="text-[15px] font-light leading-relaxed text-foreground/75">
            Looking for branded bottled water for your restaurant, hotel, event
            or business? KIYORA works with restaurants, hotels, cafes, caterers,
            distributors and corporate clients to provide premium water
            solutions — with or without custom branding.
          </p>
          <p className="mt-5 font-serif text-base italic text-muted">
            Serving {cities} and surrounding regions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ArrowLink variant="navy" arrow onClick={onContact}>
              Contact Sales
            </ArrowLink>
            <ArrowLink
              variant="outline"
              icon={faWhatsapp}
              href={whatsappLink()}
              external
            >
              WhatsApp
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}