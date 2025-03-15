import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
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

  return (
    <StyledSection>
      <NotFoundWrapper>
        <SectionTitle main>
          {t('notFoundTitle', 'Strona nie znaleziona')}
        </SectionTitle>
        <SectionDescription>
          {t('notFoundMessage', 'Przepraszamy, strona której szukasz nie istnieje.')}
        </SectionDescription>
        <Link to="/" primary text={t('goHome', 'Wróć do strony głównej')} />
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
