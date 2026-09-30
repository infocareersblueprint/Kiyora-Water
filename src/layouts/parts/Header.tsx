import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faComment, faXmark } from '@fortawesome/free-solid-svg-icons'
import { whatsappLink } from '../../lib/config'

const NAV = [
  { label: 'Products', to: '/products' },
  { label: 'Custom Branding', to: '/custom-branding' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock page scroll and allow Esc to close while the mobile menu is open
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const textColor = scrolled ? 'text-primary' : 'text-white'
  const duration = reduce ? 0 : 0.3

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-border bg-white/95 backdrop-blur'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
          <Link to="/" aria-label="KIYORA home">
            <img
              src="/images/logo.png"
              alt="KIYORA logo"
              className="h-12 w-12 object-contain md:h-14 md:w-14"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`text-[13px] tracking-wide transition-opacity hover:opacity-70 ${textColor}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 border px-5 py-2.5 text-[12px] font-medium tracking-wide transition-colors duration-300 ${
                scrolled
                  ? 'border-primary bg-primary text-white hover:bg-primary/90'
                  : 'border-white/60 text-white hover:bg-white hover:text-primary'
              }`}
            >
              <FontAwesomeIcon icon={faComment} className="text-xs" />
              WhatsApp
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className={`p-2 text-xl md:hidden ${textColor}`}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      {/* Mobile menu: drops down from the top (outside <header> so backdrop-blur
          doesn't break fixed positioning) */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              key="panel"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-x-0 top-0 z-[70] shadow-lg md:hidden"
              initial={reduce ? false : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration, ease: 'easeOut' }}
            >
              {/* Navy top bar: logo left, close right */}
              <div className="flex items-center justify-between bg-primary px-5 py-3">
                <Link to="/" onClick={() => setOpen(false)} aria-label="KIYORA home">
                  <img
                    src="/images/logo.png"
                    alt="KIYORA logo"
                    className="h-12 w-12 object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="p-2 text-xl text-white"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>

              {/* White area: links + WhatsApp button */}
              <div className="bg-white px-6 pb-6 pt-4">
                <nav className="flex flex-col" aria-label="Mobile">
                  {NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="py-3 text-[17px] text-foreground transition-opacity hover:opacity-70"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-primary/90"
                >
                  <FontAwesomeIcon icon={faComment} className="text-sm" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}