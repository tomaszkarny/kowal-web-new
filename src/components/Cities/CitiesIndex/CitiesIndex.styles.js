import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { Link } from 'gatsby-plugin-react-i18next'
import { THEME } from 'consts/theme'
import { fadeIn, emberPulse } from 'components/common/animations/animations'
import {
  FORGE_COLORS,
  FORGE_MEDIA,
  FORGE_TYPOGRAPHY,
  CityGrid,
  hammeredTexture
} from '../styles'

// Alias for compatibility with extended properties
const COLORS = {
  ...FORGE_COLORS,
  primary: THEME.color.primary,
  secondary: '#6c5ce7',
  dark: THEME.color.dark.replace(';', ''),
  border: THEME.color.lightGray,
  charcoal: FORGE_COLORS.textPrimary,
  cardDark: FORGE_COLORS.ironDark,
  cardDarkLight: '#252540',
  textMuted: FORGE_COLORS.textMuted,
}

// Hero Section - with background image support
export const CitiesHeroSection = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  overflow: hidden;
  padding: clamp(4rem, 10vw, 6rem) 2rem;

  @media (max-width: 768px) {
    min-height: 40vh;
    padding: 3rem 1.5rem;
  }
`

// Background image container
export const HeroImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }
`

// Gradient overlay for text readability - "Forged Iron" themed
export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;

  /* Dark gradient for text contrast */
  background: linear-gradient(
    to bottom,
    rgba(30, 30, 50, 0.4) 0%,
    rgba(30, 30, 50, 0.5) 30%,
    rgba(30, 30, 50, 0.7) 70%,
    rgba(30, 30, 50, 0.85) 100%
  );

  /* Ember accent tint - consistent with Forged Iron theme */
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

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  animation: ${fadeIn} 0.8s ease-out;
`

export const HeroTitle = styled.h1`
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  font-family: 'Merriweather', serif;
`

export const HeroSubtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.3rem);
  opacity: 0.95;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`

// Main Content Section
export const IndexSection = styled.section`
  padding: 4rem 0;
  background: #f5f4f2;
  min-height: auto;
`

export const IndexContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`

export const AllCitiesSection = styled.div`
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${COLORS.iron};
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Merriweather', serif;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.ember}, ${COLORS.emberGlow});
    margin: 0.75rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`

export const SectionDivider = styled.div`
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, ${COLORS.iron}, transparent);
  margin: 3rem auto;
`

// Re-export CityGrid with default props for CitiesIndex layout
// Uses $minWidth="320px" for wider city cards
export const CitiesGrid = styled(CityGrid)`
  /* Extends shared CityGrid with default minWidth of 320px */
`
CitiesGrid.defaultProps = { $minWidth: '320px' }

// Forge Badge for featured cards
export const ForgeBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 42px;
  height: 42px;
  background: linear-gradient(135deg, ${COLORS.ember} 0%, #c94a33 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 2px 8px rgba(232, 92, 65, 0.4),
    inset 0 1px 0 rgba(255,255,255,0.2);
  z-index: 2;

  &::before {
    content: '\u2692';
    font-size: 1.2rem;
    color: white;
  }
`

// City Card - "Forged Iron" style
export const CityCard = styled.div`
  position: relative;
  padding: 1.75rem 2rem 2rem;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: ${fadeIn} 0.6s ease-out both;
  animation-delay: ${props => (props.$index || 0) * 0.1}s;

  /* FEATURED: Dark iron plate aesthetic */
  ${props => props.$featured && css`
    background: linear-gradient(145deg, ${COLORS.cardDark} 0%, ${COLORS.cardDarkLight} 100%);
    color: ${COLORS.textOnDark};
    border: none;
    border-radius: 4px 4px 4px 20px; /* Asymmetric - one rounded corner */

    /* Hammered texture overlay */
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: ${hammeredTexture};
      opacity: 0.03;
      mix-blend-mode: overlay;
      pointer-events: none;
      border-radius: inherit;
    }

    /* Ember glow top border */
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
      border-radius: 4px 4px 0 0;
    }

    /* Ember pulse animation */
    animation: ${fadeIn} 0.6s ease-out both, ${emberPulse} 4s ease-in-out infinite;
    animation-delay: ${props.$index * 0.1}s, 0s;

    &:hover {
      transform: translateY(-4px);

      &::after {
        background: linear-gradient(90deg,
          ${COLORS.ember} 0%,
          ${COLORS.emberGlow} 30%,
          ${COLORS.emberHot} 50%,
          ${COLORS.emberGlow} 70%,
          ${COLORS.ember} 100%
        );
      }
    }
  `}

  /* REGULAR: Light card with iron accent */
  ${props => !props.$featured && css`
    background: ${COLORS.cardLight};
    color: ${COLORS.iron};
    border: 1px solid ${COLORS.cardBorder};
    border-top: 3px solid ${COLORS.iron};
    border-radius: 0 0 4px 4px;

    &:hover {
      border-top-color: ${COLORS.ember};
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(45, 45, 68, 0.12);
    }
  `}
`

