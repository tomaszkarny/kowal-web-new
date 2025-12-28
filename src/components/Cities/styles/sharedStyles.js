/**
 * Shared Styled Components for City Pages
 * "Forged Iron" Design System
 */

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_MEDIA,
  FORGE_RADIUS,
  FORGE_GRADIENTS,
  FORGE_TYPOGRAPHY,
  FORGE_SPACING,
} from './forgedIronTheme'

// Re-export colors for convenience
export { FORGE_COLORS }

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

/**
 * Base section wrapper with optional background
 */
export const CitySection = styled.section`
  padding: 5rem 0;
  background: ${({ $bg }) => $bg || FORGE_COLORS.sectionBg};

  ${FORGE_MEDIA.tablet} {
    padding: ${FORGE_SPACING.xxl} 0;
  }
`

/**
 * Centered container with max-width
 */
export const CityContainer = styled.div`
  max-width: ${({ $maxWidth }) => $maxWidth || '1200px'};
  margin: 0 auto;
  padding: 0 ${FORGE_SPACING.xl};

  ${FORGE_MEDIA.tablet} {
    padding: 0 ${FORGE_SPACING.lg};
  }
`

// ============================================================================
// TYPOGRAPHY COMPONENTS
// ============================================================================

/**
 * Section title with ember underline accent
 * Props: $size (sm, md, lg), $align (left, center, right)
 */
export const CityTitle = styled.h2`
  font-size: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '1.5rem'
      case 'lg':
        return '2.5rem'
      default:
        return '2rem'
    }
  }};
  color: ${FORGE_COLORS.iron};
  text-align: ${({ $align }) => $align || 'center'};
  margin-bottom: ${({ $mb }) => $mb || '1rem'};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 700;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: ${FORGE_GRADIENTS.emberGradient};
    margin: 0.75rem ${({ $align }) => ($align === 'left' ? '0' : 'auto')} 0;
    border-radius: 2px;
  }

  ${FORGE_MEDIA.tablet} {
    font-size: ${({ $size }) => {
      switch ($size) {
        case 'sm':
          return '1.3rem'
        case 'lg':
          return '2rem'
        default:
          return '1.8rem'
      }
    }};
  }
`

/**
 * Section subtitle
 */
export const CitySubtitle = styled.p`
  font-size: 1.1rem;
  color: ${FORGE_COLORS.textSecondary};
  text-align: ${({ $align }) => $align || 'center'};
  margin-bottom: ${({ $mb }) => $mb || '3rem'};
  max-width: ${({ $maxWidth }) => $maxWidth || '800px'};
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`

// ============================================================================
// CARD COMPONENTS
// ============================================================================

/**
 * Base card with iron top border and hover effect
 */
export const CityCard = styled.div`
  background: ${FORGE_COLORS.cardLight};
  padding: ${({ $padding }) => $padding || FORGE_SPACING.xl};
  border-radius: ${FORGE_RADIUS.card};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    border-top-color: ${FORGE_COLORS.ember};
    box-shadow: ${FORGE_SHADOWS.cardHover};
  }
`

/**
 * Card with corner accent (like forge-branded)
 */
export const CityCardCorner = styled(CityCard)`
  border-radius: ${FORGE_RADIUS.cardWithCorner};
`

/**
 * Card title (inside cards)
 */
export const CityCardTitle = styled.h3`
  color: ${FORGE_COLORS.ember};
  margin-bottom: 1rem;
  font-size: ${({ $size }) => $size || '1.3rem'};
  font-weight: 600;
`

// ============================================================================
// GRID COMPONENTS
// ============================================================================

/**
 * Responsive grid for cards
 */
export const CityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $minWidth }) => $minWidth || '280px'}, 1fr)
  );
  gap: ${({ $gap }) => $gap || FORGE_SPACING.xl};

  ${FORGE_MEDIA.tablet} {
    grid-template-columns: 1fr;
    gap: ${FORGE_SPACING.lg};
  }
`

// ============================================================================
// TAG COMPONENTS
// ============================================================================

/**
 * Interactive tag/badge
 */
export const CityTag = styled.span`
  background: ${FORGE_COLORS.cardLight};
  color: ${FORGE_COLORS.ember};
  padding: ${FORGE_SPACING.xs} 1.2rem;
  border-radius: ${FORGE_RADIUS.tag};
  font-size: 0.9rem;
  border: 1px solid ${FORGE_COLORS.cardBorder};
  transition: ${FORGE_TRANSITIONS.default};
  display: inline-block;

  &:hover {
    background: ${FORGE_COLORS.ember};
    color: ${FORGE_COLORS.white};
    border-color: ${FORGE_COLORS.ember};
    transform: ${FORGE_HOVER.liftSmall};
  }
`

/**
 * Static tag (no hover effect)
 */
export const CityTagStatic = styled.span`
  background: ${FORGE_COLORS.white};
  padding: 0.5rem 1rem;
  border-radius: ${FORGE_RADIUS.tag};
  font-size: 0.9rem;
  border: 1px solid ${FORGE_COLORS.cardBorder};
`

// ============================================================================
// LIST COMPONENTS
// ============================================================================

/**
 * Feature list item with checkmark
 */
export const featureItemStyles = css`
  color: ${FORGE_COLORS.textSecondary};
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '\u2713';
    position: absolute;
    left: 0;
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`

export const CityFeatureItem = styled.li`
  ${featureItemStyles}
