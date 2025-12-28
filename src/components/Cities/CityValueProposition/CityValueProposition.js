import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FREE_DELIVERY_RADIUS } from 'utils/cityDistanceCalculator'
import { FORGE_COLORS } from '../styles'

import {
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  CardsGrid,
  ValueCard,
  CardIconWrapper,
  CardTitle,
  CardContent,
  DeliveryGrid,
  DeliveryMetric,
  DeliveryNote,
  QualityList,
  QualityItem,
  CheckIcon,
  ProcessSection,
  ProcessTitle,
  ProcessSteps,
  ProcessStep,
  StepNumber,
  StepInfo,
  StepTitle,
  StepDescription,
  WhyUsSection,
  WhyUsHeader,
  WhyUsIcon,
  WhyUsTitle,
  BenefitsGrid,
  BenefitItem,
  BenefitCheck,
  BenefitText,
} from './CityValueProposition.styles'

// Alias for backward compatibility
const COLORS = FORGE_COLORS

// ═══════════════════════════════════════════════════════════════════════════
// ELEGANT OUTLINE ICONS - Hand-crafted for the Forged Iron aesthetic
// Thin, precise strokes that feel artisan-made, not machine-generated
// ═══════════════════════════════════════════════════════════════════════════

// Delivery truck - elegant silhouette with refined details
const DeliveryIcon = () => (
  <svg viewBox="0 0 24 24">
    {/* Truck body - main cargo area */}
    <path d="M2 5.5h12v10H2z" />
    {/* Cab section with window */}
    <path d="M14 9h4l2.5 3.5V15.5h-6.5" />
    {/* Cab window detail */}
    <path d="M15 9.5v3h3" />
    {/* Wheels with refined circles */}
    <circle cx="5.5" cy="16.5" r="2" />
    <circle cx="17.5" cy="16.5" r="2" />
    {/* Wheel hubs - delicate center detail */}
    <circle cx="5.5" cy="16.5" r="0.5" />
    <circle cx="17.5" cy="16.5" r="0.5" />
    {/* Ground line - subtle base */}
    <path d="M1 18.5h22" strokeDasharray="2 2" opacity="0.4" />
  </svg>
)

// Shield with star - quality guarantee emblem
const QualityIcon = () => (
  <svg viewBox="0 0 24 24">
    {/* Shield outline - flowing protective form */}
    <path d="M12 2.5L3.5 6v5.5c0 5.25 3.75 10.15 8.5 11.5 4.75-1.35 8.5-6.25 8.5-11.5V6L12 2.5z" />
    {/* Inner shield detail line */}
    <path d="M12 4.5L5.5 7v4.5c0 4.2 2.9 8.1 6.5 9.3" opacity="0.5" />
    {/* Central star - 5-pointed, hand-drawn feel */}
    <path d="M12 7l1.2 2.5 2.8.4-2 2 .5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-2 2.8-.4L12 7z" />
  </svg>
)

// Location pin with radiating rings - service area reach
const RadiusIcon = () => (
  <svg viewBox="0 0 24 24">
    {/* Pin body - elegant teardrop form */}
    <path d="M12 2C8.4 2 5.5 4.9 5.5 8.5c0 4.8 6.5 11.5 6.5 11.5s6.5-6.7 6.5-11.5C18.5 4.9 15.6 2 12 2z" />
    {/* Inner circle - the focal point */}
    <circle cx="12" cy="8.5" r="2.5" />
    {/* Radiating service rings - showing reach */}
    <circle cx="12" cy="12" r="7" opacity="0.3" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="10" opacity="0.15" strokeDasharray="2 3" />
  </svg>
)

