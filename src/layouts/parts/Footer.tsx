import { SITE } from '../../lib/config'

const NAVIGATE = [
  { label: 'Products', href: '/products' },
{ label: 'Custom Branding', href: '/custom-branding' },
{ label: 'About Us', href: '/about' },
 { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const cities = SITE.cities.map((c) => c.name).join(' & ')

  return (
    <footer className="bg-[#041830] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:px-10">
        <div>
          <img
            src="/images/logo.png"
            alt="KIYORA logo"
            className="h-16 w-16 object-contain"
          />
          <p className="mt-5 font-serif text-lg italic text-white/80">
            {SITE.tagline}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
            A brand of {SITE.parent}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Navigate
          </p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/80">
            {NAVIGATE.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-opacity hover:opacity-70">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Connect
          </p>
          <ul className="mt-5 space-y-3 text-[14px] text-white/80">
            <li>
              Instagram:{' '}
              <a
                href={SITE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70"
              >
                {SITE.instagramHandle}
              </a>
            </li>
            <li>WhatsApp: {SITE.whatsappDisplay}</li>
            <li>{cities}, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-[11px] text-white/40 md:flex-row md:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {SITE.brand}™. A brand of {SITE.parent}.
            All rights reserved.
          </p>
          <p className="uppercase tracking-[0.2em]">
            Inspired by {SITE.origin} · Sourced in {SITE.country}
          </p>
        </div>
      </div>
    </footer>
  )
}