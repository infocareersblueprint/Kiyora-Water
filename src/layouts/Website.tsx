import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import Header from './parts/Header'
import Footer from './parts/Footer'
import WhatsAppFloat from '../components/ui/WhatsAppFloat'
import EnquiryModal from '../components/ui/EnquiryModal'
import { EnquiryContext } from '../lib/enquiry-context'

export default function Website({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState('General Enquiry')

  const openEnquiry = useCallback((p?: string) => {
    setProduct(p ?? 'General Enquiry')
    setOpen(true)
  }, [])
  const close = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openEnquiry }), [openEnquiry])

  return (
    <EnquiryContext.Provider value={value}>
      <div id="top">
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
      <EnquiryModal open={open} product={product} onClose={close} />
    </EnquiryContext.Provider>
  )
}