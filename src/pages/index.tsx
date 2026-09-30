import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Purification from '../components/sections/Purification'
import Products from '../components/sections/Products'
import CustomBranding from '../components/sections/CustomBranding'
import WhyUs from '../components/sections/WhyUs'
import Partner from '../components/sections/Partner'
import ServiceAreas from '../components/sections/ServiceAreas'
import Contact from '../components/sections/Contact'
import { useEnquiry } from '../lib/enquiry-context'

export default function IndexPage() {
  const { openEnquiry } = useEnquiry()

  return (
    <>
      <Hero />
      <About />
      <Purification />
      <Products onEnquire={(size) => openEnquiry(size)} />
      <CustomBranding onRequest={() => openEnquiry('Custom Branding')} />
      <WhyUs />
      <Partner onContact={() => openEnquiry('Bulk / Business Order')} />
      <ServiceAreas />
      <Contact />
    </>
  )
}