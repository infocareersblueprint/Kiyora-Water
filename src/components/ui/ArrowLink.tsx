import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import type { ReactNode } from 'react'

type Variant = 'white' | 'navy' | 'orange' | 'outline' | 'outlineLight' | 'whatsapp'

const VARIANTS: Record<Variant, string> = {
  white: 'bg-white text-primary hover:bg-white/90',
  navy: 'bg-primary text-white hover:bg-primary/90',
  orange: 'bg-accent text-white hover:bg-accent/90',
  outline: 'border border-primary text-primary hover:bg-primary hover:text-white',
  outlineLight: 'border border-white/40 text-white hover:bg-white hover:text-primary',
  whatsapp: 'bg-whatsapp text-white hover:brightness-95',
}

type ArrowLinkProps = {
  children: ReactNode
  variant?: Variant
  arrow?: boolean
  icon?: IconDefinition
  href?: string
  external?: boolean
  onClick?: () => void
  className?: string
}

export default function ArrowLink({
  children,
  variant = 'navy',
  arrow = false,
  icon,
  href,
  external = false,
  onClick,
  className = '',
}: ArrowLinkProps) {
  const classes = `group inline-flex items-center justify-center gap-2 px-6 py-3 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${VARIANTS[variant]} ${className}`

  const content = (
    <>
      {icon && <FontAwesomeIcon icon={icon} className="text-sm" />}
      <span>{children}</span>
      {arrow && (
        <FontAwesomeIcon
          icon={faArrowRight}
          className="text-[10px] transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  )
}