import { motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { whatsappLink } from '../../lib/config'

export default function WhatsAppFloat() {
  const reduce = useReducedMotion()

  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KIYORA on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-3xl text-white shadow-lg"
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <FontAwesomeIcon icon={faWhatsapp} />
    </motion.a>
  )
}