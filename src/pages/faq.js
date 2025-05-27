import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql } from 'gatsby'
import { Layout } from 'components/Layout/Layout'
import { ContentContainer as Container } from 'components/common/Container/Container.styles'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { PageSEO } from 'components/SEO/EnhancedSEO'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import styled from '@emotion/styled'

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`

const FAQItem = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGray};
  padding-bottom: 2rem;

  &:last-child {
    border-bottom: none;
  }
`

const Question = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.color.primary};
  line-height: 1.4;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    font-size: 1.25rem;
  }
`

const Answer = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.color.gray};
  
  p {
    margin-bottom: 1rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`

function FAQPage() {
  const { t } = useTranslation()
  
  const faqItems = t('seo:faq.items', { returnObjects: true, defaultValue: [] })

  return (
    <Layout>
      <StyledSection>
        <Container>
          <SectionTitle>{t('common:faq')}</SectionTitle>
          <FAQContainer>
            {Array.isArray(faqItems) && faqItems.map((item) => (
              <FAQItem key={item.question}>
                <Question>{item.question}</Question>
                <Answer>
                  <p>{item.answer}</p>
                </Answer>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </StyledSection>
    </Layout>
  )
}

export default FAQPage

export function Head({ location, pageContext }) {
  const language = pageContext?.language || 'pl'
  
  return (
    <>
      <PageSEO
        title={language === 'pl' ? 'Najczęściej zadawane pytania - FAQ' : 'Frequently Asked Questions - FAQ'}
        description={language === 'pl' 
          ? 'Odpowiedzi na najczęściej zadawane pytania o kowalstwo artystyczne, bramy kute, balustrady i ogrodzenia. Cennik, terminy realizacji, montaż.'
          : 'Answers to frequently asked questions about artistic blacksmithing, wrought iron gates, railings and fences. Pricing, lead times, installation.'}
        pageType="faq"
        pathname={location.pathname}
        language={language}
      />
      <FAQSchema language={language} pathname={location.pathname} />
      <LocalBusinessSchema language={language} />
      <BreadcrumbSchema 
        pathname={location.pathname}
        language={language}
      />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
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