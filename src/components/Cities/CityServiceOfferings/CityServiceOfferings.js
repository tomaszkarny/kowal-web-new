import React from 'react'
import styled from '@emotion/styled'
import { buildLanguagePath } from 'consts/languageConfig'
import { useActualLanguage } from 'hooks/useActualLanguage'
import { CityCtaButton } from 'components/Cities/CtaButton'
import {
  FORGE_COLORS,
  FORGE_RADIUS,
  CitySection,
  CityContainer,
  CityTitle,
  CityCard,
  CityCardTitle,
} from '../styles'

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 1.8vw, 2.25rem);
  margin-bottom: 3rem;
`

const ServiceCard = styled(CityCard)`
  padding: 2rem;
`

const ServiceDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  color: ${FORGE_COLORS.textSecondary};
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '\u2713';
    position: absolute;
    left: 0;
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`

const CTASection = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${FORGE_COLORS.sectionBg};
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  border-top: 3px solid ${FORGE_COLORS.iron};
  margin-top: 3rem;
`

const CTATitle = styled.h3`
  font-size: 1.8rem;
  color: ${FORGE_COLORS.iron};
  margin-bottom: 1rem;
  font-family: 'Merriweather', serif;
`

const CTAText = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`

export function CityServiceOfferings({ city, language, pathname }) {
  const actualLanguage = useActualLanguage(pathname)
  
  const services = actualLanguage === 'pl' ? [
    {
      title: `Ogrodzenia na Zamówienie ${city.name[actualLanguage]}`,
      description: `Projektujemy i wykonujemy ogrodzenia kute na zamówienie dla klientów z ${city.name[actualLanguage]} i okolic. Każde ogrodzenie jest tworzone według indywidualnego projektu.`,
      features: [
        'Indywidualne projekty ogrodzeń',
        'Różnorodne wzory i style',
        'Ogrodzenia pełne i ażurowe',
        'Zabezpieczenie antykorozyjne',
        '5 lat gwarancji'
      ]
    },
    {
      title: `Bramy Kute na Zamówienie ${city.name[actualLanguage]}`,
      description: `Specjalizujemy się w bramach kutych na zamówienie. Oferujemy bramy wjazdowe, przesuwne i dwuskrzydłowe dla domów w ${city.name[actualLanguage]}.`,
      features: [
        'Bramy dwuskrzydłowe i przesuwne',
        'Automatyka bramowa',
        'Wzory klasyczne i nowoczesne',
        'Montaż i serwis',
        'Dostawa w całym regionie'
      ]
    },
    {
      title: `Balustrady na Zamówienie ${city.name[actualLanguage]}`,
      description: `Wykonujemy balustrady na zamówienie - wewnętrzne i zewnętrzne. Idealne dla domów i firm w ${city.name[actualLanguage]}.`,
      features: [
        'Balustrady schodowe',
        'Balustrady balkonowe',
        'Balustrady tarasowe',
        'Stal nierdzewna i kuta',
        'Montaż w 24h'
      ]
    }
  ] : [
    {
      title: `Custom Fences ${city.name[actualLanguage]}`,
      description: `We design and create custom wrought iron fences for clients from ${city.name[actualLanguage]} and surrounding areas. Each fence is made according to individual design.`,
      features: [
        'Individual fence designs',
        'Various patterns and styles',
        'Full and openwork fences',
        'Anti-corrosion protection',
        '5-year warranty'
      ]
    },
    {
      title: `Custom Wrought Iron Gates ${city.name[actualLanguage]}`,
      description: `We specialize in custom wrought iron gates. We offer driveway, sliding and double-leaf gates for homes in ${city.name[actualLanguage]}.`,
      features: [
        'Double-leaf and sliding gates',
        'Gate automation',
        'Classic and modern designs',
        'Installation and service',
        'Regional delivery'
      ]
    },
    {
      title: `Custom Railings ${city.name[actualLanguage]}`,
      description: `We create custom railings - interior and exterior. Perfect for homes and businesses in ${city.name[actualLanguage]}.`,
      features: [
        'Stair railings',
        'Balcony railings',
        'Terrace railings',
        'Stainless and wrought steel',
        '24h installation'
      ]
    }
  ]

  const mainTitle = actualLanguage === 'pl' 
    ? `Kowalstwo Artystyczne na Zamówienie w ${city.name[actualLanguage]}`
    : `Custom Artistic Blacksmithing in ${city.name[actualLanguage]}`

  const ctaTitle = actualLanguage === 'pl'
    ? `Szukasz Kowala w ${city.name[actualLanguage]}?`
    : `Looking for a Blacksmith in ${city.name[actualLanguage]}?`

  const ctaText = actualLanguage === 'pl'
    ? `Skontaktuj się z nami już dziś i otrzymaj darmową wycenę na ogrodzenia, bramy i balustrady na zamówienie.`
    : `Contact us today and get a free quote for custom fences, gates and railings.`

  const ctaButtonText = actualLanguage === 'pl' ? 'Zamów Darmową Wycenę' : 'Get Free Quote'

  return (
    <CitySection $bg={FORGE_COLORS.white}>
      <CityContainer $maxWidth="1280px">
        <CityTitle $size="lg" $mb="3rem">{mainTitle}</CityTitle>

        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <CityCardTitle>{service.title}</CityCardTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <FeatureItem key={idx}>{feature}</FeatureItem>
                ))}
              </ServiceFeatures>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <CTASection>
          <CTATitle>{ctaTitle}</CTATitle>
          <CTAText>{ctaText}</CTAText>
          <CityCtaButton
            as="a"
            href={buildLanguagePath('/contact/', actualLanguage)}
          >
            {ctaButtonText}
          </CityCtaButton>
        </CTASection>
      </CityContainer>
    </CitySection>
  )
}
