import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { mq } from 'utils/mediaQueries'
import { slideUp } from 'components/common/animations/animations'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_SPACING,
  FORGE_TYPOGRAPHY,
  FORGE_GRADIENTS,
  FORGE_RADIUS,
} from '../Cities/styles/forgedIronTheme'

/**
 * Outer masonry grid container using CSS column-count.
 * Three columns on desktop (992px+), two on tablet, one on mobile.
 */
export const MasonryGrid = styled.div`
  column-count: 1;
  column-gap: ${FORGE_SPACING.md};
  width: 100%;

  ${mq('tablet')} {
    column-count: 2;
    column-gap: ${FORGE_SPACING.lg};
  }

  ${mq('medium')} {
    column-count: 3;
    column-gap: ${FORGE_SPACING.lg};
  }
`

/**
 * Individual masonry cell — must have break-inside: avoid to prevent
 * a single image from being split across two columns.
 *
 * The visibility / animation state is driven by the `isVisible` prop
 * which is set by the IntersectionObserver in the parent component.
 * Each item has a staggered delay via the `index` prop.
 */
export const MasonryItem = styled.div`
  break-inside: avoid;
  margin-bottom: ${FORGE_SPACING.md};
  display: inline-block;
  width: 100%;
  opacity: 0;
  transform: translateY(10px);

  /* Entrance animation — fires once IntersectionObserver marks visible */
  ${({ isVisible, index }) =>
    isVisible &&
    css`
      animation: ${slideUp} 0.5s ease-out ${Math.min(index * 60, 600)}ms forwards;
    `}

  /* Always show items immediately when reduced motion is preferred */
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
    opacity: 1;
    transform: none;
  }
`

/**
 * The clickable button that wraps each image. Using a <button> gives us
 * keyboard focus and screen-reader semantics for free.
 */
export const ImageButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background: ${FORGE_COLORS.ironDark};
  cursor: pointer;
  overflow: hidden;
  border-radius: ${FORGE_RADIUS.tag};
  box-shadow: ${FORGE_SHADOWS.cardSubtle};
  transition: ${FORGE_TRANSITIONS.smooth};

  /* Lift on hover — only on pointer devices that actually support hover */
  @media (hover: hover) {
    &:hover {
      transform: ${FORGE_HOVER.liftMedium};
      box-shadow: ${FORGE_SHADOWS.cardHover};
    }

    &:hover .masonry-overlay {
      opacity: 1;
    }
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${FORGE_COLORS.ember}, 0 0 0 5px rgba(232, 92, 65, 0.25);
  }

  /* Ensure the GatsbyImage fills the button width */
  .gatsby-image-wrapper {
    display: block;
    width: 100%;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    @media (hover: hover) {
      &:hover {
        transform: none;
      }
    }
  }
`

/**
 * Dark gradient overlay that slides up on hover.
 * Only interactive on devices that support true hover (pointer: fine).
 */
export const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 30%,
    rgba(30, 30, 50, 0.85) 100%
  );
  opacity: 0;
  transition: ${FORGE_TRANSITIONS.opacity};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${FORGE_SPACING.md};
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

/**
 * Title text shown inside the overlay.
 */
export const OverlayTitle = styled.span`
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 0.875rem;
  font-weight: 600;
  color: ${FORGE_COLORS.textOnDark};
  line-height: 1.3;
  margin-bottom: ${FORGE_SPACING.xs};
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
`

/**
 * Category badge pill in ember accent colour.
 */
export const CategoryBadge = styled.span`
  display: inline-block;
  align-self: flex-start;
  padding: 2px ${FORGE_SPACING.xs};
  border-radius: ${FORGE_RADIUS.full};
  font-family: ${FORGE_TYPOGRAPHY.body};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${FORGE_GRADIENTS.emberGradient};
  color: ${FORGE_COLORS.white};
  box-shadow: ${FORGE_SHADOWS.emberButton};
`
