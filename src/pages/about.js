import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

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
  // Explicitly use the seo namespace for titles and descriptions
  const { t, ready, i18n } = useTranslation('seo')
  // Log the current language to help with debugging
  console.log('Current language in about.js Head:', i18n.language)
  // Explicitly request the key using the full path
  const title = t('about.title', 'O nas - ' + BUSINESS_NAME)
  const description = t('about.description', 'Poznaj naszą pracownię kowalstwa artystycznego.')
  
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
