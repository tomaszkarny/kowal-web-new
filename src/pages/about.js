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
  const { t } = useTranslation('seo')
  const title = t('about.title', 'About Us - ' + BUSINESS_NAME)
  const description = t('about.description', 'Learn about our artistic blacksmithing workshop specializing in high-quality custom metalwork with over 20 years of experience.')
  
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
