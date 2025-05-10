import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

import { BUSINESS_NAME, WEBSITE_URL } from 'consts/contactDetails'

const GalleryPageTemplate = () => {
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
export const Head = ({ data, location }) => {
  const { t } = useTranslation('seo')
  const title = t('gallery.title', 'Gallery - ' + BUSINESS_NAME)
  const description = t('gallery.description', 'View our collection of custom metalwork projects including decorative and functional pieces made by our artistic blacksmithing workshop.')
  
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
