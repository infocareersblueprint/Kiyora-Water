import { motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../ui/Reveal'
import SectionLabel from '../ui/SectionLabel'

const OCCASIONS = [
  'Restaurants',
  'Hotels',
  'Cafes',
  'Caterers',
  'Weddings',
  'Corporate Events',
  'Parties',
  'Conferences',
  'Special Occasions',
]

export default function CustomBranding({
  onRequest,
}: {
  onRequest: () => void
}) {
  const reduce = useReducedMotion()

  return (
    <section
      id="custom-branding"
      className="overflow-hidden bg-primary py-20 text-white md:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Left: slides in from the LEFT */}
        <div>
          <Reveal direction="left" distance={60} duration={0.9}>
            <SectionLabel light>Custom Branding</SectionLabel>
            <h2 className="mt-5 text-5xl font-light leading-tight md:text-6xl">
              Your Brand.
              <br />
              Your Bottle.
            </h2>
          </Reveal>

          <Reveal direction="left" distance={60} duration={0.9} delay={0.15}>
            <p className="mt-8 max-w-md text-[15px] font-light leading-relaxed text-white/70">
              Make every sip a brand moment. KIYORA offers fully customised
              bottle branding — your logo, your design, your identity —
              delivered with the same premium quality our water is known for.
            </p>
          </Reveal>

          {/* Orange button: gentle single pulse when it appears */}
          <motion.div
            className="mt-10 inline-block"
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: [0.95, 1.06, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
          >
            <button
              type="button"
              onClick={onRequest}
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-accent/90"
            >
              Request Custom Branding
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>

        {/* Right: 2-column list, items slide in from the RIGHT one by one */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-6">
          {OCCASIONS.map((item, i) => (
            <li key={item}>
              <Reveal direction="right" distance={50} delay={i * 0.1}>
                <div className="border-l-2 border-accent py-1 pl-4 text-[14px] tracking-wide text-white/90">
                  {item}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}