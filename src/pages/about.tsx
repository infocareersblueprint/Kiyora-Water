import { motion, useReducedMotion } from 'framer-motion'
import Reveal from '../components/ui/Reveal'
import SectionLabel, { Divider, WaveLine } from '../components/ui/SectionLabel'
import ArrowLink from '../components/ui/ArrowLink'

const PHILOSOPHY = [
  { kanji: '清', reading: 'Sei', meaning: 'Purity' },
  { kanji: '質', reading: 'Shitsu', meaning: 'Quality' },
  { kanji: '誠', reading: 'Makoto', meaning: 'Integrity' },
  { kanji: '美', reading: 'Bi', meaning: 'Elegance' },
]

// NOTE: these process descriptions come from your design. Confirm they match
// your real process before publishing.
const PROCESS = [
  {
    n: '01',
    title: 'Reverse Osmosis',
    text: 'Advanced RO filtration removes dissolved solids, heavy metals and contaminants at the molecular level, leaving only pure water.',
  },
  {
    n: '02',
    title: 'UV Treatment',
    text: 'Ultraviolet light eliminates bacteria, viruses and microorganisms without the use of chemicals, preserving the natural character of the water.',
  },
  {
    n: '03',
    title: 'Ozonation',
    text: 'Ozone treatment provides a final layer of purification and extends shelf life naturally, without altering taste or quality.',
  },
  {
    n: '04',
    title: 'Mineral Enrichment',
    text: 'Essential minerals are carefully reintroduced to achieve the ideal balance — water that is pure, yet naturally nourishing.',
  },
]

const VALUES = [
  {
    title: 'Trust',
    text: 'Every product we create is a promise kept — to our customers, our partners and our community.',
  },
  {
    title: 'Excellence',
    text: 'We hold ourselves to the highest standards in production, packaging and service.',
  },
  {
    title: 'Integrity',
    text: 'Honest business practices, transparent operations and genuine care for the people we serve.',
  },
]

