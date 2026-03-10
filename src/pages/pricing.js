import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { Layout } from 'components/Layout/Layout'
import { ContentContainer as Container } from 'components/common/Container/Container.styles'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { PageSEO } from 'components/SEO/EnhancedSEO'
import { FAQSchema } from 'components/SEO/FAQSchema'
import { BreadcrumbSchema } from 'components/SEO/BreadcrumbSchema'
import { LocalBusinessSchema } from 'components/Contact/LocalBusinessSchema'
import { mq } from 'utils/mediaQueries'

// Import translations directly for Head component (hooks not available in Head)
import cennikTranslationsPL from '../../locales/pl/cennik.json'
import cennikTranslationsEN from '../../locales/en/cennik.json'

const PriceTable = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  line-height: 1.5;

  th {
    background-color: ${({ theme }) => theme?.color?.primary || '#e85c41'};
    color: #fff;
    padding: 0.75rem 1rem;
    text-align: left;
    font-weight: 600;
  }

  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid
      ${({ theme }) => theme?.color?.lightGray || '#e5e5e5'};
    color: ${({ theme }) => theme?.color?.gray || '#555'};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:nth-of-type(even) td {
    background-color: ${({ theme }) =>
      theme?.color?.lightBackground || '#f9f9f9'};
  }

  ${mq('tablet')} {
    font-size: 1.05rem;
  }
`

const FactorsSection = styled.div`
  margin: 3rem 0;
`

const FactorsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 0;
  display: grid;
  gap: 1.5rem;

  ${mq('tablet')} {
    grid-template-columns: 1fr 1fr;
  }
`

const FactorItem = styled.li`
  background: ${({ theme }) => theme?.color?.lightBackground || '#f9f9f9'};
  border-left: 4px solid ${({ theme }) => theme?.color?.primary || '#e85c41'};
  padding: 1.25rem 1.5rem;
  border-radius: 0 4px 4px 0;
`

const FactorTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme?.color?.primary || '#e85c41'};
`

const FactorText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  color: ${({ theme }) => theme?.color?.gray || '#555'};
`

const CTABox = styled.div`
  background-color: ${({ theme }) => theme?.color?.primary || '#e85c41'};
  color: #fff;
  border-radius: 8px;
  padding: 2rem 2rem;
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  ${mq('tablet')} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const CTAText = styled.div`
  flex: 1;

  h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem;
    color: #fff;
  }

  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.9;
  }
`

const CTAActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${mq('small')} {
    flex-direction: row;
  }
`

const CTAPhoneLink = styled.a`
  display: inline-block;
  background: #fff;
  color: ${({ theme }) => theme?.color?.primary || '#e85c41'};
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.65rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: #f0f0f0;
  }
`

const CTAContactLink = styled(Link)`
  display: inline-block;
  background: transparent;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.65rem 1.5rem;
  border-radius: 4px;
  border: 2px solid #fff;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`

const FAQSection = styled.div`
  margin: 3rem 0;
`

const FAQItem = styled.div`
  margin-bottom: 1.75rem;
  border-bottom: 1px solid
    ${({ theme }) => theme?.color?.lightGray || '#e5e5e5'};
  padding-bottom: 1.75rem;

  &:last-child {
    border-bottom: none;
  }
`

const FAQQuestion = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: ${({ theme }) => theme?.color?.primary || '#e85c41'};
  line-height: 1.4;
`

const FAQAnswer = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme?.color?.gray || '#555'};
  margin: 0;
`

const Intro = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme?.color?.gray || '#555'};
  max-width: 800px;
  margin: 0 0 2rem;
`

function CennikPage({ pageContext }) {
  const { t } = useTranslation('cennik')
  const language = pageContext?.i18n?.language || pageContext?.language || 'pl'

  const priceItems = t('items', { returnObjects: true, defaultValue: [] })
  const factorItems = t('factors.items', {
    returnObjects: true,
    defaultValue: [],
  })
  const faqItems = t('faq.items', { returnObjects: true, defaultValue: [] })

  return (
    <Layout>
      <StyledSection>
        <Container>
          <SectionTitle as="h1">{t('h1')}</SectionTitle>
          <Intro>{t('intro')}</Intro>

          <h2>{t('tableTitle')}</h2>
          <PriceTable>
            <Table>
              <thead>
                <tr>
                  <th scope="col">{t('tableHeaders.service')}</th>
                  <th scope="col">{t('tableHeaders.price')}</th>
                  <th scope="col">{t('tableHeaders.notes')}</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(priceItems) &&
                  priceItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.service}</td>
                      <td>
                        <strong>{item.price}</strong>
                      </td>
                      <td>{item.notes}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </PriceTable>

          <FactorsSection>
            <h2>{t('factors.title')}</h2>
            <p>{t('factors.intro')}</p>
            <FactorsList>
              {Array.isArray(factorItems) &&
                factorItems.map((item, index) => (
                  <FactorItem key={index}>
                    <FactorTitle>{item.title}</FactorTitle>
                    <FactorText>{item.description}</FactorText>
                  </FactorItem>
                ))}
            </FactorsList>
          </FactorsSection>

          <CTABox>
            <CTAText>
              <h2>{t('cta.title')}</h2>
              <p>{t('cta.description')}</p>
            </CTAText>
            <CTAActions>
              <CTAPhoneLink href={`tel:${t('cta.phone')}`}>
                {t('cta.phoneLabel')}: {t('cta.phone')}
              </CTAPhoneLink>
              <CTAContactLink
                to={language === 'en' ? '/en/contact/' : '/contact/'}
              >
                {t('cta.contactLink')}
              </CTAContactLink>
            </CTAActions>
          </CTABox>

          <FAQSection>
            <h2>{t('faq.title')}</h2>
            {Array.isArray(faqItems) &&
              faqItems.map((item, index) => (
                <FAQItem key={index}>
                  <FAQQuestion>{item.question}</FAQQuestion>
                  <FAQAnswer>{item.answer}</FAQAnswer>
                </FAQItem>
              ))}
          </FAQSection>
        </Container>
      </StyledSection>
    </Layout>
  )
}

export default CennikPage

export function Head({ location, pageContext }) {
  const language = pageContext?.i18n?.language || pageContext?.language || 'pl'
  const translations =
    language === 'pl' ? cennikTranslationsPL : cennikTranslationsEN

  const seoTitle =
    language === 'pl'
      ? 'Cennik Kowalstwa Artystycznego \u2b50 Bramy, Balustrady, Ogrodzenia'
      : 'Artistic Blacksmithing Pricing \u2b50 Gates, Railings, Fences'
  const seoDescription =
    language === 'pl'
      ? 'Cennik us\u0142ug kowalskich: bramy kute od 3000 z\u0142/m\u00b2, balustrady od 800 z\u0142/mb, ogrodzenia od 600 z\u0142/mb. Darmowa wycena \u2713 Monta\u017c w cenie \u260e 604 253 145'
      : 'Wrought iron pricing guide: gates from 3000 PLN/m\u00b2, railings from 800 PLN/lm, fences from 600 PLN/lm. Free quote \u2713 Installation included \u260e 604 253 145'

  return (
    <>
      <PageSEO
        title={seoTitle}
        description={seoDescription}
        pageType="other"
        pathname={location.pathname}
        language={language}
      />
      <FAQSchema
        faqData={translations.faq?.items || []}
        language={language}
        pathname={location.pathname}
      />
      <LocalBusinessSchema language={language} />
      <BreadcrumbSchema pathname={location.pathname} language={language} />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
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