`

// ============================================================================
// INFO BOXES
// ============================================================================

/**
 * Info box with iron top border
 */
export const CityInfoBox = styled.div`
  background: ${({ $bg }) => $bg || FORGE_COLORS.sectionBg};
  padding: ${({ $padding }) => $padding || '2rem'};
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  border-top: 3px solid ${FORGE_COLORS.iron};
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    border-top-color: ${FORGE_COLORS.ember};
  }
`

/**
 * Info box title
 */
export const CityInfoTitle = styled.h3`
  color: ${FORGE_COLORS.ember};
  margin-bottom: ${FORGE_SPACING.md};
  font-size: 1.3rem;
  font-family: ${FORGE_TYPOGRAPHY.heading};
`

// ============================================================================
// SITE-WIDE REUSABLE COMPONENTS
// These replace blue (#525fc4) components across the entire site
// ============================================================================

/**
 * Primary ember button - replaces blue primary buttons
 * Use: <EmberButton>Text</EmberButton> or extend with styled(EmberButton)
 */
export const EmberButton = styled.button`
  background: ${FORGE_GRADIENTS.emberGradient};
  color: ${FORGE_COLORS.white};
  border: none;
  padding: 14px 28px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: ${FORGE_RADIUS.button};
  cursor: pointer;
  transition: ${FORGE_TRANSITIONS.default};
  box-shadow: ${FORGE_SHADOWS.emberButton};

  &:hover {
    background: linear-gradient(90deg, #c94a33, #e85c41);
    transform: ${FORGE_HOVER.liftSmall};
    box-shadow: 0 4px 12px rgba(232, 92, 65, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(232, 92, 65, 0.3);
  }
`

/**
 * Secondary ember button - outline style
 */
export const EmberButtonOutline = styled.button`
  background: transparent;
  color: ${FORGE_COLORS.ember};
  border: 2px solid ${FORGE_COLORS.ember};
  padding: 12px 26px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: ${FORGE_RADIUS.button};
  cursor: pointer;
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    background: ${FORGE_COLORS.ember};
    color: ${FORGE_COLORS.white};
    transform: ${FORGE_HOVER.liftSmall};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(232, 92, 65, 0.3);
  }
`

/**
 * Ember link - replaces blue inline links
 */
export const EmberLink = styled.a`
  color: ${FORGE_COLORS.ember};
  text-decoration: none;
  transition: ${FORGE_TRANSITIONS.fast};
  font-weight: 500;

  &:hover {
    color: ${FORGE_COLORS.emberGlow};
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid ${FORGE_COLORS.ember};
    outline-offset: 2px;
  }
`

/**
 * Accent line - replaces blue underlines on titles
 */
export const EmberAccentLine = styled.div`
  width: ${({ $width }) => $width || '80px'};
  height: ${({ $height }) => $height || '4px'};
  background: ${FORGE_GRADIENTS.emberGradient};
  border-radius: 2px;
  margin: ${({ $margin }) => $margin || '0.75rem 0 0 0'};
  box-shadow: 0 0 15px rgba(232, 92, 65, 0.3);
`

/**
 * Ember icon wrapper - for icons that should be ember color
 */
export const EmberIcon = styled.span`
  color: ${FORGE_COLORS.ember};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: ${FORGE_TRANSITIONS.fast};

  &:hover {
    color: ${FORGE_COLORS.emberGlow};
  }
`

/**
 * Ember checkmark icon for lists
 */
export const EmberCheckIcon = styled.span`
  color: ${FORGE_COLORS.ember};
  font-weight: bold;
  margin-right: 0.5rem;

  &::before {
    content: '✓';
  }
`

/**
 * Ember pulse animation keyframes - for subtle glow effects
 */
export const emberPulseKeyframes = css`
  @keyframes emberPulse {
    0%, 100% {
      box-shadow: 0 0 15px rgba(232, 92, 65, 0.3);
    }
    50% {
      box-shadow: 0 0 25px rgba(232, 92, 65, 0.5);
    }
  }
`

/**
 * Form input with ember focus state
 */
export const EmberInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${FORGE_COLORS.cardBorder};
  border-radius: ${FORGE_RADIUS.button};
  font-size: 1rem;
  transition: ${FORGE_TRANSITIONS.fast};
  background: ${FORGE_COLORS.white};

  &:focus {
    outline: none;
    border-color: ${FORGE_COLORS.ember};
    box-shadow: 0 0 0 3px rgba(232, 92, 65, 0.15);
  }

  &::placeholder {
    color: ${FORGE_COLORS.textMuted};
  }
`

/**
 * Form textarea with ember focus state
 */
export const EmberTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${FORGE_COLORS.cardBorder};
  border-radius: ${FORGE_RADIUS.button};
  font-size: 1rem;
  font-family: inherit;
  transition: ${FORGE_TRANSITIONS.fast};
  background: ${FORGE_COLORS.white};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${FORGE_COLORS.ember};
    box-shadow: 0 0 0 3px rgba(232, 92, 65, 0.15);
  }

  &::placeholder {
    color: ${FORGE_COLORS.textMuted};
  }
`
