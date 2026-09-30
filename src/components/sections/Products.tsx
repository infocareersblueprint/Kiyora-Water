import { motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../ui/Reveal'
import SectionLabel, { Divider } from '../ui/SectionLabel'

type Direction = 'left' | 'up' | 'right'

const PRODUCTS: {
  badge: string
  size: string
  use: string
  direction: Direction
}[] = [
  {
    badge: '250 ML',
    size: '250 ml',
    use: 'Perfect for dining tables, meetings and individual servings.',
    direction: 'left',
  },
  {
    badge: '500 ML',
    size: '500 ml',
    use: 'Ideal for events, hospitality and everyday use.',
    direction: 'up',
  },
  {
    badge: '1 LITRE',
    size: '1 Litre',
    use: 'Suited for offices, catering and extended occasions.',
    direction: 'right',
  },
]

export default function Products({
  onEnquire,
}: {
  onEnquire: (size: string) => void
}) {
  const reduce = useReducedMotion()

  return (
    <section
      id="products"
      className="overflow-hidden bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Our Products</SectionLabel>
          <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
            Designed for Every Occasion
          </h2>
          <div className="mt-6">
            <Divider />
          </div>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/70">
            From intimate dining tables to grand events, KIYORA is available in
            three elegant formats.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <Reveal
              key={p.size}
              direction={p.direction}
              distance={p.direction === 'up' ? 60 : 50}
              delay={i * 0.15}
            >
              <motion.article
                whileHover={reduce ? undefined : { y: -8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative border border-border bg-white"
              >
                {/* Size badge */}
                <span className="absolute left-0 top-0 z-10 bg-primary px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
                  {p.badge}
                </span>

                             {/* Bottle on white */}
                <div className="overflow-hidden bg-white">
                  <img
                    src="/images/bottle.png"
                    alt={`KIYORA ${p.size} packaged drinking water bottle`}
                    loading="lazy"
                    className="h-96 w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text */}
                <div className="p-6">
                  <h3 className="text-3xl font-light text-primary">{p.size}</h3>
                  <p className="mt-3 min-h-[3rem] text-[13px] font-light leading-relaxed text-foreground/70">
                    {p.use}
                  </p>
                  <button
                    type="button"
                    onClick={() => onEnquire(p.size)}
                    className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-primary"
                  >
                    Enquire
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}