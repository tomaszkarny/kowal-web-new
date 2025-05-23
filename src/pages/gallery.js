import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME_ML, WEBSITE_URL } from 'consts/contactDetails' // Import BUSINESS_NAME_ML

const GalleryPageTemplate = ({ pageContext }) => { // Destructure pageContext
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
export const Head = ({ data, location, pageContext }) => { // Receive pageContext
  const { language } = pageContext; // Use language from pageContext
  const { t } = useTranslation('seo');

  const titleFallback = language === 'en' ? 'Gallery' : 'Galeria'; // Simplified to just the page name

  const descriptionFallback = language === 'en'
    ? 'View our collection of custom metalwork projects including decorative and functional pieces made by our artistic blacksmithing workshop.'
    : 'Zobacz nasze portfolio bram, balustrad, ogrodzeń oraz elementów dekoracyjnych wykonanych przez naszą pracownię.';

  // t() should now work correctly with the language from useI18next
  const translatedTitleFromSeo = t('gallery.title'); 

  const finalTitleToPass = translatedTitleFromSeo && translatedTitleFromSeo !== 'gallery.title' ? translatedTitleFromSeo : titleFallback;


  const description = t('gallery.description', descriptionFallback);

  return (
    <>
      <EnhancedSEO
        title={finalTitleToPass}
        description={description}
        pathname={location.pathname}
        pageType="gallery" // Added pageType
        noindex={false}
      />
      <BreadcrumbSchema
        pathname={location.pathname}
        url={`${WEBSITE_URL}${location.pathname}`}
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
