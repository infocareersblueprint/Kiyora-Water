import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck,
  faPaperPlane,
  faSpinner,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { whatsappLink } from '../../lib/config'

const PRODUCT_OPTIONS = [
  '250 ml',
  '500 ml',
  '1 Litre',
  'Custom Branding',
  'Bulk / Business Order',
  'General Enquiry',
]

type Values = {
  name: string
  phone: string
  email: string
  product: string
  quantity: string
  location: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 8 || digits.length > 15)
    e.phone = 'Enter a valid phone number (8 to 15 digits).'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = 'Enter a valid email address.'
  if (!v.product) e.product = 'Please choose a product.'
  if (!v.quantity.trim()) e.quantity = 'Please enter the quantity you need.'
  if (v.location.trim().length < 2)
    e.location = 'Please enter your delivery location.'
  return e
}

const inputClass = (hasError: boolean) =>
  `mt-1.5 w-full border bg-white px-3 py-2.5 text-[14px] text-foreground outline-none transition-colors focus:border-primary ${
    hasError ? 'border-red-500' : 'border-border'
  }`

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
        {label}
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

function EnquiryForm({
  product,
  onClose,
}: {
  product: string
  onClose: () => void
}) {
  const [values, setValues] = useState<Values>({
    name: '',
    phone: '',
    email: '',
    product,
    quantity: '',
    location: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const firstRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const set =
    (key: keyof Values) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [key]: e.target.value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    }

  const runValidation = () => {
    const e = validate(values)
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!runValidation()) return

    const formData = new FormData(e.currentTarget)
    if (formData.get('botcheck')) return // spam trap

    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `New KIYORA enquiry: ${values.product}`,
          from_name: 'KIYORA Website',
          name: values.name,
          phone: values.phone,
          email: values.email,
          product: values.product,
          quantity: values.quantity,
          delivery_location: values.location,
          message: values.message || '(none)',
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const handleWhatsApp = () => {
    if (!runValidation()) return
    const text = [
      'Hello KIYORA, I would like to make an enquiry.',
      `Name: ${values.name}`,
      `Product: ${values.product}`,
      `Quantity: ${values.quantity}`,
      `Delivery location: ${values.location}`,
      `Message: ${values.message || '-'}`,
    ].join('\n')
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
  }

  if (status === 'success') {
    return (
      <div className="px-8 py-14 text-center">
        <FontAwesomeIcon icon={faCircleCheck} className="text-4xl text-whatsapp" />
        <h3 className="mt-5 text-3xl font-light text-primary">Thank you</h3>
        <p className="mx-auto mt-3 max-w-xs text-[14px] font-light text-foreground/70">
          Your enquiry has been sent. Our team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
      <h3 className="text-3xl font-light text-primary">Send an Enquiry</h3>
      <p className="mt-2 text-[13px] font-light text-foreground/65">
        Tell us what you need and we will respond shortly.
      </p>

      {/* Honeypot: hidden from real visitors */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            ref={firstRef}
            value={values.name}
            onChange={set('name')}
            autoComplete="name"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            value={values.phone}
            onChange={set('phone')}
            autoComplete="tel"
            className={inputClass(!!errors.phone)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={values.email}
              onChange={set('email')}
              autoComplete="email"
              className={inputClass(!!errors.email)}
            />
          </Field>
        </div>
        <Field label="Product / Size" error={errors.product}>
          <select
            value={values.product}
            onChange={set('product')}
            className={inputClass(!!errors.product)}
          >
            {PRODUCT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Quantity" error={errors.quantity}>
          <input
            value={values.quantity}
            onChange={set('quantity')}
            placeholder="e.g. 50 cartons"
            className={inputClass(!!errors.quantity)}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Delivery Location" error={errors.location}>
            <input
              value={values.location}
              onChange={set('location')}
              className={inputClass(!!errors.location)}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Message (optional)">
            <textarea
              rows={3}
              value={values.message}
              onChange={set('message')}
              className={inputClass(false)}
            />
          </Field>
        </div>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-[13px] text-red-600">
          Something went wrong and your enquiry was not sent. Please try again or
          use WhatsApp.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex flex-1 items-center justify-center gap-2 bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-primary/90 disabled:opacity-60"
        >
          <FontAwesomeIcon
            icon={status === 'loading' ? faSpinner : faPaperPlane}
            spin={status === 'loading'}
          />
          {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
        </button>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex flex-1 items-center justify-center gap-2 bg-whatsapp px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:brightness-95"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          Chat on WhatsApp
        </button>
      </div>
    </form>
  )
}

export default function EnquiryModal({
  open,
  product,
  onClose,
}: {
  open: boolean
  product: string
  onClose: () => void
}) {
  const reduce = useReducedMotion()
  const d = reduce ? 0 : 0.3

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="enquiry"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: d }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Send an enquiry"
            className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto bg-white"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: d, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close enquiry form"
              className="absolute right-3 top-3 z-10 p-2 text-lg text-primary"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <EnquiryForm product={product} onClose={onClose} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}