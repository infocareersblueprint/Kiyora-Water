import { useRef, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faMagnifyingGlass,
  faIndustry,
  faLocationDot,
  faHashtag,
  faTruckFast,
  faStar,
  faShieldHalved,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

type Plant = { code: string; address: string; fssai: string }

// DUMMY DATA: replace with the real plant details
const PLANTS: Plant[] = [
  {
    code: 'KH',
    address: 'Kiyora Water Pvt Ltd, Plot No. 00, Industrial Area, Hyderabad, Telangana - 500000',
    fssai: '10000000000001',
  },
  {
    code: 'KK',
    address: 'Kiyora Water Pvt Ltd, Plot No. 00, Industrial Area, Kurnool, Andhra Pradesh - 518000',
    fssai: '10000000000002',
  },
  {
    code: 'KN',
    address: 'Kiyora Water Pvt Ltd, Plot No. 00, Industrial Area, City, State - 000000',
    fssai: '10000000000003',
  },
]

function findPlant(raw: string): Plant | null {
  const c = raw.replace(/\s+/g, '').toUpperCase()
  if (c.length < 2) return null
  return PLANTS.find((p) => c.startsWith(p.code)) ?? null
}

function Row({ icon, label, value }: { icon: typeof faIndustry; label: string; value?: string }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-tint text-sm text-accent sm:h-9 sm:w-9 sm:text-base">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-foreground sm:text-sm">{label}</p>
        {value && <p className="mt-1 text-sm leading-relaxed text-muted break-words">{value}</p>}
      </div>
    </div>
  )
}

function FactoryIllustration() {
  const bottle =
    'M162 38 h36 v18 c0 8 32 14 32 34 v105 a10 10 0 0 1 -10 10 h-80 a10 10 0 0 1 -10 -10 v-105 c0 -20 32 -26 32 -34 Z'
  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Water bottle with batch code" className="h-auto w-full">
      <defs>
        <clipPath id="bottle-clip">
          <path d={bottle} />
        </clipPath>
      </defs>

      {/* soft backdrop */}
      <circle cx="180" cy="118" r="98" className="fill-tint" />

      {/* floating drops + bubbles */}
      <path d="M74 84 C80 94 85 98 85 104 a11 11 0 0 1 -22 0 C63 98 68 94 74 84 Z" className="fill-accent" />
      <path d="M300 62 C304 69 307 72 307 76 a7 7 0 0 1 -14 0 C293 72 296 69 300 62 Z" className="fill-primary" />
      <circle cx="104" cy="150" r="5" fill="none" stroke="#c9d8ee" strokeWidth="2" />
      <circle cx="92" cy="170" r="3" fill="none" stroke="#c9d8ee" strokeWidth="2" />

      {/* bottle body */}
      <path d={bottle} fill="#eef3fa" stroke="#c9d8ee" strokeWidth="2" />

      {/* water */}
      <g clipPath="url(#bottle-clip)">
        <path
          d="M120 112 q15 -8 30 0 t30 0 t30 0 t30 0 V210 H120 Z"
          className="fill-accent"
          opacity="0.35"
        />
        <path
          d="M120 124 q15 -8 30 0 t30 0 t30 0 t30 0 V210 H120 Z"
          className="fill-accent"
          opacity="0.6"
        />
        {/* highlight */}
        <rect x="140" y="80" width="6" height="110" rx="3" fill="#fff" opacity="0.55" />
      </g>

      {/* label */}
      <rect x="130" y="146" width="100" height="34" className="fill-primary" />
      <text
        x="180"
        y="168"
        textAnchor="middle"
        fontSize="14"
        fontWeight="700"
        letterSpacing="3"
        fill="#fff"
      >
        KIYORA
      </text>

      {/* cap */}
      <rect x="157" y="18" width="46" height="20" rx="4" className="fill-accent" />
      <rect x="157" y="26" width="46" height="3" fill="#fff" opacity="0.35" />

      {/* batch code tag */}
      <path d="M232 190 H262" stroke="#c9d8ee" strokeWidth="2" strokeDasharray="3 3" fill="none" />
      <rect x="262" y="174" width="70" height="32" rx="8" fill="#fff" stroke="#c9d8ee" strokeWidth="2" />
      <text
        x="297"
        y="195"
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        letterSpacing="1"
        className="fill-primary"
      >
        KH2410
      </text>

      {/* ground */}
      <rect x="60" y="213" width="240" height="8" rx="4" fill="#c9d8ee" />
    </svg>
  )
}

