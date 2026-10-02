export const SITE = {
  brand: 'KIYORA',
  origin: 'Japan',
  country: 'India',
  parent: 'SHAHI GROUP OF INDUSTRIES',
  tagline: 'Where Purity Meets Japanese Elegance',

  // Country code + number, digits only (no + or spaces)
  // Used for the WhatsApp button and the "Call Us" button
  whatsappNumber: '919390393329',

  // Customer care number shown on the page
  phone: '+91 93903 93329',
  email: 'shahigroup.india@gmail.com',
  address: 'Kukatpally, Medchal-Malkajgiri, Telangana 500072, India.',

  instagramHandle: '@kiyorawater.india',
  instagramUrl: 'https://www.instagram.com/kiyorawater.india/',

  cities: [
    { name: 'Hyderabad', state: 'Telangana' },
    { name: 'Kurnool', state: 'Andhra Pradesh' },
  ],
}

export const DEFAULT_GREETING =
  'Hello KIYORA, I would like to know more about your packaged drinking water.'

export function whatsappLink(message: string = DEFAULT_GREETING) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
}