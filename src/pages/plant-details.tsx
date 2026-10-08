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

type Unit = { name: string; address: string; fssai: string }
type Plant = { code: string; units: Unit[] }

const PLANTS: Plant[] = [
  {
    code: 'TB',
    units: [
      {
        name: 'Trishul Foods & Beverages',
        address: 'Sy. No. 153/1A, Behind Arunodaya Highway Dhaba, Dinne Deverapadu, Kurnool -3, [A.P.]',
        fssai: '10125012000394',
      },
    ],
  },
  {
    code: '7S',
    units: [
      {
        name: 'SEVEN STAR KING AQUA',
        address: 'Plot No. 37, Aditya Nagar, New Hafeezpet, Serilingampally, R.R. Dist. Telangana, India 500049',
        fssai: '13623013000034',
      },
      {
        name: 'KING SEVEN STAR AQUA LLP',
        address: 'Plot No. 6-50, Opp. HPR Dhaba Fasalwadi Village, Sangareddy (Urban), Telangana - 502294',
        fssai: '13625026000609',
      },
    ],
  },
]

const MARKETED_BY = [
  {
    state: 'Telangana',
    lines: ['SHAHI GROUP OF INDUSTRIES', 'Kukatpally, Medchal-Malkajgiri, Hyderabad,', 'Telangana 500072. INDIA'],
    fssai: '23626052000223',
  },
  {
    state: 'Andhra Pradesh',
    lines: ['SHAHI GROUP OF INDUSTRIES', 'I Town, Kurnool,', 'Andhra Pradesh, 518001. INDIA'],
    fssai: '',
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
        {value && <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-muted break-words">{value}</p>}
      </div>
    </div>
  )
}

export default function PlantDetailsPage() {
  // QR support: /plant-details?code=TB
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
      <section className="bg-primary pt-32 pb-12 text-white md:pt-40">
        <div className="mx-auto max-w-4xl px-6">
          <nav className="text-xs text-white/70">
            <Link to="/" className="font-medium text-white hover:text-accent">Home</Link>
            <span className="mx-2">:</span>
            <span>Kiyora Plant Locator &amp; Marketed By</span>
          </nav>
          <h1 className="mt-6 text-4xl text-white md:text-5xl">Kiyora Plant Locator &amp; Marketed By</h1>

          <div className="mt-8 border-t border-white/15 pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">Marketed by</p>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              {MARKETED_BY.map((m) => (
                <div key={m.state}>
                  <p className="font-semibold text-white">{m.state}</p>
                  {m.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm leading-relaxed text-white/75">{l}</p>
                  ))}
                  {m.fssai && <p className="mt-1 text-sm text-white/75">FSSAI Lic No. {m.fssai}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6">
        <p className="mx-auto mt-10 max-w-xl text-center text-muted leading-relaxed">
          To get details of the manufacturing unit &amp; FSSAI Licence number, enter the initial
          two/three characters of the batch number in the search box
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
            Please type the batch code to search
          </p>
        )}

        {!hasSearched && (
          <div className="mx-auto mt-10 w-full max-w-xs sm:max-w-sm">
            <img
              src="/images/plant-detail.png"
              alt="Kiyora plant"
              className="mx-auto h-auto w-full"
              loading="lazy"
            />
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
                {plant.units.map((u, i) => (
                  <div key={u.fssai} className={`space-y-5 ${i > 0 ? 'border-t border-border pt-5' : ''}`}>
                    {plant.units.length > 1 && (
                      <p className="text-xs font-semibold uppercase tracking-widest text-accent">Plant {i + 1}</p>
                    )}
                    <Row icon={faLocationDot} label="Plant Address:" value={`${u.name}\n${u.address}`} />
                    <Row icon={faHashtag} label={`FSSAI License No: ${u.fssai}`} />
                  </div>
                ))}
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