export const CityName = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  font-family: 'Merriweather', serif;
  color: ${props => props.$featured ? COLORS.textOnDark : COLORS.iron};
`

export const CityRegion = styled.div`
  margin-bottom: 1rem;
  font-style: italic;
  font-size: 0.95rem;
  color: ${props => props.$featured ? 'rgba(232, 230, 227, 0.7)' : COLORS.textMuted};
`

// Stats Grid (2x2 for featured)
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 1.25rem 0;

  ${props => props.$featured && css`
    background: rgba(0, 0, 0, 0.2);
    padding: 1rem;
    border-radius: 4px;
    margin: 1.5rem -0.5rem;
  `}
`

export const StatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem;

  ${props => props.$featured && css`
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.08);
  `}

  svg {
    width: 20px;
    height: 20px;
    color: ${props => props.$featured ? COLORS.ember : COLORS.primary};
    opacity: 0.9;
  }

  span {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${props => props.$featured ? '#fff' : COLORS.iron};
  }

  small {
    font-size: 0.7rem;
    color: ${props => props.$featured ? 'rgba(255,255,255,0.6)' : COLORS.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`

// Legacy stats (for regular cards - inline list)
export const CityStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin: 1.25rem 0;
`

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: ${COLORS.textMuted};
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;
  transition: color 0.2s ease;

  svg {
    flex-shrink: 0;
    color: ${COLORS.primary};
    opacity: 0.7;
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${COLORS.iron};

    svg {
      opacity: 1;
      color: ${COLORS.ember};
    }
  }

  &:last-child {
    border-bottom: none;
  }
`

// CTA Button - Iron Bar style
export const CityLink = styled(Link)`
  display: block;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 1.5rem;

  ${props => props.$featured ? css`
    /* Iron bar button for featured */
    background: linear-gradient(180deg, ${COLORS.ironLight} 0%, ${COLORS.iron} 100%);
    color: ${COLORS.textOnDark};
    padding: 0.9rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 2px;
    position: relative;

    /* Decorative side bars */
    &::before, &::after {
      content: '\u2550';
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: ${COLORS.ember};
      opacity: 0.7;
    }
    &::before { left: 0.75rem; }
    &::after { right: 0.75rem; }

    &:hover {
      background: linear-gradient(180deg, ${COLORS.ember} 0%, #c94a33 100%);
      color: white;
      border-color: transparent;
      text-decoration: none;

      &::before, &::after {
        color: white;
        opacity: 1;
      }
    }
  ` : css`
    /* Subtle link for regular cards */
    color: ${COLORS.iron};
    padding: 0.75rem 1rem;
    border-bottom: 2px solid ${COLORS.cardBorder};
    background: transparent;

    &:hover {
      color: ${COLORS.ember};
      border-bottom-color: ${COLORS.ember};
      text-decoration: none;
    }

    &::after {
      content: ' \u2192';
      transition: transform 0.2s;
      display: inline-block;
    }

    &:hover::after {
      transform: translateX(4px);
    }
  `}
`

// Unused legacy exports (kept for backward compatibility)
export const IndexHeader = styled.div``
export const IndexTitle = styled.h1``
export const IndexSubtitle = styled.p``
export const CityInfo = styled.div``
