import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { PageDescription } from 'components/common/PageDescription'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'
import { detectLanguageForSEO, getSEOTranslations } from 'utils/seoLanguageDetection'

import { WEBSITE_URL } from 'consts/contactDetails'
import { getFAQData } from 'utils/faqData'

import {
  CategorySectionWrapper,
  CategorySectionTitle,
  CategoryGrid,
  CategoryCard,
  CategoryName,
  CategoryDescription,
  CategoryCount,
} from 'components/GalleryPage/GalleryCategorySection.styles'

const CATEGORIES = [
  { key: 'gates', path: '/gallery/wrought-iron-gates/' },
  { key: 'balustrades', path: '/gallery/wrought-iron-railings/' },
  { key: 'fences', path: '/gallery/wrought-iron-fences/' },
]

function GalleryPageTemplate() {
  const { t, i18n } = useTranslation(['common', 'gallery'])
  const langPrefix = i18n.language === 'en' ? '/en' : ''

  return (
    <Layout>
      <StyledSection>
        <SectionTitle>{t('common:gallery_title', 'Nasze przykładowe prace')}</SectionTitle>
        {/* Intro section for SEO - adds unique text content */}
        <PageDescription>
          {t('gallery:intro.description')}
        </PageDescription>
        {/* Category browsing section with internal links to subpages */}
        <CategorySectionWrapper>
          <CategorySectionTitle>
            {t('gallery:categorySection.title')}
          </CategorySectionTitle>
          <CategoryGrid>
            {CATEGORIES.map(({ key, path }) => (
              <CategoryCard key={key} to={`${langPrefix}${path}`}>
                <CategoryName>
                  {t(`gallery:categorySection.${key}.name`)}
                </CategoryName>
                <CategoryDescription>
                  {t(`gallery:categorySection.${key}.description`)}
                </CategoryDescription>
                <CategoryCount>
                  {t(`gallery:categorySection.${key}.count`)}
                </CategoryCount>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </CategorySectionWrapper>
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
