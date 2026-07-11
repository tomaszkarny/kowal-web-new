import styled from '@emotion/styled'
import { Link } from 'gatsby'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_TYPOGRAPHY,
  FORGE_SPACING,
  FORGE_GRADIENTS,
  FORGE_RADIUS,
  hammeredTexture,
} from 'components/Cities/styles/forgedIronTheme'
import { mq } from 'utils/mediaQueries'

export const CategoryPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  ${mq('tablet')} {
    padding: 3rem 2rem;
  }
`

/* ── Dark Forge Category Header ─────────────────────────────────────────── */

export const CategoryHeaderSection = styled.div`
  position: relative;
  width: 100%;
  background: ${FORGE_GRADIENTS.ironDarkGradient};
  padding: 3rem 1rem;
  text-align: center;
  overflow: hidden;

  /* Ember accent line at top */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${FORGE_GRADIENTS.emberGradient};
    opacity: 0.7;
    z-index: 2;
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

  ${mq('tablet')} {
    padding: 4rem 2rem;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`

export const CategoryHeaderInner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`

export const CategoryHeaderTitle = styled.h1`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${FORGE_COLORS.textOnDark};
  margin: 0 0 ${FORGE_SPACING.md};
  line-height: 1.2;
  letter-spacing: -0.01em;

  /* Ember accent underline */
  &::after {
    content: '';
    display: block;
    width: 50px;
    height: 3px;
    background: ${FORGE_GRADIENTS.emberGradient};
    border-radius: 2px;
    margin: 0.75rem auto 0;
    box-shadow: 0 0 10px rgba(232, 92, 65, 0.4);
  }

  ${mq('tablet')} {
    font-size: 2.25rem;
  }
`

export const CategoryHeaderIntro = styled.p`
  color: rgba(232, 230, 227, 0.8);
  font-family: ${FORGE_TYPOGRAPHY.body};
  font-size: 1rem;
  line-height: 1.65;
  margin: ${FORGE_SPACING.md} auto 0;
  max-width: 650px;
  padding: 0 0.5rem;

  ${mq('tablet')} {
    font-size: 1.1rem;
  }
`

export const CategoryHeaderBadge = styled.span`
  display: inline-block;
  background: rgba(232, 92, 65, 0.15);
  border: 1px solid rgba(232, 92, 65, 0.35);
  color: ${FORGE_COLORS.ember};
  padding: 0.35rem 1rem;
  border-radius: ${FORGE_RADIUS.full};
  font-family: ${FORGE_TYPOGRAPHY.body};
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: ${FORGE_SPACING.lg};
  letter-spacing: 0.02em;
`

/* ── CTA Section ─────────────────────────────────────────────────────────── */

export const CTASection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
`

export const CTALink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.75rem;
  border-radius: ${FORGE_RADIUS.button};
  font-family: ${FORGE_TYPOGRAPHY.body};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: ${FORGE_TRANSITIONS.fast};

  /* Primary CTA — ember gradient */
  &:first-of-type {
    background: ${FORGE_GRADIENTS.emberGradient};
    color: ${FORGE_COLORS.white};
    box-shadow: ${FORGE_SHADOWS.emberButton};

    &:hover {
      box-shadow: ${FORGE_SHADOWS.emberGlow};
      transform: translateY(-2px);
    }

    &:focus-visible {
      outline: 2px solid ${FORGE_COLORS.ember};
      outline-offset: 2px;
    }
  }

  /* Secondary CTA — outlined ember */
  &:last-of-type {
    background: transparent;
    color: ${FORGE_COLORS.ember};
    border: 2px solid ${FORGE_COLORS.ember};

    &:hover {
      background: ${FORGE_COLORS.ember};
      color: ${FORGE_COLORS.white};
      box-shadow: ${FORGE_SHADOWS.emberButton};
    }

    &:focus-visible {
      outline: 2px solid ${FORGE_COLORS.ember};
      outline-offset: 2px;
    }
  }
`

/* ── FAQ Section ─────────────────────────────────────────────────────────── */

export const FAQSection = styled.section`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${FORGE_COLORS.cardBorder};
`

export const FAQHeading = styled.h2`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1.5rem;
  color: ${FORGE_COLORS.textPrimary};
  margin-bottom: 1.5rem;
  text-align: center;

  ${mq('tablet')} {
    font-size: 1.75rem;
  }
`

export const FAQItem = styled.div`
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: ${FORGE_COLORS.sectionBg};
  border-radius: ${FORGE_RADIUS.tag};
  border-left: 4px solid ${FORGE_COLORS.ember};
  transition: ${FORGE_TRANSITIONS.fast};

  &:hover {
    box-shadow: ${FORGE_SHADOWS.card};
  }
`

export const FAQQuestion = styled.h3`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1rem;
  color: ${FORGE_COLORS.textPrimary};
  margin-bottom: 0.5rem;

  ${mq('tablet')} {
    font-size: 1.1rem;
  }
`

export const FAQAnswer = styled.p`
  font-family: ${FORGE_TYPOGRAPHY.body};
  font-size: 0.95rem;
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.7;
  margin: 0;
`
