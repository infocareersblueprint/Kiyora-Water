import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { whatsappLink } from '../../lib/config'

const TOPICS = [
  'Bulk order',
  'Custom branding',
  'Dealership / Distribution',
  'Product information',
  'Other',
]

type Values = {
  name: string
  phone: string
  topic: string
  message: string
}

const EMPTY: Values = { name: '', phone: '', topic: '', message: '' }

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

export default function ContactForm() {
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
      'Hello KIYORA, I have an enquiry.',
      '',
      `Name: ${v.name.trim()}`,
      `Phone: ${v.phone.trim() || '-'}`,
      `Enquiry about: ${v.topic || '-'}`,
      `Message: ${v.message.trim() || '-'}`,
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
        <div className="sm:col-span-2">
          <Field label="Enquiry About">
            <select value={v.topic} onChange={set('topic')} className={inputClass()}>
              <option value="">Select a topic</option>
              {TOPICS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Your Message">
            <textarea
              rows={4}
              value={v.message}
              onChange={set('message')}
              placeholder="How can we help you?"
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