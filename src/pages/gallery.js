import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { detectLanguageForSEO, getSEOTranslations } from 'utils/seoLanguageDetection'

import { WEBSITE_URL } from 'consts/contactDetails'
import { getFAQData } from 'utils/faqData'

function GalleryPageTemplate() {
  const { t } = useTranslation('common')
  return (
    <Layout>
      <StyledSection>
        <SectionTitle>{t('gallery_title', 'Nasze przykładowe prace')}</SectionTitle>
        <GalleryPage />
      </StyledSection>
    </Layout>
  )
}

/**
 * Implement Gatsby Head API for the gallery page
 * This includes both standard SEO tags and BreadcrumbList schema
 */
export function Head({ location, pageContext }) {
  // Detect language using our centralized utility
  const language = detectLanguageForSEO(pageContext, location);
  
  // Get SEO translations directly (safer than using hooks in Head API)
  const seoTranslations = getSEOTranslations(language, 'gallery');

  return (
    <>
      <EnhancedSEO
        key={`seo-${language}-gallery`}
        title={seoTranslations.pageTitle}
        description={seoTranslations.pageDescription}
        pathname={location.pathname}
        pageType="gallery"
        language={language} // Explicitly pass language
        noindex={false}
      />
      <BreadcrumbSchema
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
        language={language}
      />
      <FAQSchema 
        faqData={getFAQData(language, 'gallery')}
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export default GalleryPageTemplate

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
