import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
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
  product: string
  quantity: string
  location: string
  message: string
}
type Errors = Partial<Record<keyof Values, string>>

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^\d{10}$/.test(v.phone))
    e.phone = 'Enter a valid 10-digit mobile number.'
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
    product,
    quantity: '',
    location: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
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
      // Phone: digits only, max 10
      const value =
        key === 'phone' ? e.target.value.replace(/\D/g, '').slice(0, 10) : e.target.value
      setValues((v) => ({ ...v, [key]: value }))
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }))
    }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    const formData = new FormData(e.currentTarget)
    if (formData.get('botcheck')) return // spam trap

    const text = [
      'Hello KIYORA, I would like to make an enquiry.',
      `Name: ${values.name}`,
      `Phone: ${values.phone}`,
      `Product: ${values.product}`,
      `Quantity: ${values.quantity}`,
      `Delivery location: ${values.location}`,
      `Message: ${values.message || '-'}`,
    ].join('\n')

    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer')
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
      <h3 className="text-3xl font-light text-primary">Send an Enquiry</h3>
      <p className="mt-2 text-[13px] font-light text-foreground/65">
        Fill in your details and we will continue the conversation on WhatsApp.
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
            inputMode="numeric"
            maxLength={10}
            value={values.phone}
            onChange={set('phone')}
            placeholder="10-digit mobile number"
            autoComplete="tel-national"
            className={inputClass(!!errors.phone)}
          />
        </Field>
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

      <div className="sticky bottom-0 -mx-6 -mb-6 mt-6 border-t border-border bg-white px-6 py-4 sm:-mx-8 sm:-mb-8 sm:px-8">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-primary/90"
        >
          <FontAwesomeIcon icon={faWhatsapp} className="text-sm" />
          Send Enquiry
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
            className="relative max-h-[90dvh] w-full max-w-lg overflow-y-auto bg-white"
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