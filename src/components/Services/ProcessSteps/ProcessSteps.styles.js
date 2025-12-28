/**
 * ProcessSteps Styles
 * Step-by-step process display with numbered circles
 */

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_MEDIA,
  FORGE_SPACING,
  FORGE_TYPOGRAPHY,
} from '../../Cities/styles/forgedIronTheme'

// Flow animation for connecting line
const lineFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

// Entry animation for steps
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

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding-top: ${FORGE_SPACING.xl};

  /* Animated connecting line between steps */
  &::before {
    content: '';
    position: absolute;
    top: calc(${FORGE_SPACING.xl} + 30px);
    left: 60px;
    right: 60px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${FORGE_COLORS.iron} 0%,
      ${FORGE_COLORS.ember} 50%,
      ${FORGE_COLORS.iron} 100%
    );
    background-size: 200% 100%;
    animation: ${lineFlow} 3s ease infinite;
    z-index: 0;
    border-radius: 2px;

    ${FORGE_MEDIA.tablet} {
      display: none;
    }
  }

  ${FORGE_MEDIA.tablet} {
    flex-direction: column;
    gap: ${FORGE_SPACING.lg};
    padding-top: 0;
  }
`

export const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
  position: relative;
  z-index: 1;
  max-width: 180px;
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;

  /* Staggered animation delays */
  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.2s; }
  &:nth-of-type(3) { animation-delay: 0.3s; }
  &:nth-of-type(4) { animation-delay: 0.4s; }
  &:nth-of-type(5) { animation-delay: 0.5s; }

  ${FORGE_MEDIA.tablet} {
    flex-direction: row;
    text-align: left;
    max-width: 100%;
    gap: ${FORGE_SPACING.lg};
  }
`

export const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  background: ${FORGE_GRADIENTS.ironGradient};
  color: ${FORGE_COLORS.white};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: ${FORGE_TYPOGRAPHY.heading};
  margin-bottom: ${FORGE_SPACING.md};
  box-shadow: ${FORGE_SHADOWS.card};
  transition: ${FORGE_TRANSITIONS.default};
  flex-shrink: 0;

  ${Step}:hover & {
    background: ${FORGE_GRADIENTS.emberGradient};
    box-shadow: ${FORGE_SHADOWS.emberGlow};
  }

  ${FORGE_MEDIA.tablet} {
    width: 50px;
    height: 50px;
    font-size: 1.3rem;
    margin-bottom: 0;
  }
`

export const StepContent = styled.div`
  ${FORGE_MEDIA.tablet} {
    flex: 1;
  }
`

export const StepTitle = styled.h4`
  font-size: 1.1rem;
  color: ${FORGE_COLORS.iron};
  margin-bottom: ${FORGE_SPACING.xs};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 600;
`

export const StepDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`
