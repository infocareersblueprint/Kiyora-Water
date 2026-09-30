export const SITE = {
  brand: 'KIYORA',
  origin: 'Japan',
  country: 'India',
  parent: 'SHAHI GROUP OF INDUSTRIES',
  tagline: 'Where Purity Meets Japanese Elegance',

  // Country code + number, digits only (no + or spaces)
  whatsappNumber: '919390393329',
  whatsappDisplay: '93903 93329',

  phone: '[Your Phone Number]',
  email: '[Your Email Address]',
  address: '[Your Business Address, City, State, PIN]',

  instagramHandle: '@kiyorawater.india',
  instagramUrl: 'https://instagram.com/kiyorawater.india',

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