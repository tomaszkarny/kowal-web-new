import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { buildLanguagePath } from 'consts/languageConfig'
import { useActualLanguage } from 'hooks/useActualLanguage'
import { CityCtaButton } from 'components/Cities/CtaButton'
import {
  FORGE_COLORS,
  CitySection,
  CityContainer,
  CityTitle,
  CityCardTitle,
} from '../styles'
import {
  ServicesGrid,
  ServiceCard,
  ServiceDescription,
  ServiceFeatures,
  FeatureItem,
  CTASection,
  CTATitle,
  CTAText,
} from './CityServiceOfferings.styles'

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
