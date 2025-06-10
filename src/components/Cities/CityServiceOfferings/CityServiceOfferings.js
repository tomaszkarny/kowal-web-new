import React from 'react'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { buildLanguagePath, getLanguageFromPath } from 'consts/languageConfig'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  background: '#f8f9fa',
  white: '#ffffff'
}

const OfferingsSection = styled.section`
  padding: 4rem 0;
  background: ${COLORS.white};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 3rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`

const ServiceCard = styled.div`
  background: ${COLORS.background};
  padding: 2rem;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${COLORS.primary};
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-weight: bold;
`

const ServiceDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  color: ${COLORS.textSecondary};
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: ${COLORS.primary};
    font-weight: bold;
  }
`

const CTASection = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${COLORS.background};
  border-radius: 8px;
  margin-top: 3rem;
`

const CTATitle = styled.h3`
  font-size: 1.8rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
`

const CTAText = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`

const CTAButton = styled.a`
  display: inline-block;
  background: ${COLORS.primary};
  color: ${COLORS.white};
  padding: 1rem 2rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${COLORS.dark};
    transform: translateY(-2px);
  }
`

export function CityServiceOfferings({ city, language, pathname }) {
  // Get current path for language detection - use pathname prop during SSR
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : (pathname || '/')
  // Use URL-based language detection instead of prop
  const actualLanguage = getLanguageFromPath(currentPath)
  
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
    <OfferingsSection>
      <Container>
        <Title>{mainTitle}</Title>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceTitle>{service.title}</ServiceTitle>
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
          <CTAButton href={actualLanguage === 'en' ? '/en/contact/' : '/contact/'}>
            {ctaButtonText}
          </CTAButton>
        </CTASection>
      </Container>
    </OfferingsSection>
  )
}