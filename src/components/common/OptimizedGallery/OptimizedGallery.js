import React, { useState, useCallback } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

/**
 * Grid container for gallery images
 */
const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 0.75rem;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.small}px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`

/**
 * Image wrapper with hover effects
 */
const ImageWrapper = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.primary};
    outline-offset: 2px;
  }
  
  .gatsby-image-wrapper {
    height: 100%;
  }
`

/**
 * Overlay that appears on hover
 */
const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  
  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`

/**
 * Caption text on hover
 */
const ImageCaption = styled.span`
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`

/**
 * Loading skeleton
 */
const SkeletonLoader = styled.div`
  width: 100%;
  padding-bottom: 75%; // 4:3 aspect ratio
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`

/**
 * Optimized Gallery Component using GatsbyImage
 * Provides better performance than react-photo-gallery with Gatsby's image optimization
 * 
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image nodes with gatsbyImageData
 * @param {boolean} props.showCaptions - Whether to show captions on hover
 * @param {number} props.columns - Number of columns (uses CSS Grid auto-fill by default)
 */
export function OptimizedGallery({ 
  images = [], 
  showCaptions = true,
  columns,
  ...props 
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  
  const openLightbox = useCallback((index) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }, [])
  
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])
  
  // Prepare images for lightbox
  const lightboxImages = images.map(img => {
    const image = getImage(img.node || img)
    return image?.images?.fallback?.src || ''
  })
  
  // Custom grid columns if specified
  const gridStyle = columns ? {
    gridTemplateColumns: `repeat(${columns}, 1fr)`
  } : {}
  
  return (
    <>
      <GalleryGrid style={gridStyle} {...props}>
        {images.map((imageData, index) => {
          const image = getImage(imageData.node || imageData)
          const alt = imageData.alt || imageData.node?.alt || `Gallery image ${index + 1}`
          const caption = imageData.caption || imageData.node?.caption || alt
          
          if (!image) {
            return <SkeletonLoader key={index} />
          }
          
          return (
            <ImageWrapper
              key={index}
              onClick={() => openLightbox(index)}
              aria-label={`View ${alt} in fullscreen`}
            >
              <GatsbyImage
                image={image}
                alt={alt}
                loading="lazy"
                objectFit="cover"
              />
              {showCaptions && (
                <ImageOverlay>
                  <ImageCaption>{caption}</ImageCaption>
                </ImageOverlay>
              )}
            </ImageWrapper>
          )
        })}
      </GalleryGrid>
      
      {lightboxOpen && lightboxImages.length > 0 && (
        <Lightbox
          mainSrc={lightboxImages[photoIndex]}
          nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
          prevSrc={lightboxImages[(photoIndex + lightboxImages.length - 1) % lightboxImages.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + lightboxImages.length - 1) % lightboxImages.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % lightboxImages.length)
          }
          imageTitle={images[photoIndex]?.alt || images[photoIndex]?.node?.alt}
          imageCaption={images[photoIndex]?.caption || images[photoIndex]?.node?.caption}
        />
      )}
    </>
  )
}

export default OptimizedGallery