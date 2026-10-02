import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { whatsappLink } from '../../lib/config'

const OCCASIONS = [
  'Restaurant / Cafe',
  'Hotel / Resort',
  'Wedding / Celebration',
  'Corporate Event',
  'Caterer / Banquet',
  'Party / Special Occasion',
  'Other',
]

const QUANTITIES = [
  'Under 100 bottles',
  '100 - 500 bottles',
  '500 - 1,000 bottles',
  '1,000 - 5,000 bottles',
  '5,000+ bottles',
]

type Values = {
  name: string
  phone: string
  business: string
  occasion: string
  quantity: string
  message: string
}

const EMPTY: Values = {
  name: '',
  phone: '',
  business: '',
  occasion: '',
  quantity: '',
  message: '',
}

const inputClass = (err?: string) =>
  `mt-2 w-full border bg-white px-3 py-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-foreground/30 focus:border-primary ${
    err ? 'border-red-500' : 'border-border'
  }`

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
  error?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
        {label}
        {required && <span className="text-accent"> *</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-[12px] text-red-600">
          {error}
        </span>
      )}
    </label>
  )
}

export default function BrandingForm() {
  const [v, setV] = useState<Values>(EMPTY)
  const [nameError, setNameError] = useState<string | undefined>()

  const set =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setV((s) => ({ ...s, [key]: e.target.value }))
      if (key === 'name') setNameError(undefined)
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (v.name.trim().length < 2) {
      setNameError('Please enter your name.')
      return
    }

    const text = [
      'Hello KIYORA, I would like to request custom branding.',
      '',
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim() || '-'}`,
      `Business / Event: ${v.business.trim() || '-'}`,
      `Occasion: ${v.occasion || '-'}`,
      `Estimated quantity: ${v.quantity || '-'}`,
      `Details: ${v.message.trim() || '-'}`,
    ].join('\n')

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label="Your Name" required error={nameError}>
          <input
            value={v.name}
            onChange={set('name')}
            placeholder="Your full name"
            autoComplete="name"
            className={inputClass(nameError)}
          />
        </Field>
        <Field label="Phone / WhatsApp Number">
          <input
            type="tel"
            value={v.phone}
            onChange={set('phone')}
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
            className={inputClass()}
          />
        </Field>
        <Field label="Business / Event Name">
          <input
            value={v.business}
            onChange={set('business')}
            placeholder="Your business or event name"
            className={inputClass()}
          />
        </Field>
        <Field label="Occasion / Use Case">
          <select value={v.occasion} onChange={set('occasion')} className={inputClass()}>
            <option value="">Select occasion</option>
            {OCCASIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Estimated Quantity">
          <select value={v.quantity} onChange={set('quantity')} className={inputClass()}>
            <option value="">Select quantity</option>
            {QUANTITIES.map((q) => (
              <option key={q}>{q}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Tell us more about your requirements">
            <textarea
              rows={4}
              value={v.message}
              onChange={set('message')}
              placeholder="Tell us about your design ideas, bottle sizes needed, event date, delivery location..."
              className={inputClass()}
            />
          </Field>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-whatsapp"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          Send Message
        </button>
      </div>
    </form>
  )
}