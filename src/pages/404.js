import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { useI18next } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'

// Import common components
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { Link } from 'components/common/Link/Link'

// Styled components for the 404 page
const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  min-height: 60vh;
`

/**
 * NotFoundPage component - Custom 404 page
 * Automatically used by Gatsby for 404 errors
 */
const NotFoundPage = () => {
  const { t } = useTranslation()
  const { language } = useI18next()
  
  // Create language-dependent fallbacks
  const titleFallback = language === 'en' ? 'Page Not Found' : 'Strona nie znaleziona'
  const messageFallback = language === 'en'
    ? "Sorry, the page you're looking for doesn't exist."
    : 'Przepraszamy, strona której szukasz nie istnieje.'
  const homeLinkFallback = language === 'en' ? 'Return to Homepage' : 'Wróć do strony głównej'

  return (
    <StyledSection>
      <NotFoundWrapper>
        <SectionTitle main>
          {t('notFoundTitle', titleFallback)}
        </SectionTitle>
        <SectionDescription>
          {t('notFoundMessage', messageFallback)}
        </SectionDescription>
        <Link to="/" primary text={t('goHome', homeLinkFallback)} />
      </NotFoundWrapper>
    </StyledSection>
  )
}

export default NotFoundPage

// Required for i18n support
export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
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
