import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Website from './layouts/Website'
import IndexPage from './pages/index'
import ProductsPage from './pages/products'
import CustomBrandingPage from './pages/custom-branding'
import AboutPage from './pages/about'
import ContactPage from './pages/contact'
import PlantDetailsPage from './pages/plant-details'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document.querySelector(hash)?.scrollIntoView()
      }, 100)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <Website>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/custom-branding" element={<CustomBrandingPage />} />
        <Route path="/plant-details" element={<PlantDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Website>
  )
}