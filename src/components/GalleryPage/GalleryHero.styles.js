import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { mq } from 'utils/mediaQueries'
import { fadeIn, slideUp } from 'components/common/animations/animations'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_GRADIENTS,
  FORGE_TYPOGRAPHY,
  FORGE_SPACING,
  hammeredTexture,
} from '../Cities/styles/forgedIronTheme'

const countUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

export const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 300px;
  background: linear-gradient(145deg, ${FORGE_COLORS.ironDark}, ${FORGE_COLORS.iron});
  overflow: hidden;
  display: flex;
  align-items: center;

  /* Ember gradient top accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${FORGE_GRADIENTS.emberGradient};
    opacity: 0.6;
    z-index: 3;
    pointer-events: none;
  }

  /* Hammered texture overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${hammeredTexture};
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  ${mq('medium')} {
    min-height: 400px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${FORGE_SPACING.xl} ${FORGE_SPACING.xl};
  display: flex;
  flex-direction: column;
  gap: ${FORGE_SPACING.xl};

  ${mq('medium')} {
    flex-direction: row;
    align-items: center;
    padding: 3rem ${FORGE_SPACING.xl};
  }
`

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation: ${fadeIn} 0.6s ease-out forwards;

  ${mq('medium')} {
    max-width: 55%;
  }
`

export const HeroTitle = styled.h1`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${FORGE_COLORS.white};
  margin: 0 0 ${FORGE_SPACING.md};
  line-height: 1.2;
  letter-spacing: -0.01em;

  /* Ember accent underline */
  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${FORGE_GRADIENTS.emberGradient};
    border-radius: 2px;
    margin-top: 0.75rem;
    box-shadow: 0 0 12px rgba(232, 92, 65, 0.4);
  }

  ${mq('tablet')} {
    font-size: 2rem;
  }

  ${mq('medium')} {
    font-size: 2.4rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(232, 230, 227, 0.8);
  line-height: 1.65;
  margin: 0 0 ${FORGE_SPACING.lg};
  max-width: 500px;
  animation: ${slideUp} 0.7s 0.15s ease-out both;

  ${mq('tablet')} {
    font-size: 1.05rem;
  }
`

export const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${FORGE_SPACING.sm};
  animation: ${slideUp} 0.8s 0.25s ease-out both;
`

export const StatBadge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(232, 92, 65, 0.15);
  border: 1px solid rgba(232, 92, 65, 0.35);
  border-radius: 6px;
  padding: 0.6rem 1.1rem;
  min-width: 80px;
  animation: ${countUp} 0.5s ease-out both;

  &:nth-of-type(1) { animation-delay: 0.3s; }
  &:nth-of-type(2) { animation-delay: 0.4s; }
  &:nth-of-type(3) { animation-delay: 0.5s; }
`

export const StatNumber = styled.span`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1.4rem;
  font-weight: 700;
  color: ${FORGE_COLORS.ember};
  line-height: 1;
  letter-spacing: -0.02em;
`

export const StatLabel = styled.span`
  font-size: 0.7rem;
  color: rgba(232, 230, 227, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 0.2rem;
  white-space: nowrap;
`

export const HeroDecoration = styled.div`
  display: none;
  flex: 0 0 auto;
  width: 42%;
  position: relative;
  align-items: center;
  justify-content: center;

  ${mq('medium')} {
    display: flex;
  }
`

const kenBurns = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
`

export const ForgePattern = styled.div`
  width: 100%;
  max-width: 380px;
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), ${FORGE_SHADOWS.emberGlow};

  /* Radial ember glow overlay */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at 50% 60%,
      rgba(232, 92, 65, 0.18) 0%,
      rgba(255, 107, 74, 0.08) 45%,
      transparent 75%
    );
    z-index: 2;
    pointer-events: none;
  }

  /* Subtle inner border glow */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(232, 92, 65, 0.15);
    border-radius: 6px;
    z-index: 3;
    pointer-events: none;
  }
`

export const GalleryHeroImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: 6px;
  overflow: hidden;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    animation: ${kenBurns} 20s ease-in-out infinite alternate;
  }

  @media (prefers-reduced-motion: reduce) {
    .gatsby-image-wrapper {
      animation: none;
    }
  }
`
