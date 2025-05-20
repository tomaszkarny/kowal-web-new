import React from 'react'
import { graphql } from 'gatsby'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { EnhancedSEO } from 'components/SEO/EnhancedSEO'

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
const NotFoundPage = ({ pageContext }) => {
  const { t } = useTranslation()
  // Get language from pageContext instead of useI18next
  const language = pageContext?.language || 'pl'
  
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

export default NotFoundPage;

// SEO Metadata for the 404 page - z SEO-przyjaznym tytułem
export const Head = ({ location, pageContext }) => {
  const { t } = useTranslation('common');
  // Get language from pageContext instead of useI18next
  const language = pageContext?.language || 'pl';
  
  // Użyj SEO-przyjaznego tytułu zamiast "Page Not Found"
  // To zapobiegnie problemom z indeksacją Google i migotaniem tytułu 404
  const seoTitle = language === 'en' 
    ? 'Kowalstwo Artystyczne - Tadeusz Karny' 
    : 'Kowalstwo Artystyczne - Tadeusz Karny';
    
  const descriptionFallback = language === 'en'
    ? "The page you're looking for is currently unavailable. Please use navigation menu."
    : 'Strona której szukasz jest aktualnie niedostępna. Skorzystaj z menu nawigacyjnego.';

  return (
    <EnhancedSEO
      title={seoTitle}
      description={descriptionFallback}
      pathname={location.pathname}
      pageType="other" // zmiana z "error" na "other" dla lepszej indeksacji
      noindex={true} // prevent indexing of 404 page
    />
  );
};

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
