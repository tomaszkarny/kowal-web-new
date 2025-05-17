import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
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
  const { language } = useI18next()
  const titleFallback = language === 'en'
    ? 'Tadeusz Karny Artistic Blacksmith'
    : 'Tadeusz Karny Kowalstwo Artystyczne'
  const descriptionFallback = language === 'en'
    ? 'Custom-made metal gates, railings, fences, and decorative elements with over 20 years of experience.'
    : 'Wykonane na zamówienie bramy, balustrady, ogrodzenia i elementy dekoracyjne z ponad 20-letnim doświadczeniem.'
  const title = t('home.title', titleFallback)
  const description = t('home.description', descriptionFallback)
  
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
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={WEBSITE_URL}
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
