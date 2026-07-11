import React, { useEffect, useRef, useState, useCallback } from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import {
  MasonryGrid,
  MasonryItem,
  ImageButton,
  ImageOverlay,
  OverlayTitle,
  CategoryBadge,
} from './MasonryGallery.styles'

/**
 * MasonryGallery
 *
 * CSS column-count masonry layout with GatsbyImage for every photo.
 * Staggered entrance animation via IntersectionObserver.
 * Hover overlay (title + category badge) is hidden on touch-only devices
 * via `@media (hover: hover)` in the styles file.
 *
 * Props:
 *   images        {Array}    Array of { node: { childImageSharp, name }, alt, title, category }
 *   onImageClick  {Function} Called with the numeric index of the clicked image
 */
export function MasonryGallery({ images = [], onImageClick }) {
  const { t } = useTranslation('gallery')

  // Track which items have entered the viewport for staggered animation.
  // We use a Set stored in state; IntersectionObserver adds indices as items appear.
  const [visibleItems, setVisibleItems] = useState(new Set())
  const itemRefs = useRef([])

  // Build refs array to match images length
  if (itemRefs.current.length !== images.length) {
    itemRefs.current = Array.from({ length: images.length }, () => null)
  }

  const handleClick = useCallback(
    (index) => {
      if (onImageClick) onImageClick(index)
    },
    [onImageClick]
  )

  // IntersectionObserver: mark each item visible as it enters the viewport.
  // prefers-reduced-motion check is handled in CSS (animation: none).
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.masonryIndex)
            setVisibleItems((prev) => {
              if (prev.has(idx)) return prev
              const next = new Set(prev)
              next.add(idx)
              return next
            })
            // Once visible, no need to keep observing
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      }
    )

    const currentRefs = itemRefs.current
    currentRefs.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      currentRefs.forEach((el) => {
        if (el) observer.unobserve(el)
      })
    }
  }, [images]) // re-run when images array changes (filter change)

  if (!images.length) return null

  return (
    <MasonryGrid role="list" aria-label="Gallery images">
      {images.map((photo, index) => {
        // Support both object shapes:
        //   { node: { childImageSharp, name }, alt, title, category }  — GalleryPage shape
        //   { childImageSharp, name, alt, title, category }            — flat shape
        const node = photo.node || photo
        const imageData = getImage(node.childImageSharp)
        const alt = photo.alt || node.name || `Gallery image ${index + 1}`
        const title = photo.title || alt
        const category = photo.category || ''
        const categoryLabel = category ? t(`categories.${category}`, category) : ''

        if (!imageData) return null

        return (
          <MasonryItem
            key={node.id || `masonry-item-${index}`}
            role="listitem"
            ref={(el) => {
              itemRefs.current[index] = el
            }}
            data-masonry-index={index}
            isVisible={visibleItems.has(index)}
            index={index}
          >
            <ImageButton
              type="button"
              onClick={() => handleClick(index)}
              aria-label={t('imageClickToEnlarge', { name: alt, defaultValue: '{{name}} — click to enlarge' })}
            >
              <GatsbyImage
                image={imageData}
                alt={alt}
                loading={index < 6 ? 'eager' : 'lazy'}
              />

              {/* Overlay — opacity controlled by CSS @media (hover: hover) + :hover */}
              <ImageOverlay className="masonry-overlay" aria-hidden="true">
                <OverlayTitle>{title}</OverlayTitle>
                {categoryLabel && <CategoryBadge>{categoryLabel}</CategoryBadge>}
              </ImageOverlay>
            </ImageButton>
          </MasonryItem>
        )
      })}
    </MasonryGrid>
  )
}

export default MasonryGallery
