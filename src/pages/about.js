import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { About } from 'components/About/About'
import { Layout } from 'components/Layout/Layout'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { detectLanguageForSEO, getSEOTranslations } from 'utils/seoLanguageDetection'

import { BUSINESS_NAME_ML, WEBSITE_URL } from 'consts/contactDetails'; // Switched to BUSINESS_NAME_ML
import { getFAQData } from 'utils/faqData'

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
export const Head = ({ data, location, pageContext }) => {
  // Detect language using our centralized utility
  const language = detectLanguageForSEO(pageContext, location);
  
  // Get SEO translations directly (safer than using hooks in Head API)
  const seoTranslations = getSEOTranslations(language, 'about');
  
  return (
    <>
      <EnhancedSEO
        key={`seo-${language}-about`}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        pageType="about"
        language={language} // Explicitly pass language
        noindex={false}
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
        language={language}
      />
      <FAQSchema 
        faqData={getFAQData(language, 'about')}
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
