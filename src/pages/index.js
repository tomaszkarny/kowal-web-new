import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'react-i18next'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { detectLanguageForSEO, getSEOTranslations } from 'utils/seoLanguageDetection'

import { SECTION_IDS } from 'consts/sectionID'
import { BUSINESS_NAME_ML, BUSINESS_DESCRIPTION, WEBSITE_URL } from 'consts/contactDetails' // Switched to BUSINESS_NAME_ML for title
import { getFAQData } from 'utils/faqData'

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
export const Head = ({ data, location, pageContext }) => {
  // Detect language using our centralized utility
  const language = detectLanguageForSEO(pageContext, location);
  
  // Get SEO translations directly (safer than using hooks in Head API)
  const seoTranslations = getSEOTranslations(language, 'home');
  
  return (
    <>
      <EnhancedSEO
        key={`seo-${language}-home`}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        pageType="home"
        language={language} // Explicitly pass language
        noindex={false}
      />
      <LocalBusinessSchema 
        url={WEBSITE_URL}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        language={language}
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={WEBSITE_URL}
        language={language}
      />
      <FAQSchema 
        faqData={getFAQData(language, 'home')}
        pathname={location.pathname}
        language={language}
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
