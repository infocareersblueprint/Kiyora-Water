import { SITE } from '../../lib/config'

export default function Footer() {
  return (
    <footer className="bg-[#041830] text-white">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-10 md:py-8">
        <div>
          <img
            src="/images/logo-header.png"
            alt="KIYORA logo"
            className="-my-6 h-24 w-auto max-w-full object-contain brightness-0 invert md:-my-8 md:h-28"
          />
          <p className="mt-3 font-serif text-lg italic text-white/80">
            {SITE.tagline}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/40">
            A brand of {SITE.parent}
          </p>
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