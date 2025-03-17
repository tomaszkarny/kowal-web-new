import React from 'react'
import { Helmet } from 'react-helmet'
import { ADDRESS, PHONE_NUMBER, EMAIL_ADDRESS, FACEBOOK_URL } from '../../consts/contactDetails'

/**
 * Component for adding structured data (JSON-LD) to pages
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
  datePublished
}) => {
  const schema = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      description,
      image
    },
    {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: organization.name,
      url: organization.url,
      logo: organization.logo,
      address: {
        '@type': 'PostalAddress',
        addressLocality: organization.address
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: organization.phone,
        email: organization.email
      },
      sameAs: [`https://${FACEBOOK_URL}`]
    },
    {
      '@context': 'http://schema.org',
      '@type': 'LocalBusiness',
      '@id': url,
      name: organization.name,
      image,
      url,
      telephone: organization.phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: organization.address
      },
      description
    }
  ]

  if (datePublished) {
    schema.push({
      '@context': 'http://schema.org',
      '@type': 'Article',
      url,
      title,
      image,
      description,
      datePublished,
      publisher: {
        '@type': 'Organization',
        name: organization.name,
        logo: {
          '@type': 'ImageObject',
          url: organization.logo
        }
      }
    })
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