// Checkmark with decorative flourish - refined confirmation
const CheckmarkIcon = () => (
  <svg viewBox="0 0 24 24">
    {/* Outer ring - elegant circle */}
    <circle cx="12" cy="12" r="9" />
    {/* Checkmark - flowing, confident stroke */}
    <path d="M7.5 12.5l3 3 6-7" />
    {/* Subtle inner glow ring */}
    <circle cx="12" cy="12" r="6.5" opacity="0.25" strokeDasharray="1 2" />
  </svg>
)

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CityValueProposition({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  // Calculate delivery cost
  const isFreeDelivery = city.distance <= FREE_DELIVERY_RADIUS
  const deliveryCost = isFreeDelivery ? 0 : Math.round((city.distance - FREE_DELIVERY_RADIUS) * 2.5)

  const cityName = city.name[language]
  const title = t('cityPage.valueProposition.titleTemplate', { city: cityName })
  const subtitle = t('cityPage.valueProposition.subtitle')

  // Get process steps from translations
  const stepsData = t('cityPage.valueProposition.process.steps', { returnObjects: true })
  const processSteps = Array.isArray(stepsData)
    ? stepsData.map((step, index) => ({
        num: index + 1,
        title: step.title,
        desc: step.description,
      }))
    : []

  // Get benefits from translations
  const benefits = t('cityPage.valueProposition.whyUs.benefits', { returnObjects: true }) || []

  return (
    <Section>
      <Container>
        <SectionTitle>{title}</SectionTitle>
        <SectionSubtitle>{subtitle}</SectionSubtitle>

        {/* Value Cards */}
        <CardsGrid>
          {/* Delivery Card */}
          <ValueCard>
            <CardIconWrapper>
              <DeliveryIcon />
            </CardIconWrapper>
            <CardTitle>
              {t('cityPage.valueProposition.cards.delivery.title')}
            </CardTitle>
            <CardContent>
              <DeliveryGrid>
                <DeliveryMetric $highlight={isFreeDelivery}>
                  <strong>{t('cityPage.valueProposition.cards.delivery.costLabel')}</strong>
                  <span>{isFreeDelivery ? t('cityPage.valueProposition.cards.delivery.free') : `${deliveryCost} zł`}</span>
                </DeliveryMetric>
                <DeliveryMetric>
                  <strong>{t('cityPage.valueProposition.cards.delivery.travelTimeLabel')}</strong>
                  <span>{city.travelTime[language]}</span>
                </DeliveryMetric>
              </DeliveryGrid>
              <DeliveryNote>
                {t('cityPage.valueProposition.cards.delivery.freeDeliveryNote', { radius: FREE_DELIVERY_RADIUS })}
              </DeliveryNote>
            </CardContent>
          </ValueCard>

          {/* Quality Card */}
          <ValueCard>
            <CardIconWrapper>
              <QualityIcon />
            </CardIconWrapper>
            <CardTitle>
              {t('cityPage.valueProposition.cards.quality.title')}
            </CardTitle>
            <CardContent>
              <QualityList>
                <QualityItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>{t('cityPage.valueProposition.cards.quality.warranty')}</span>
                </QualityItem>
                <QualityItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>{t('cityPage.valueProposition.cards.quality.steel')}</span>
                </QualityItem>
                <QualityItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>{t('cityPage.valueProposition.cards.quality.certificates')}</span>
                </QualityItem>
                <QualityItem>
                  <CheckIcon>✓</CheckIcon>
                  <span>{t('cityPage.valueProposition.cards.quality.craftsmanship')}</span>
                </QualityItem>
              </QualityList>
            </CardContent>
          </ValueCard>

          {/* Service Area Card */}
          <ValueCard>
            <CardIconWrapper>
              <RadiusIcon />
            </CardIconWrapper>
            <CardTitle>
              {t('cityPage.valueProposition.cards.serviceArea.title')}
            </CardTitle>
            <CardContent>
              <p style={{ marginBottom: '0.75rem' }}>
                {t('cityPage.valueProposition.cards.serviceArea.description', { radius: city.serviceArea.radius, city: cityName })}
              </p>
              <p style={{ color: COLORS.textMuted, fontSize: '0.9rem' }}>
                {t('cityPage.valueProposition.cards.serviceArea.coverage')}
              </p>
            </CardContent>
          </ValueCard>
        </CardsGrid>

        {/* Process Flow */}
        <ProcessSection>
          <ProcessTitle>
            {t('cityPage.valueProposition.process.title')}
          </ProcessTitle>
          <ProcessSteps>
            {processSteps.map((step) => (
              <ProcessStep key={step.num}>
                <StepNumber>{step.num}</StepNumber>
                <StepInfo>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.desc}</StepDescription>
                </StepInfo>
              </ProcessStep>
            ))}
          </ProcessSteps>
        </ProcessSection>

        {/* Why Us Section */}
        <WhyUsSection>
          <WhyUsHeader>
            <WhyUsIcon>
              <CheckmarkIcon />
            </WhyUsIcon>
            <WhyUsTitle>
              {t('cityPage.valueProposition.whyUs.title')}
            </WhyUsTitle>
          </WhyUsHeader>
          <BenefitsGrid>
            {benefits.map((benefit, index) => (
              <BenefitItem key={index}>
                <BenefitCheck />
                <BenefitText>{benefit}</BenefitText>
              </BenefitItem>
            ))}
          </BenefitsGrid>
        </WhyUsSection>
      </Container>
    </Section>
  )
}
