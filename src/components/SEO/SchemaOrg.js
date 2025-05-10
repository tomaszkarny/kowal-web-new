import React from 'react'
import { Helmet } from 'react-helmet'
import {
  BUSINESS_NAME,
  EMAIL_ADDRESS,
  PHONE_NUMBER,
  ADDRESS,
  ADDRESS_STREET,
  ADDRESS_CITY,
  ADDRESS_POSTAL_CODE,
  ADDRESS_REGION,
  ADDRESS_COUNTRY_CODE,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  WEBSITE_URL,
  LOGO_PATH,
  GOOGLE_MAP_DIRECTIONS,
  BUSINESS_TYPE,
  BUSINESS_DESCRIPTION,
  PRICE_RANGE,
  YEAR_ESTABLISHED,
  CURRENCIES_ACCEPTED,
  PAYMENT_ACCEPTED,
  AREA_SERVED,
  OPENING_HOURS,
  BUSINESS_IMAGES
} from 'consts/contactDetails'

/**
 * Component for adding structured data (JSON-LD) to pages
 * Enhanced version that supports multiple schema.org types
 */
export const SchemaOrg = ({
  url,
  title,
  description,
  image,
  organization = {
    name: BUSINESS_NAME,
    url: WEBSITE_URL,
    logo: LOGO_PATH,
    address: ADDRESS,
    phone: PHONE_NUMBER,
    email: EMAIL_ADDRESS
  },
  datePublished,
  dateModified,
  structuredDataType = 'website',
  breadcrumbs = [],
  faq = []
}) => {
  // Initialize schema array
  const schema = []
  
  // Always include the WebSite schema if requested
  if (structuredDataType === 'website' || structuredDataType === 'all') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${url}#website`,
      url,
      name: title,
      description,
      image,
      inLanguage: 'pl-PL',
      potentialAction: [
        {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${organization.url}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      ]
    })
  }

  // Organization schema
  if (structuredDataType === 'organization' || structuredDataType === 'all') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${organization.url}#organization`,
      name: organization.name,
      url: organization.url,
      logo: {
        '@type': 'ImageObject',
        url: organization.logo.startsWith('http') ? organization.logo : `${organization.url}${organization.logo}`,
        width: 112,
        height: 112
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS_STREET,
        addressLocality: ADDRESS_CITY,
        postalCode: ADDRESS_POSTAL_CODE,
        addressRegion: ADDRESS_REGION,
        addressCountry: ADDRESS_COUNTRY_CODE
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: organization.phone,
        email: organization.email
      },
      sameAs: [
        FACEBOOK_URL ? `https://${FACEBOOK_URL}` : null, 
        INSTAGRAM_URL ? `https://${INSTAGRAM_URL}` : null
      ].filter(Boolean)
    })
  }

  // LocalBusiness schema
  if (structuredDataType === 'local-business' || structuredDataType === 'all') {
    schema.push({
      '@context': 'https://schema.org',
      '@type': BUSINESS_TYPE,
      '@id': `${url}#localbusiness`,
      name: BUSINESS_NAME,
      image: BUSINESS_IMAGES.map(img => img.startsWith('http') ? img : `${WEBSITE_URL}${img}`),
      url: url || WEBSITE_URL,
      telephone: PHONE_NUMBER,
      email: EMAIL_ADDRESS,
      address: {
        '@type': 'PostalAddress',
        streetAddress: ADDRESS_STREET,
        addressLocality: ADDRESS_CITY,
        postalCode: ADDRESS_POSTAL_CODE,
        addressRegion: ADDRESS_REGION,
        addressCountry: ADDRESS_COUNTRY_CODE
      },
      description: description || BUSINESS_DESCRIPTION,
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
        FACEBOOK_URL ? `https://${FACEBOOK_URL}` : null, 
        INSTAGRAM_URL ? `https://${INSTAGRAM_URL}` : null
      ].filter(Boolean)
    })
  }

  // Article schema for blog posts or news
  if ((structuredDataType === 'article' || structuredDataType === 'all') && datePublished) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: title,
      description,
      image: image ? (image.startsWith('http') ? image : `${organization.url}${image}`) : null,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: 'Tadeusz Karny'
      },
      publisher: {
        '@type': 'Organization',
        name: organization.name,
        logo: {
          '@type': 'ImageObject',
          url: organization.logo.startsWith('http') ? organization.logo : `${organization.url}${organization.logo}`,
          width: 112,
          height: 112
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      },
      isPartOf: {
        '@id': `${organization.url}#website`
      }
    })
  }
  
  // BreadcrumbList schema
  if ((structuredDataType === 'breadcrumbs' || structuredDataType === 'all') && breadcrumbs.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    })
  }
  
  // FAQ schema
  if ((structuredDataType === 'faq' || structuredDataType === 'all') && faq.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    })
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
