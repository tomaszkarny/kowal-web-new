import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  secondary: '#6c5ce7'
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

export const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${({ $image }) => $image
    ? `linear-gradient(135deg, rgba(82, 95, 196, 0.6) 0%, rgba(108, 92, 231, 0.6) 50%, rgba(82, 95, 196, 0.6) 100%), url(${$image})`
    : `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, ${COLORS.primary} 100%)`
  };
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
  filter: ${({ $image }) => $image ? 'saturate(1.05) brightness(0.9)' : 'none'};
  transition: filter 0.4s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.05"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.25));
    mix-blend-mode: multiply;
  }
`

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 3rem);
`

export const HeroTitle = styled.h1`
  font-size: clamp(2.4rem, 4vw, 3.6rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
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
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`

// Button styles moved to shared component CityCtaButton
