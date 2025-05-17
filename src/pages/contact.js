import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'

import { Contact } from 'components/Contact/Contact'
import { Layout } from 'components/Layout/Layout'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME, BUSINESS_DESCRIPTION, WEBSITE_URL } from 'consts/contactDetails'

const ContactPage = () => {
  return (
    <Layout>
      <Contact />
    </Layout>
  )
}

export default ContactPage

/**
 * Implement Gatsby Head API for the contact page
 * This includes both standard SEO tags and LocalBusiness schema
 * The contact page is especially important for local business schema
 */
export const Head = ({ data, location }) => {
  const { t } = useTranslation('seo')
  const { language } = useI18next()
  const titleFallback = language === 'en'
    ? 'Contact - ' + BUSINESS_NAME
    : 'Kontakt - ' + BUSINESS_NAME
  const descriptionFallback = language === 'en'
    ? 'Contact ' + BUSINESS_NAME + ' for custom blacksmith work. ' + BUSINESS_DESCRIPTION
    : 'Skontaktuj się z ' + BUSINESS_NAME + ' w sprawie indywidualnych wyrobów kowalskich. ' + BUSINESS_DESCRIPTION
  const title = t('contact.title', titleFallback)
  const description = t('contact.description', descriptionFallback)
  
  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
      />
      <LocalBusinessSchema 
        url={`${WEBSITE_URL}${location.pathname}`}
        title={title}
        description={description}
        pathname={location.pathname}
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
      />
    </>
  )
}

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