export default function PlantDetailsPage() {
  // QR support: /plant-details?code=KH
  const [params, setParams] = useSearchParams()
  const initial = params.get('code') ?? ''
  const [input, setInput] = useState(initial)
  const [searched, setSearched] = useState(initial)

  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const hasSearched = searched.trim().length > 0
  const plant = hasSearched ? findPlant(searched) : null

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!input.trim()) {
      setError(true)
      setSearched('')
      inputRef.current?.focus()
      return
    }
    setError(false)
    setSearched(input)
    setParams(input.trim() ? { code: input.trim() } : {}, { replace: true })
  }

  return (
    <main>
      {/* Navy hero: lets the transparent header show over a dark background */}
      <section className="bg-primary pt-32 pb-14 text-white md:pt-40">
        <div className="mx-auto max-w-4xl px-6">
          <nav className="text-xs text-white/70">
            <Link to="/" className="font-medium text-white hover:text-accent">Home</Link>
            <span className="mx-2">:</span>
            <span>Kiyora Plant Locator</span>
          </nav>
          <h1 className="mt-6 text-4xl text-white md:text-5xl">Kiyora Plant Locator</h1>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <p className="mx-auto mt-10 max-w-xl text-center text-muted leading-relaxed">
          To get details of the manufacturing unit &amp; FSSAI Licence number, enter the initial
          two/three characters of the batch number in the search box e.g. KH
        </p>

        <form
          onSubmit={onSubmit}
          className={`mx-auto mt-8 flex max-w-md items-center rounded-xl border bg-background py-1.5 pl-4 pr-1.5 ${error ? 'border-accent' : 'border-border focus-within:border-primary'}`}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (error) setError(false)
            }}
            maxLength={10}
            placeholder="Enter batch code"
            aria-label="Batch code"
            className="min-w-0 flex-1 bg-transparent text-base outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white transition hover:bg-primary"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>

        {error && (
          <p role="alert" className="mx-auto mt-2 max-w-md text-sm text-accent">
            <FontAwesomeIcon icon={faCircleExclamation} className="mr-2" />
            Please type the batch code to search, e.g. KH
          </p>
        )}

        {!hasSearched && (
          <div className="mx-auto mt-10 w-full max-w-xs sm:max-w-sm">
            <FactoryIllustration />
            <p className="mt-3 text-center text-sm text-muted">
              Enter a batch code to see where your bottle was filled
            </p>
          </div>
        )}

        {hasSearched && (
          <section
            aria-live="polite"
            className="mx-auto mt-8 max-w-md rounded-xl border border-border bg-background p-4 shadow-sm sm:p-6"
          >
            {plant ? (
              <div className="space-y-5">
                <Row icon={faIndustry} label={`Plant Code: ${plant.code}`} />
                <Row icon={faLocationDot} label="Plant Address:" value={plant.address} />
                <Row icon={faHashtag} label={`FSSAI License No: ${plant.fssai}`} />
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-tint text-xl text-accent">
                  <FontAwesomeIcon icon={faCircleExclamation} />
                </div>
                <p className="font-semibold text-primary">No Matching Plant Found</p>
                <p className="mt-1 text-sm text-muted">
                  No plant data found. Please check the code and try again
                </p>
              </div>
            )}
          </section>
        )}
      </div>


      <div className="mt-16 bg-tint py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap gap-x-10 gap-y-3 px-6 text-sm text-primary">
          <span><FontAwesomeIcon icon={faTruckFast} className="mr-2 text-accent" />Fast Delivery</span>
          <span><FontAwesomeIcon icon={faStar} className="mr-2 text-accent" />Premium Quality</span>
          <span><FontAwesomeIcon icon={faShieldHalved} className="mr-2 text-accent" />FSSAI Licensed</span>
        </div>
      </div>
    </main>
  )
}