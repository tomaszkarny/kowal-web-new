import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FREE_DELIVERY_RADIUS } from 'utils/cityDistanceCalculator'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  hammeredTexture,
} from '../styles'

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

const emberPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(232, 92, 65, 0.3), 0 0 40px rgba(232, 92, 65, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(232, 92, 65, 0.5), 0 0 60px rgba(232, 92, 65, 0.2);
  }
`

// Alias for backward compatibility
const COLORS = FORGE_COLORS

const sparkFloat = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-3px) scale(1.1);
    opacity: 1;
  }
`

const forgeGlow = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`

// Icon-specific animations for elegant outline style
const iconDraw = keyframes`
  0% {
    stroke-dashoffset: 100;
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`

const iconPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(232, 92, 65, 0.4));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 6px rgba(232, 92, 65, 0.6));
  }
`

const iconGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 2px rgba(232, 92, 65, 0.3))
            drop-shadow(0 0 4px rgba(232, 92, 65, 0.2));
  }
  50% {
    filter: drop-shadow(0 0 4px rgba(232, 92, 65, 0.5))
            drop-shadow(0 0 8px rgba(232, 92, 65, 0.3))
            drop-shadow(0 0 12px rgba(232, 92, 65, 0.15));
  }
`

// ═══════════════════════════════════════════════════════════════════════════
// LAYOUT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const Section = styled.section`
  padding: 5rem 0;
  background: ${COLORS.sectionBg};
  position: relative;
  overflow: hidden;

  /* Subtle hammered texture overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${hammeredTexture};
    opacity: 0.015;
    pointer-events: none;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
`

const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: ${COLORS.iron};
  text-align: center;
  margin-bottom: 0.75rem;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  /* Ember underline accent */
  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.ember}, ${COLORS.emberGlow}, ${COLORS.ember});
    background-size: 200% 100%;
    animation: ${forgeGlow} 3s ease-in-out infinite;
    margin: 1.5rem auto 0;
    border-radius: 2px;
  }
`

// ═══════════════════════════════════════════════════════════════════════════
// VALUE CARDS - Three pillars of service
// ═══════════════════════════════════════════════════════════════════════════

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`

const ValueCard = styled.div`
  background: ${COLORS.white};
  padding: 2rem 1.75rem;
  position: relative;
  border-radius: 4px 4px 4px 20px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Iron plate border effect */
  border: 1px solid ${COLORS.cardBorder};
  border-top: none;

  /* Top ember glow border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      ${COLORS.iron} 15%,
      ${COLORS.iron} 85%,
      transparent 100%
    );
    border-radius: 4px 4px 0 0;
    transition: all 0.4s ease;
  }

  /* Hammered texture */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${hammeredTexture};
    opacity: 0.02;
    pointer-events: none;
    border-radius: inherit;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 20px 40px rgba(45, 45, 68, 0.12),
      0 8px 16px rgba(232, 92, 65, 0.08);

    &::before {
      background: linear-gradient(90deg,
        ${COLORS.ember} 0%,
        ${COLORS.emberGlow} 30%,
        ${COLORS.emberHot} 50%,
        ${COLORS.emberGlow} 70%,
        ${COLORS.ember} 100%
      );
    }
  }
`

const CardIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(145deg, ${COLORS.ironDark} 0%, ${COLORS.iron} 60%, ${COLORS.ironLight} 100%);
  border-radius: 14px 14px 14px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  /* Subtle inner bevel effect - like forged metal */
  &::before {
    content: '';
    position: absolute;
    inset: 1px;
    background: linear-gradient(145deg,
      rgba(255,255,255,0.08) 0%,
      transparent 30%,
      transparent 70%,
      rgba(0,0,0,0.15) 100%
    );
    border-radius: 13px 13px 13px 3px;
    pointer-events: none;
  }

  /* Inner surface */
  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    background: linear-gradient(145deg, ${COLORS.ironLight} 0%, ${COLORS.iron} 50%, ${COLORS.ironDark} 100%);
    border-radius: 11px 11px 11px 2px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Elegant outline icon styling */
  svg {
    width: 28px;
    height: 28px;
    fill: none;
    stroke: ${COLORS.ember};
    stroke-width: 1.75;
    stroke-linecap: round;
    stroke-linejoin: round;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 3px rgba(232, 92, 65, 0.4));
    transition: all 0.3s ease;

    /* Draw-in animation on load */
    stroke-dasharray: 100;
    animation: ${iconDraw} 1.2s ease-out forwards;
  }

  /* Hover state - intensify the ember glow */
  &:hover svg {
    stroke: ${COLORS.emberGlow};
    filter: drop-shadow(0 0 4px rgba(232, 92, 65, 0.6))
            drop-shadow(0 0 8px rgba(232, 92, 65, 0.3));
    animation: ${iconPulse} 1.5s ease-in-out infinite;
  }

  /* Parent card hover effect */
  ${ValueCard}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(232, 92, 65, 0.2);

    svg {
      stroke: ${COLORS.emberGlow};
      animation: ${iconGlow} 2s ease-in-out infinite;
    }
  }
