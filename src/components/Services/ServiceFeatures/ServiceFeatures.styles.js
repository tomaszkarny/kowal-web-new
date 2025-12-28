/**
 * ServiceFeatures Styles
 * Grid of feature cards with icons for service pages
 */

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_MEDIA,
  FORGE_SPACING,
  FORGE_RADIUS,
  FORGE_TYPOGRAPHY,
} from '../../Cities/styles/forgedIronTheme'

// Entry animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $columns }) => ($columns === 4 ? '240px' : '280px')}, 1fr)
  );
  gap: ${FORGE_SPACING.xl};

  ${FORGE_MEDIA.tablet} {
    grid-template-columns: 1fr;
    gap: ${FORGE_SPACING.lg};
  }
`

export const FeatureCard = styled.div`
  background: ${({ $dark }) =>
    $dark ? FORGE_COLORS.ironLight : FORGE_COLORS.white};
  padding: ${FORGE_SPACING.xl};
  border-radius: ${FORGE_RADIUS.card};
  border: 1px solid
    ${({ $dark }) => ($dark ? FORGE_COLORS.iron : FORGE_COLORS.cardBorder)};
  border-top: 3px solid ${FORGE_COLORS.iron};
  text-align: center;
  transition: ${FORGE_TRANSITIONS.default};
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;

  /* Staggered animation delays */
  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.2s; }
  &:nth-of-type(3) { animation-delay: 0.3s; }
  &:nth-of-type(4) { animation-delay: 0.4s; }

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    border-top-color: ${FORGE_COLORS.ember};
    box-shadow: ${FORGE_SHADOWS.cardHover};
  }
`

export const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${FORGE_SPACING.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${FORGE_COLORS.ember};
  background: ${FORGE_COLORS.sectionBg};
  border-radius: ${FORGE_RADIUS.full};
  transition: ${FORGE_TRANSITIONS.default};

  svg {
    width: 32px;
    height: 32px;
  }

  ${FeatureCard}:hover & {
    background: ${FORGE_COLORS.ember};
    color: ${FORGE_COLORS.white};
    box-shadow: ${FORGE_SHADOWS.emberGlow};
  }
`

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: ${({ $dark }) =>
    $dark ? FORGE_COLORS.textOnDark : FORGE_COLORS.iron};
  margin-bottom: ${FORGE_SPACING.sm};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 600;
`

export const FeatureText = styled.p`
  color: ${({ $dark }) =>
    $dark ? FORGE_COLORS.textOnDark : FORGE_COLORS.textSecondary};
  line-height: 1.6;
  font-size: 0.95rem;
  margin: 0;
`
