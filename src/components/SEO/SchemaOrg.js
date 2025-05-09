import React from 'react'
import { Helmet } from 'react-helmet'
import { ADDRESS, PHONE_NUMBER, EMAIL_ADDRESS, FACEBOOK_URL, INSTAGRAM_URL } from 'consts/contactDetails'

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
    name: 'Pracownia Kowalstwa Artystycznego Tadeusz Karny',
    url: 'https://kowalstwo-karny.pl',
    logo: '/logo.png',
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
        streetAddress: organization.address.split(',')[0]?.trim(),
        addressLocality: organization.address.split(',')[1]?.trim(),
        postalCode: organization.address.match(/\d{2}-\d{3}/)?.[0] || '',
        addressCountry: 'PL'
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
      '@type': 'BlacksmithShop',
      '@id': `${url}#localbusiness`,
      name: organization.name,
      image: image ? (image.startsWith('http') ? image : `${organization.url}${image}`) : null,
      url,
      telephone: organization.phone,
      email: organization.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: organization.address.split(',')[0]?.trim(),
        addressLocality: organization.address.split(',')[1]?.trim(),
        postalCode: organization.address.match(/\d{2}-\d{3}/)?.[0] || '',
        addressCountry: 'PL'
      },
      description,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '53.1324', 
        longitude: '18.0019'
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '16:00'
        }
      ],
      priceRange: '$$'
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
