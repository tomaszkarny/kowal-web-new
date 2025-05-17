import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'

import { About } from 'components/About/About'
import { Layout } from 'components/Layout/Layout'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME, WEBSITE_URL } from 'consts/contactDetails'

const AboutPage = () => {
  return (
    <Layout>
      <About />
    </Layout>
  )
}

export default AboutPage

/**
 * Implement Gatsby Head API for the about page
 * This includes both standard SEO tags and BreadcrumbList schema
 */
export const Head = ({ data, location }) => {
  // Use the seo namespace for titles and descriptions
  const { t } = useTranslation('seo')
  const { language } = useI18next()
  
  // Create language-specific fallbacks
  const titleFallback = language === 'en'
    ? 'About Us - Tadeusz Karny Artistic Blacksmith'
    : 'O nas - Tadeusz Karny Kowalstwo Artystyczne'
  const descriptionFallback = language === 'en'
    ? 'Learn about our artistic blacksmithing workshop specializing in high-quality custom metalwork.'
    : 'Poznaj naszą pracownię kowalstwa artystycznego specjalizującą się w wysokiej jakości wyrobach metalowych.'
    
  // Use translation with appropriate fallbacks
  const title = t('about.title', titleFallback)
  const description = t('about.description', descriptionFallback)
  
  return (
    <>
      <EnhancedSEO
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
