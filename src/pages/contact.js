import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Contact } from 'components/Contact/Contact'
import { Layout } from 'components/Layout/Layout'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { detectLanguageForSEO, getSEOTranslations } from 'utils/seoLanguageDetection'

import { BUSINESS_NAME_ML, BUSINESS_DESCRIPTION_ML, WEBSITE_URL } from 'consts/contactDetails'; // Switched to BUSINESS_NAME_ML and BUSINESS_DESCRIPTION_ML
import { getFAQData } from 'utils/faqData'

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
export const Head = ({ data, location, pageContext }) => {
  // Detect language using our centralized utility
  const language = detectLanguageForSEO(pageContext, location);
  
  // Get SEO translations directly (safer than using hooks in Head API)
  const seoTranslations = getSEOTranslations(language, 'contact');
  
  return (
    <>
      <EnhancedSEO
        key={`seo-${language}-contact`}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        pageType="contact"
        language={language} // Explicitly pass language
        noindex={false}
      />
      <LocalBusinessSchema 
        url={`${WEBSITE_URL}${location.pathname}`}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        language={language}
      />
      <BreadcrumbSchema 
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
        language={language}
      />
      <FAQSchema 
        faqData={getFAQData(language, 'contact')}
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
