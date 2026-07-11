import styled from '@emotion/styled'
import { FORGE_COLORS, FORGE_SPACING } from '../Cities/styles/forgedIronTheme'

// ---------------------------------------------------------------------------
// Gallery grid section — wraps MasonryGallery with transition support
// ---------------------------------------------------------------------------

export const GalleryGridSection = styled.section`
  padding: ${FORGE_SPACING.xl} 0 ${FORGE_SPACING.xxl};
  opacity: ${({ isTransitioning }) => (isTransitioning ? '0' : '1')};
  transform: ${({ isTransitioning }) => (isTransitioning ? 'scale(0.98)' : 'scale(1)')};
  transition: opacity 200ms ease, transform 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
`

export const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${FORGE_COLORS.sectionBg};
  border-radius: 4px;
  color: ${FORGE_COLORS.textSecondary};
  font-size: 1.1rem;
`
