import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel, { Divider } from '../ui/SectionLabel'
import { SITE } from '../../lib/config'

export default function ServiceAreas() {
  const reduce = useReducedMotion()

  return (
    <section id="service-areas" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {/* Heading */}
        <Reveal className="text-center">
          <SectionLabel>Service Areas</SectionLabel>
          <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
            Where We Serve
          </h2>
          <div className="mt-6">
            <Divider />
          </div>
        </Reveal>

        {/* Cities separated by a thin vertical line */}
        <div className="mt-14 flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-0">
          {SITE.cities.map((city, i) => (
            <motion.div
              key={city.name}
              className={`px-4 text-center sm:px-16 ${
                i > 0 ? 'sm:border-l sm:border-border' : ''
              }`}
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.2, ease: 'easeOut' }}
            >
              <p className="font-serif text-4xl font-light tracking-[0.1em] text-primary md:text-5xl">
                {city.name}
              </p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-muted">
                {city.state}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}