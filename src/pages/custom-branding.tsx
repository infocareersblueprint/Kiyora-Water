import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUtensils,
  faHotel,
  faHeart,
  faBriefcase,
  faMugHot,
  faStar,
} from '@fortawesome/free-solid-svg-icons'
import Reveal from '../components/ui/Reveal'
import SectionLabel, { Divider, WaveLine } from '../components/ui/SectionLabel'
import ArrowLink from '../components/ui/ArrowLink'
import BrandingForm from '../components/sections/BrandingForm'

const SETTINGS = [
  {
    icon: faUtensils,
    title: 'Restaurants & Cafes',
    text: 'Serve water that carries your brand identity on every table. Reinforce your premium positioning with every pour.',
  },
  {
    icon: faHotel,
    title: 'Hotels & Resorts',
    text: 'Delight guests with branded water in rooms, lobbies and dining areas. A small detail that speaks volumes about your hospitality.',
  },
  {
    icon: faHeart,
    title: 'Weddings & Celebrations',
    text: "Add a personal touch to your special day. Custom bottles with the couple's name, date and design make beautiful keepsakes.",
  },
  {
    icon: faBriefcase,
    title: 'Corporate Events',
    text: 'Branded water for conferences, product launches, seminars and board meetings. Reinforce your corporate identity at every touchpoint.',
  },
  {
    icon: faMugHot,
    title: 'Caterers & Banquets',
    text: 'Offer your clients a premium experience with branded water that complements your catering service.',
  },
  {
    icon: faStar,
    title: 'Parties & Special Occasions',
    text: 'Birthday parties, anniversaries, baby showers — custom KIYORA bottles add a premium, personal touch to any celebration.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Enquire',
    text: 'Fill in the enquiry form below or reach out via WhatsApp. Tell us about your event, quantity and design ideas.',
  },
  {
    n: '02',
    title: 'Design',
    text: 'Share your logo and branding guidelines. Our team will create a label design that matches your identity.',
  },
  {
    n: '03',
    title: 'Approve',
    text: "Review the design proof and request any changes. We finalise only when you're completely satisfied.",
  },
  // GUESSED: this step was too faint to read in your screenshot. Edit as needed.
  {
    n: '04',
    title: 'Deliver',
    text: 'Your custom-branded bottles are produced and delivered to your location.',
  },
]

const SIZES = [
  { size: '250 ml', text: 'Ideal for dining tables, meetings and individual servings.' },
  { size: '500 ml', text: 'Most popular for events, hospitality and everyday use.' },
  { size: '1 Litre', text: 'Suited for offices, catering and extended occasions.' },
]

export default function CustomBrandingPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-primary px-6 pb-20 pt-36 text-center text-white md:pb-24 md:pt-44">
        <Reveal className="mx-auto max-w-3xl">
          <SectionLabel light>Custom Branding</SectionLabel>
          <h1 className="mt-5 text-4xl font-light md:text-6xl">
            Your Brand. Your Bottle.
          </h1>
          <div className="mt-6">
            <Divider light />
          </div>
          <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-relaxed text-white/70">
            Make every sip a brand moment — with KIYORA&apos;s premium
            custom-labelled bottled water.
          </p>
          <div className="mt-8">
            <ArrowLink variant="orange" arrow href="#request">
              Request Custom Branding
            </ArrowLink>
          </div>
        </Reveal>
      </section>

      {/* Intro strip */}
      <section className="bg-tint px-6 py-16 text-center">
        <Reveal className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-light text-primary md:text-4xl">
            Elevate Your Brand with Premium Water
          </h2>
          <div className="mt-6">
            <Divider />
          </div>
          <p className="mt-6 text-[15px] font-light leading-relaxed text-foreground/75">
            KIYORA offers fully customized bottle branding for businesses, events
            and special occasions. Your logo, your design, your identity —
            delivered with the same premium quality our water is known for. From
            intimate restaurant tables to grand wedding celebrations, a KIYORA
            custom bottle makes a lasting impression.
          </p>
        </Reveal>
      </section>

      {/* Who it's for */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <SectionLabel>Who It&apos;s For</SectionLabel>
            <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
              Perfect For Every Setting
            </h2>
            <div className="mt-6">
              <Divider />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {SETTINGS.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.12} className="bg-tint/60">
                <div className="group h-full p-8">
                  <FontAwesomeIcon
                    icon={s.icon}
                    className="text-xl text-primary transition-transform duration-300 group-hover:scale-110"
                  />
                  <h3 className="mt-5 font-serif text-2xl font-normal text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-foreground/70">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-primary px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center">
            <SectionLabel light>How It Works</SectionLabel>
            <h2 className="mt-5 text-4xl font-light md:text-5xl">
              Simple. Seamless. Premium.
            </h2>
            <div className="mt-6">
              <Divider light />
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.15} className="bg-primary">
                <div className="h-full p-8">
                  <p className="font-serif text-3xl text-accent">{s.n}</p>
                  <h3 className="mt-4 text-[14px] font-medium tracking-wide">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-white/65">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Available sizes */}
      <section className="bg-tint px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <SectionLabel>Available Sizes</SectionLabel>
            <h2 className="mt-5 text-3xl font-light text-primary md:text-4xl">
              Custom Branding Across All Formats
            </h2>
            <div className="mt-6">
              <Divider />
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
            {SIZES.map((s, i) => (
              <Reveal key={s.size} delay={i * 0.15} className="bg-white">
                <div className="h-full px-6 py-8 text-center">
                  <p className="font-serif text-3xl font-light text-primary">
                    {s.size}
                  </p>
                  <span className="mx-auto mt-3 block h-px w-8 bg-accent" />
                  <p className="mt-4 text-[13px] font-light leading-relaxed text-foreground/65">
                    {s.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section id="request" className="scroll-mt-20 bg-white px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="mt-5 text-4xl font-light text-primary md:text-5xl">
              Request Custom Branding
            </h2>
      <WaveLine className="mt-6" />
          </Reveal>
          <Reveal className="mt-10" delay={0.15}>
            <BrandingForm />
          </Reveal>
        </div>
      </section>
    </>
  )
}