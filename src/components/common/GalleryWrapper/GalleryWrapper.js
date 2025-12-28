import React, { useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
// Simple animation imports not needed anymore
import { THEME } from 'consts/theme'

/**
 * Styled wrapper for enhanced gallery images with animations
 */
const AnimatedImage = styled.img`
  transition: transform 0.3s ease, 
              box-shadow 0.3s ease;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.03) translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
  
  &:focus-visible {
    outline: 2px solid ${THEME.color.primary};
    outline-offset: 2px;
    transform: scale(1.03);
    box-shadow: 0 0 0 4px rgba(232, 92, 65, 0.2);
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.3s ease;
    &:hover, &:focus {
      transform: none;
    }
  }
`

/**
 * Custom image renderer for Gallery component
 */
const imageRenderer = ({ index, photo, margin, direction, top, left, onClick }) => {
  const imgStyle = { margin, display: 'block', cursor: 'pointer' }
  if (direction === 'column') {
    imgStyle.position = 'absolute'
    imgStyle.left = left
    imgStyle.top = top
  }
  
  return (
    <AnimatedImage
      key={index}
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt || ''}
      title={photo.title || ''}
      onClick={(e) => onClick && onClick(e, { index })}
      style={imgStyle}
      loading="lazy"
      tabIndex={0}
    />
  )
}

/**
 * Wrapper component for react-photo-gallery to handle the gallery functionality
 * while addressing common issues and warnings.
 * 
 * This component handles:
 * 1. The defaultProps warning in memo components (from react-photo-gallery)
 * 2. Proper prop forwarding with sensible defaults
 * 3. Ensures consistent rendering across different screen sizes
 * 4. Adds hover/focus animations to gallery images
 */
export function GalleryWrapper({
  photos,
  onClick,
  margin = 2,
  targetRowHeight = 300,
  columns = undefined,
  direction = 'row',
  renderImage = undefined
}) {
  const [mounted, setMounted] = useState(false);
  
  // Suppress console warnings from third-party libraries
  useEffect(() => {
    // Save original console.error
    const originalConsoleError = console.error;
    
    // Replace console.error with a filtered version
    console.error = (...args) => {
      // Filter out defaultProps warning for memo components
      if (args[0] && typeof args[0] === 'string' && 
          args[0].includes('defaultProps will be removed from memo components')) {
        return;
      }
      originalConsoleError(...args);
    };
    
    setMounted(true);
    
    // Clean up: restore original console.error when component unmounts
    return () => {
      console.error = originalConsoleError;
    };
  }, []);
  
  if (!mounted) return null;
  
  // Create a clean props object to avoid passing unwanted props
  const galleryProps = {
    photos,
    onClick,
    margin,
    targetRowHeight,
    direction,
    renderImage: renderImage || imageRenderer  // Use our custom renderer by default
  };
  
  // Only add optional props if they are explicitly specified
  if (columns !== undefined) galleryProps.columns = columns;

  return <Gallery {...galleryProps} />;
}