function BigKanji({ char, className = '' }: { char: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute select-none font-jp font-light leading-none text-white/[0.04] ${className}`}
    >
      {char}
    </span>
  )
}

export default function AboutPage() {
  const reduce = useReducedMotion()

  return (
    <>
      {/* Page header */}
      <section className="relative overflow-hidden bg-primary px-6 pb-20 pt-36 text-center text-white md:pb-28 md:pt-44">
        <BigKanji
          char="清"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[22rem] md:text-[30rem]"
        />
        <Reveal className="relative mx-auto max-w-3xl">
          <SectionLabel light>Our Story</SectionLabel>
          <h1 className="mt-5 text-4xl font-light md:text-6xl">
            Where Purity Meets Purpose
          </h1>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
            A Japanese-inspired vision, rooted in India — crafted for those who
            believe quality begins with what they drink.
          </p>
        </Reveal>
      </section>

      {/* Story */}
      <section className="overflow-hidden bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-24">
          <div className="relative isolate mx-auto w-full max-w-md lg:max-w-none">
            <Reveal direction="left" distance={60} duration={0.9}>
              <div className="relative">
                <img
                  src="/images/about.png"
                  alt="KIYORA bottles with ice and citrus slices at sunset"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center bg-primary font-jp text-xl text-white">
                  清
                </span>
              </div>
            </Reveal>
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-5 -right-5 -z-10 h-28 w-28 border border-accent md:h-36 md:w-36"
              initial={reduce ? false : { opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            />
          </div>

          <Reveal direction="right" distance={60} duration={0.9} delay={0.1}>
            <SectionLabel>The KIYORA Story</SectionLabel>
            <h2 className="mt-5 text-4xl font-light leading-tight text-primary md:text-5xl">
              Born from a Belief in Better
            </h2>
          <WaveLine className="mt-6" />
            <div className="mt-8 space-y-5 text-[15px] font-light leading-relaxed text-foreground/75">
              <p>
                KIYORA was born from a simple but powerful belief — that the
                water you drink should be as pure, refined and intentional as
                everything else you choose in life. In a market flooded with
                ordinary, we set out to create something extraordinary.
              </p>
              <p>
                Inspired by the Japanese philosophy of Kiyora — meaning pure,
                clean and unspoiled — we built a brand that carries that spirit
                into every bottle we produce. From the design of our packaging
                to the rigour of our purification process, every detail is
                deliberate.
              </p>
              <p>
                KIYORA is proudly produced and distributed by SHAHI GROUP OF
                INDUSTRIES, a name built on trust, quality and a commitment to
                excellence across everything we do.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative overflow-hidden bg-primary px-6 py-20 text-white md:py-28">
        <BigKanji
          char="清"
          className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[24rem] md:text-[34rem]"
        />
        <div className="relative mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel light>Our Philosophy</SectionLabel>
            <h2 className="mt-5 text-4xl font-light md:text-5xl">
              The Japanese Art of Purity
            </h2>
            <div className="mt-6">
              <Divider light />
            </div>
            <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
              In Japanese culture, purity is not merely the absence of
              impurities — it is a state of harmony, balance and intention. The
              concept of 清 (Sei) represents clarity of mind and clarity of
              purpose. This philosophy guides every decision we make at KIYORA,
              from sourcing to purification to packaging.
            </p>
          </Reveal>

          {/* 4 columns, thin vertical lines only */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4">
            {PHILOSOPHY.map((p, i) => (
              <Reveal
                key={p.kanji}
                delay={i * 0.15}
                className={`border-white/15 ${i % 2 === 1 ? 'border-l' : ''} ${
                  i > 0 ? 'lg:border-l' : ''
                }`}
              >
                <div className="px-6 py-10 text-center">
                  <p className="font-jp text-5xl font-light text-accent">
                    {p.kanji}
                  </p>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
                    {p.reading}
                  </p>
                  <p className="mt-2 font-serif text-xl">{p.meaning}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-tint px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>Our Process</SectionLabel>
            <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
              Uncompromising Quality at Every Step
            </h2>
            <div className="mt-6">
              <Divider />
            </div>
            <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/70">
              Every drop of KIYORA water passes through a rigorous multi-stage
              purification process before it reaches you. We believe that
              premium water is not just about what is removed — it is about what
              is preserved.
            </p>
          </Reveal>

          {/* 2x2 grid separated by a thin cross, no outer box */}
          <div className="mt-16 grid md:grid-cols-2">
            {PROCESS.map((s, i) => {
              const lines = [
                '',
                'border-t md:border-l md:border-t-0',
                'border-t',
                'border-t md:border-l',
              ][i]
              return (
                <Reveal
                  key={s.n}
                  delay={(i % 2) * 0.15}
                  className={`border-border ${lines}`}
                >
                  <div className="flex h-full gap-5 px-2 py-10 md:px-10">
                    <p className="font-serif text-3xl text-accent">{s.n}</p>
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-primary">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[13px] font-light leading-relaxed text-foreground/70">
                        {s.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>The Company Behind KIYORA</SectionLabel>
            <h2 className="mt-5 text-4xl font-light uppercase tracking-[0.06em] text-primary md:text-6xl">
              Shahi Group of Industries
            </h2>
            <div className="mt-6">
              <Divider />
            </div>
            {/* PLACEHOLDER: confirm the "decades" claim is accurate for your group */}
            <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/70">
              KIYORA is a brand of SHAHI GROUP OF INDUSTRIES — a company built
              on decades of trust, operational excellence and a relentless
              pursuit of quality. Our group brings the same standards of
              integrity and craftsmanship to KIYORA that define everything we do.
            </p>
          </Reveal>

          {/* 3 columns, thin vertical lines only */}
          <div className="mt-16 grid md:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.15}
                className={`border-border ${
                  i > 0 ? 'border-t md:border-l md:border-t-0' : ''
                }`}
              >
                <div className="h-full px-2 py-10 md:px-10">
                  <span className="block h-px w-8 bg-accent" />
                  <h3 className="mt-5 font-serif text-2xl font-normal text-primary">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-foreground/70">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-primary px-6 py-20 text-center text-white md:py-24">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-light md:text-5xl">Experience KIYORA</h2>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-white/70">
            Discover our range of premium packaged drinking water or enquire
            about custom branding for your business or event.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ArrowLink variant="orange" arrow href="/products">
              Explore Products
            </ArrowLink>
            <ArrowLink variant="outlineLight" href="/custom-branding">
              Custom Branding
            </ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  )
}