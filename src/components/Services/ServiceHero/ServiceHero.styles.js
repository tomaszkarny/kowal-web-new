/**
 * ServiceHero Styles
 * Gradient-based hero section for service pages
 */

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_MEDIA,
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

export const HeroSection = styled.section`
  background: ${({ $variant }) =>
    $variant === 'fences'
      ? `linear-gradient(135deg, ${FORGE_COLORS.ironDark} 0%, ${FORGE_COLORS.ember} 100%)`
      : `linear-gradient(135deg, ${FORGE_COLORS.ember} 0%, ${FORGE_COLORS.ironDark} 100%)`};
  color: ${FORGE_COLORS.white};
  padding: 6rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 50vh;
  display: flex;
  align-items: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      ellipse at center,
      rgba(232, 92, 65, 0.1) 0%,
      transparent 70%
    );
    pointer-events: none;
  }

  ${FORGE_MEDIA.tablet} {
    padding: 4rem 0;
    min-height: 40vh;
  }
`

export const HeroContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  ${FORGE_MEDIA.tablet} {
    padding: 0 1.5rem;
  }
`

// Background image container for GatsbyImage
export const HeroImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    filter: saturate(1.05) brightness(0.9);
  }
`

// Gradient overlay for text readability
export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 50, 0.4) 0%,
    rgba(30, 30, 50, 0.5) 30%,
    rgba(30, 30, 50, 0.7) 70%,
    rgba(30, 30, 50, 0.85) 100%
  );

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(232, 92, 65, 0.2) 0%,
      rgba(232, 92, 65, 0.1) 50%,
      rgba(232, 92, 65, 0.15) 100%
    );
    pointer-events: none;
  }
`

export const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  margin-bottom: 1.5rem;
  font-weight: 700;
  font-family: ${FORGE_TYPOGRAPHY.heading};
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out forwards;

  ${FORGE_MEDIA.tablet} {
    margin-bottom: 1rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-family: ${FORGE_TYPOGRAPHY.body};
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.2s forwards;

  ${FORGE_MEDIA.tablet} {
    margin-bottom: 2rem;
  }
`

export const HeroActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease-out 0.4s forwards;
`
