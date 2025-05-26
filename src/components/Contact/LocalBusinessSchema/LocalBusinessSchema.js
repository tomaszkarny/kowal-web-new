import React from 'react'
import { 
  BUSINESS_TYPE,
  BUSINESS_IMAGES,
  WEBSITE_URL,
  GOOGLE_MAP_DIRECTIONS,
  OPENING_HOURS,
  PRICE_RANGE,
  CURRENCIES_ACCEPTED,
  PAYMENT_ACCEPTED,
  AREA_SERVED,
  YEAR_ESTABLISHED,
  getNapInfo
} from 'consts/contactDetails'
import { getLanguageFromPath } from 'consts/languageConfig'

/**
 * Component for adding LocalBusiness structured data to pages
 * Simplifies the process of adding schema.org LocalBusiness markup
 * 
 * @param {Object} props - Component props
 * @param {string} props.url - The URL of the current page (defaults to website URL)
 * @param {string} props.title - The title of the current page
 * @param {string} props.description - Page description (if different from default business description)
 * @param {string} props.image - Main image for the business (optional)
 * @param {string} props.pathname - Current page path for language detection
 * @param {string} props.language - Language code (pl or en)
 */
export const LocalBusinessSchema = ({
  url = WEBSITE_URL,
  title,
  description,
  image,
  pathname,
  language = 'pl'
}) => {
  // During SSR, prefer the language prop over hooks
  const currentLang = language || (pathname ? getLanguageFromPath(pathname) : 'pl')
  
  // Get language-specific NAP information
  const napInfo = getNapInfo(currentLang)
  
  // Build the schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': BUSINESS_TYPE,
    '@id': `${url || WEBSITE_URL}#localbusiness`,
    name: napInfo.businessName,
    image: BUSINESS_IMAGES.map(img => img.startsWith('http') ? img : `${WEBSITE_URL}${img}`),
    url: url || WEBSITE_URL,
    telephone: napInfo.phone,
    email: napInfo.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: napInfo.address.street,
      addressLocality: napInfo.address.city,
      postalCode: napInfo.address.postalCode,
      addressRegion: napInfo.address.region,
      addressCountry: napInfo.address.countryCode
    },
    description: description || napInfo.description,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GOOGLE_MAP_DIRECTIONS.lat.toString(),
      longitude: GOOGLE_MAP_DIRECTIONS.lng.toString()
    },
    openingHoursSpecification: OPENING_HOURS.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.days,
      opens: hours.opens,
      closes: hours.closes
    })),
    priceRange: PRICE_RANGE,
    currenciesAccepted: CURRENCIES_ACCEPTED,
    paymentAccepted: PAYMENT_ACCEPTED.join(', '),
    areaServed: AREA_SERVED.map(area => ({
      '@type': 'AdministrativeArea',
      name: area
    })),
    foundingDate: YEAR_ESTABLISHED,
    sameAs: [
      napInfo.social.facebook ? `https://${napInfo.social.facebook}` : null, 
      napInfo.social.instagram ? `https://${napInfo.social.instagram}` : null
    ].filter(Boolean)
  }
  
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default LocalBusinessSchema