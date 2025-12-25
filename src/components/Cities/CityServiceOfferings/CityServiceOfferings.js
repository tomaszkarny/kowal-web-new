import React from 'react'
import styled from '@emotion/styled'
import { useTranslation } from 'gatsby-plugin-react-i18next'
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
  const { t } = useTranslation('cities')
  const actualLanguage = useActualLanguage(pathname)

  const cityName = city.name[actualLanguage]
  const templateData = { city: cityName }

  // Get services from translations
  const servicesData = t('cityPage.serviceOfferings.items', { returnObjects: true })
  const services = Array.isArray(servicesData)
    ? servicesData.map(service => ({
        title: service.titleTemplate.replace('{{city}}', cityName),
        description: service.descriptionTemplate.replace('{{city}}', cityName),
        features: service.features,
      }))
    : []

  const mainTitle = t('cityPage.serviceOfferings.mainTitle', templateData)
  const ctaTitle = t('cityPage.serviceOfferings.cta.title', templateData)
  const ctaText = t('cityPage.serviceOfferings.cta.text')
  const ctaButtonText = t('cityPage.serviceOfferings.cta.buttonText')

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
