import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faCircleCheck,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { whatsappLink } from '../../lib/config'

const SUBJECTS = [
  'General Enquiry',
  'Bulk / Business Order',
  'Custom Branding',
  'Product Information',
  'Other',
]

type Values = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}
type Errors = Partial<Record<'name' | 'email' | 'message', string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

const EMPTY: Values = { name: '', email: '', phone: '', subject: '', message: '' }

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
  children: React.ReactNode
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
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')

  const set =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setV((s) => ({ ...s, [key]: e.target.value }))
      if (key === 'name' || key === 'email' || key === 'message')
        setErrors((er) => ({ ...er, [key]: undefined }))
    }

  const validate = (needEmail: boolean): Errors => ({
    name: v.name.trim().length < 2 ? 'Please enter your name.' : undefined,
    email:
      needEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())
        ? 'Enter a valid email address.'
        : undefined,
    message:
      v.message.trim().length < 5 ? 'Please tell us how we can help.' : undefined,
  })

  const hasErrors = (e: Errors) => !!(e.name || e.email || e.message)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const errs = validate(true)
    setErrors(errs)
    if (hasErrors(errs)) return
    if (new FormData(e.currentTarget).get('botcheck')) return // spam trap

    // CHANGED: check the access key before sending
    const key = import.meta.env.VITE_WEB3FORMS_KEY
    if (!key) {
      console.error(
        'VITE_WEB3FORMS_KEY is missing. Check .env and restart the dev server.',
      )
      setStatus('error')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key, // CHANGED: uses the checked key
          subject: `KIYORA contact: ${v.subject || 'General Enquiry'}`,
          from_name: 'KIYORA Website',
          name: v.name,
          email: v.email,
          phone: v.phone || '(not given)',
          enquiry_subject: v.subject || '(not given)',
          message: v.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setV(EMPTY)
      } else {
        // CHANGED: log the real reason from Web3Forms
        console.error('Web3Forms error:', data.message)
        setStatus('error')
      }
    } catch (err) {
      console.error('Network error:', err) // CHANGED
      setStatus('error')
    }
  }

  const handleWhatsApp = () => {
    const errs = validate(false)
    setErrors(errs)
    if (hasErrors(errs)) return
    const text = [
      'Hello KIYORA, I have an enquiry.',
      `Name: ${v.name}`,
      `Subject: ${v.subject || '-'}`,
      `Message: ${v.message}`,
    ].join('\n')
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  if (status === 'success') {
    return (
      <div className="border border-border px-8 py-14 text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-4xl text-whatsapp" />
        <h3 className="mt-5 text-3xl font-light text-primary">Thank you</h3>
        <p className="mx-auto mt-3 max-w-sm text-[14px] font-light text-foreground/70">
          Your message has been sent. Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 border border-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-primary"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
        <Field label="Your Name" required error={errors.name}>
          <input
            value={v.name}
            onChange={set('name')}
            placeholder="Your full name"
            autoComplete="name"
            className={inputClass(errors.name)}
          />
        </Field>
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={v.email}
            onChange={set('email')}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass(errors.email)}
          />
        </Field>
        <Field label="Phone / WhatsApp">
          <input
            type="tel"
            value={v.phone}
            onChange={set('phone')}
            placeholder="+91 XXXXX XXXXX"
            autoComplete="tel"
            className={inputClass()}
          />
        </Field>
        <Field label="Subject">
          <select value={v.subject} onChange={set('subject')} className={inputClass()}>
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Your Message" required error={errors.message}>
            <textarea
              rows={5}
              value={v.message}
              onChange={set('message')}
              placeholder="Tell us how we can help..."
              className={inputClass(errors.message)}
            />
          </Field>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 text-[13px] text-red-600">
          Something went wrong and your message was not sent. Please try again or
          use WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="group inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-primary/90 disabled:opacity-60"
        >
          {status === 'loading' ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin /> Sending...
            </>
          ) : (
            <>
              Send Message
              <FontAwesomeIcon
                icon={faArrowRight}
                className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-primary transition-colors duration-300 hover:bg-whatsapp hover:text-white"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          WhatsApp Instead
        </button>
      </div>
    </form>
  )
}