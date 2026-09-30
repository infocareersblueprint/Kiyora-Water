import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../ui/Reveal'
import SectionLabel , { WaveLine } from '../ui/SectionLabel'

export default function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="bg-white py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
        {/* Text: slides in from the LEFT */}
        <Reveal direction="left" distance={60} duration={0.9}>
          <SectionLabel>About KIYORA</SectionLabel>

                  <h2 className="mt-5 text-4xl font-light leading-tight text-primary md:text-5xl">
            Purity Elevated to an Art Form
          </h2>
       <WaveLine className="mt-6 ml-10" />

          <div className="mt-8 space-y-5 text-[15px] font-light leading-relaxed text-foreground/75">
            <p>
              KIYORA is a premium packaged drinking water brand inspired by the
              Japanese philosophy of purity, simplicity and refined living. Every
              bottle is a reflection of our commitment to quality — from the
              water inside to the presentation outside.
            </p>
            <p>
              Crafted for discerning homes, restaurants, hotels, cafes and
              corporate environments, KIYORA brings together rigorous quality
              standards and elegant packaging to deliver an experience that goes
              beyond hydration.
            </p>
            <p>
              We believe that what you drink should be as carefully considered
              as what you eat. That is the KIYORA promise.
            </p>
          </div>
        </Reveal>

        {/* Image: slides in from the RIGHT with a slight scale */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Reveal direction="right" distance={60} scale={0.95} duration={0.9}>
            <img
              src="/images/about.png"
              alt="KIYORA bottles with ice and citrus slices at sunset"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </Reveal>

          {/* Outlined square behind the bottom-right corner, appears after the image */}
          <motion.span
            aria-hidden="true"
            className="absolute -bottom-5 -right-5 -z-10 h-28 w-28 border border-accent md:h-36 md:w-36"
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
          />
        </div>
      </div>
    </section>
  )
}