/**
 * ServiceGallery Styles
 * Grid gallery for service pages with Gatsby images
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

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${FORGE_SPACING.lg};

  ${FORGE_MEDIA.laptop} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${FORGE_MEDIA.tablet} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${FORGE_SPACING.md};
  }

  ${FORGE_MEDIA.mobile} {
    grid-template-columns: 1fr;
  }
`

export const GalleryItem = styled.div`
  position: relative;
  border-radius: ${FORGE_RADIUS.card};
  overflow: hidden;
  aspect-ratio: 4 / 3;
  box-shadow: ${FORGE_SHADOWS.card};
  transition: ${FORGE_TRANSITIONS.default};
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;

  /* Staggered animation delays */
  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.15s; }
  &:nth-of-type(3) { animation-delay: 0.2s; }
  &:nth-of-type(4) { animation-delay: 0.25s; }
  &:nth-of-type(5) { animation-delay: 0.3s; }
  &:nth-of-type(6) { animation-delay: 0.35s; }
  &:nth-of-type(7) { animation-delay: 0.4s; }
  &:nth-of-type(8) { animation-delay: 0.45s; }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent 60%,
      rgba(45, 45, 68, 0.3) 100%
    );
    opacity: 0;
    transition: ${FORGE_TRANSITIONS.default};
    pointer-events: none;
  }

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    box-shadow: ${FORGE_SHADOWS.cardHover};

    &::after {
      opacity: 1;
    }
  }

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
  }

  img {
    transition: transform 0.4s ease !important;
  }

  &:hover img {
    transform: scale(1.05);
  }
`

export const GalleryLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: ${FORGE_SPACING.md};
  color: ${FORGE_COLORS.white};
  text-decoration: none;
  opacity: 0;
  transition: ${FORGE_TRANSITIONS.default};
  background: linear-gradient(
    to bottom,
    transparent 40%,
    rgba(45, 45, 68, 0.8) 100%
  );

  ${GalleryItem}:hover & {
    opacity: 1;
  }
`

export const ViewMoreLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: ${FORGE_SPACING.xl};
  color: ${FORGE_COLORS.ember};
  font-weight: 600;
  text-decoration: none;
  transition: ${FORGE_TRANSITIONS.default};
  gap: ${FORGE_SPACING.xs};

  &:hover {
    color: ${FORGE_COLORS.iron};
  }

  svg {
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`
