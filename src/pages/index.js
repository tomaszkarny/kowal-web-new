import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { SECTION_IDS } from 'consts/sectionID'
import { BUSINESS_NAME, BUSINESS_DESCRIPTION, WEBSITE_URL } from 'consts/contactDetails'

const IndexPage = () => {
  return (
    <Layout>
      <Hero />
      <SectionMain id={SECTION_IDS.MAIN} />
    </Layout>
  )
}

export default IndexPage

/**
 * Implement Gatsby Head API for the homepage
 * This includes both standard SEO tags and LocalBusiness schema
 */
export const Head = ({ data, location }) => {
  const { t } = useTranslation('seo')
  const title = t('home.title', BUSINESS_NAME)
  const description = t('home.description', BUSINESS_DESCRIPTION)
  
  return (
    <>
      <EnhancedSEO
        title={title}
        description={description}
        pathname={location.pathname}
      />
      <LocalBusinessSchema 
        url={WEBSITE_URL}
        title={title}
        description={description}
        pathname={location.pathname}
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
