import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'

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
