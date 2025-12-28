import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  FORGE_COLORS,
  hammeredTexture,
} from '../styles'

// Alias for backward compatibility
const COLORS = FORGE_COLORS

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATIONS
// ═══════════════════════════════════════════════════════════════════════════

export const emberPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(232, 92, 65, 0.3), 0 0 40px rgba(232, 92, 65, 0.1);
  }
  50% {
    box-shadow: 0 0 30px rgba(232, 92, 65, 0.5), 0 0 60px rgba(232, 92, 65, 0.2);
  }
`

export const sparkFloat = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-3px) scale(1.1);
    opacity: 1;
  }
`

export const forgeGlow = keyframes`
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
`

// Icon-specific animations for elegant outline style
export const iconDraw = keyframes`
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

export const iconPulse = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 3px rgba(232, 92, 65, 0.4));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 6px rgba(232, 92, 65, 0.6));
  }
`

export const iconGlow = keyframes`
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

export const Section = styled.section`
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

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
`

export const SectionTitle = styled.h2`
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  color: ${COLORS.iron};
  text-align: center;
  margin-bottom: 0.75rem;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
`

export const SectionSubtitle = styled.p`
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

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 4rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`

export const ValueCard = styled.div`
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

export const CardIconWrapper = styled.div`
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

export const CardTitle = styled.h3`
  font-size: 1.25rem;
  color: ${COLORS.iron};
  margin-bottom: 1rem;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
`

export const CardContent = styled.div`
  color: ${COLORS.textSecondary};
  line-height: 1.7;
  font-size: 0.95rem;
`

// Delivery card specific styles
export const DeliveryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`

export const DeliveryMetric = styled.div`
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

export const DeliveryNote = styled.p`
  font-size: 0.85rem;
  color: ${COLORS.textMuted};
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid ${COLORS.cardBorder};
`

// Quality guarantees list
export const QualityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`

export const QualityItem = styled.li`
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

export const CheckIcon = styled.span`
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

export const ProcessSection = styled.div`
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

export const ProcessTitle = styled.h3`
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

export const ProcessSteps = styled.div`
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

export const ProcessStep = styled.div`
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

export const StepNumber = styled.div`
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

export const StepInfo = styled.div`
  @media (max-width: 768px) {
    flex: 1;
  }
`

export const StepTitle = styled.h4`
  font-size: 1.1rem;
  color: ${COLORS.iron};
  margin-bottom: 0.375rem;
  font-weight: 700;
  font-family: 'Merriweather', Georgia, serif;
`

export const StepDescription = styled.p`
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

export const WhyUsSection = styled.div`
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

export const WhyUsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`

export const WhyUsIcon = styled.div`
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

export const WhyUsTitle = styled.h3`
  font-size: 1.4rem;
  color: #f5f4f2;
  font-family: 'Merriweather', Georgia, serif;
  font-weight: 700;
  margin: 0;
`

export const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const BenefitItem = styled.div`
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

export const BenefitCheck = styled.span`
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

export const BenefitText = styled.span`
  color: #e8e6e3;
  font-size: 0.95rem;
  line-height: 1.5;
`
