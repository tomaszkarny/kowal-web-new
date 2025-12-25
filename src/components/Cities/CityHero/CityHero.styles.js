import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { fadeIn } from 'components/common/animations/animations'
import { FORGE_COLORS } from '../styles'

// Alias for compatibility
const COLORS = {
  ...FORGE_COLORS,
  primary: THEME.color.primary,
  secondary: '#6c5ce7',
  charcoal: FORGE_COLORS.textPrimary,
}

export const HeroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  padding: clamp(2rem, 6vw, 4rem) clamp(1.5rem, 5vw, 5rem);
  
  @media (max-width: 768px) {
    min-height: 55vh;
    padding: 2.5rem 1.5rem;
  }
  
  @media (max-width: 480px) {
    min-height: 75vh;
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

  /* Apply subtle saturation and brightness adjustments */
  img {
    filter: saturate(1.05) brightness(0.9);
  }
`

// Gradient overlay for text readability - "Forged Iron" themed
export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  /* Dark gradient overlay for text contrast - Forged Iron style */
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 50, 0.4) 0%,
    rgba(30, 30, 50, 0.5) 30%,
    rgba(30, 30, 50, 0.7) 70%,
    rgba(30, 30, 50, 0.85) 100%
  );

  /* Ember/purple accent tint */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(82, 95, 196, 0.2) 0%,
      rgba(232, 92, 65, 0.1) 50%,
      rgba(82, 95, 196, 0.15) 100%
    );
    pointer-events: none;
  }
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 3rem);
  animation: ${fadeIn} 0.8s ease-out;
`

export const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Merriweather', serif;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`

export const HeroSubtitle = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  margin-bottom: 1.5rem;
  opacity: 0.95;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1.75rem;
  margin-top: 1.75rem;
`

export const HeroInfo = styled.div`
  background: rgba(30, 30, 50, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(232, 92, 65, 0.3);
  color: ${COLORS.textOnDark};

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`

// Button styles moved to shared component CityCtaButton