`

const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${COLORS.iron};
  margin-bottom: 1rem;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
`

const CardContent = styled.div`
  color: ${COLORS.textSecondary};
  line-height: 1.7;
  font-size: 0.95rem;
`

// Delivery card specific styles
const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`

const DeliveryMetric = styled.div`
  padding: 0.875rem;
  background: ${COLORS.sectionBg};
  border-radius: 6px;
  border-left: 3px solid ${props => props.$highlight ? COLORS.ember : COLORS.iron};

  strong {
    display: block;
    font-size: 0.75rem;
    color: ${props => props.$highlight ? COLORS.ember : COLORS.iron};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
    font-weight: 600;
  }

  span {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${COLORS.iron};
  }
`

const DeliveryNote = styled.p`
  font-size: 0.85rem;
  color: ${COLORS.textMuted};
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid ${COLORS.cardBorder};
`

// Quality guarantees list
const QualityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

const QualityItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.95rem;
  color: ${COLORS.textSecondary};

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: linear-gradient(135deg, ${COLORS.ember} 0%, ${COLORS.emberGlow} 100%);
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    /* Checkmark */
    &::after {
      content: '\u2713';
      color: white;
      font-size: 0.7rem;
      font-weight: bold;
    }
  }

  /* Custom checkmark using pseudo-element */
  span {
    position: relative;
  }
`

const CheckIcon = styled.span`
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, ${COLORS.ember} 0%, ${COLORS.emberGlow} 100%);
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.65rem;
  font-weight: bold;
`

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS FLOW - The blacksmith's journey
// ═══════════════════════════════════════════════════════════════════════════

const ProcessSection = styled.div`
  background: ${COLORS.white};
  border-radius: 8px 8px 8px 24px;
  padding: 3rem;
  margin-bottom: 3rem;
  position: relative;
  overflow: hidden;

  /* Forged iron top border */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg,
      ${COLORS.iron} 0%,
      ${COLORS.ironLight} 50%,
      ${COLORS.iron} 100%
    );
  }

  /* Subtle texture */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${hammeredTexture};
    opacity: 0.015;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const ProcessTitle = styled.h3`
  font-size: 1.5rem;
  color: ${COLORS.iron};
  text-align: center;
  margin-bottom: 2.5rem;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 2px;
    background: linear-gradient(90deg, ${COLORS.ember}, ${COLORS.emberGlow});
    margin: 0.75rem auto 0;
    border-radius: 1px;
  }
`

const ProcessSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 900px;
  margin: 0 auto;
  position: relative;

  /* Connecting line */
  &::before {
    content: '';
    position: absolute;
    top: 32px;
    left: 60px;
    right: 60px;
    height: 2px;
    background: linear-gradient(90deg,
      ${COLORS.cardBorder} 0%,
      ${COLORS.iron} 20%,
      ${COLORS.iron} 80%,
      ${COLORS.cardBorder} 100%
    );
    z-index: 0;

    @media (max-width: 768px) {
      display: none;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

const ProcessStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    gap: 1rem;
    width: 100%;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      left: 32px;
      top: 64px;
      width: 2px;
      height: 24px;
      background: ${COLORS.iron};
    }
  }
`

const StepNumber = styled.div`
  width: 64px;
  height: 64px;
  background: linear-gradient(145deg, ${COLORS.ironDark} 0%, ${COLORS.iron} 50%, ${COLORS.ironLight} 100%);
  color: ${COLORS.ember};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  font-family: 'Merriweather', Georgia, serif;
  margin-bottom: 1rem;
  position: relative;
  transition: all 0.3s ease;

  /* Inner ring */
  &::before {
    content: '';
    position: absolute;
    inset: 3px;
    border: 2px solid ${COLORS.ember};
    border-radius: 50%;
    opacity: 0.3;
  }

  /* Ember glow on hover */
  ${ProcessStep}:hover & {
    animation: ${emberPulse} 2s ease-in-out infinite;
    color: ${COLORS.emberGlow};

    &::before {
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 1.25rem;
    margin-bottom: 0;
    flex-shrink: 0;
  }
`

