import { createContext, useContext } from 'react'

type EnquiryContextValue = {
  openEnquiry: (product?: string) => void
}

export const EnquiryContext = createContext<EnquiryContextValue>({
  openEnquiry: () => {},
})

export const useEnquiry = () => useContext(EnquiryContext)