const StepInfo = styled.div`
  @media (max-width: 768px) {
    flex: 1;
  }
`

const StepTitle = styled.h4`
  font-size: 1.1rem;
  color: ${COLORS.iron};
  margin-bottom: 0.375rem;
  font-weight: 700;
  font-family: 'Merriweather', Georgia, serif;
`

const StepDescription = styled.p`
  font-size: 0.85rem;
  color: ${COLORS.textMuted};
  max-width: 140px;
  margin: 0;
  line-height: 1.5;

  @media (max-width: 768px) {
    max-width: none;
  }
`

// ═══════════════════════════════════════════════════════════════════════════
// WHY US SECTION - Guarantees and benefits
// ═══════════════════════════════════════════════════════════════════════════

const WhyUsSection = styled.div`
  background: linear-gradient(145deg, ${COLORS.ironDark} 0%, ${COLORS.iron} 100%);
  border-radius: 8px 8px 8px 24px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;

  /* Hammered texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${hammeredTexture};
    opacity: 0.04;
    mix-blend-mode: overlay;
    pointer-events: none;
  }

  /* Top ember accent */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg,
      transparent 0%,
      ${COLORS.ember} 20%,
      ${COLORS.emberGlow} 50%,
      ${COLORS.ember} 80%,
      transparent 100%
    );
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`

const WhyUsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

const WhyUsIcon = styled.div`
  width: 52px;
  height: 52px;
  background: linear-gradient(145deg, ${COLORS.ember} 0%, ${COLORS.emberGlow} 60%, ${COLORS.emberHot} 100%);
  border-radius: 14px 14px 14px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${sparkFloat} 3s ease-in-out infinite;
  position: relative;
  box-shadow:
    0 2px 8px rgba(232, 92, 65, 0.3),
    0 4px 16px rgba(232, 92, 65, 0.15),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);

  /* Inner glow effect */
  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: linear-gradient(145deg,
      rgba(255,255,255,0.15) 0%,
      transparent 50%
    );
    border-radius: 12px 12px 12px 3px;
    pointer-events: none;
  }

  svg {
    width: 26px;
    height: 26px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
    animation: ${iconDraw} 1s ease-out forwards;
    stroke-dasharray: 100;
  }
`

const WhyUsTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f4f2;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
  margin: 0;
`

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: ${COLORS.ember}40;
    transform: translateX(4px);
  }
`

const BenefitCheck = styled.span`
  width: 22px;
  height: 22px;
  background: linear-gradient(135deg, ${COLORS.ember} 0%, ${COLORS.emberGlow} 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;

  &::after {
    content: '\u2713';
    color: white;
    font-size: 0.7rem;
    font-weight: bold;
  }
`

const BenefitText = styled.span`
  color: #e8e6e3;
  font-size: 0.95rem;
  line-height: 1.5;
`

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CityValueProposition({ city, language, templateData }) {
  const { t } = useTranslation('cities')

  // Calculate delivery cost
  const isFreeDelivery = city.distance <= FREE_DELIVERY_RADIUS
  const deliveryCost = isFreeDelivery ? 0 : Math.round((city.distance - FREE_DELIVERY_RADIUS) * 2.5)

  // ═══════════════════════════════════════════════════════════════════════
  // ELEGANT OUTLINE ICONS - Hand-crafted for the Forged Iron aesthetic
  // Thin, precise strokes that feel artisan-made, not machine-generated
  // ═══════════════════════════════════════════════════════════════════════

  // Delivery truck - elegant silhouette with refined details
  const deliveryIcon = (
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
  const qualityIcon = (
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
  const radiusIcon = (
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
  const checkIcon = (
    <svg viewBox="0 0 24 24">
      {/* Outer ring - elegant circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Checkmark - flowing, confident stroke */}
      <path d="M7.5 12.5l3 3 6-7" />
      {/* Subtle inner glow ring */}
      <circle cx="12" cy="12" r="6.5" opacity="0.25" strokeDasharray="1 2" />
    </svg>
  )

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
            <CardIconWrapper>{deliveryIcon}</CardIconWrapper>
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
            <CardIconWrapper>{qualityIcon}</CardIconWrapper>
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
            <CardIconWrapper>{radiusIcon}</CardIconWrapper>
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
            <WhyUsIcon>{checkIcon}</WhyUsIcon>
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
