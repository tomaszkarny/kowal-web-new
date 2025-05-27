import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

/**
 * Placeholder for loading state
 */
const ImagePlaceholder = styled.div`
  background: ${({ theme }) => theme.color?.lightGray || '#f0f0f0'};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  
  ${({ isLoading }) => isLoading && css`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.5) 50%,
        transparent 100%
      );
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `}
`

/**
 * Wrapper for lazy loaded images
 */
const LazyImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.color?.lightGray || '#f0f0f0'};
`

/**
 * Styled image with fade-in effect
 */
const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  opacity: ${({ loaded }) => loaded ? 1 : 0};
  transition: opacity 0.5s ease-in-out;
`

/**
 * LazyImage component with Intersection Observer
 * Provides advanced lazy loading with loading states and smooth transitions
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.width - Image width
 * @param {string} props.height - Image height
 * @param {string} props.className - Additional CSS classes
 * @param {function} props.onLoad - Callback when image loads
 * @param {boolean} props.eager - If true, loads immediately without lazy loading
 */
export function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  onLoad,
  eager = false,
  ...props 
}) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef(null)
  const observerRef = useRef(null)
  
  useEffect(() => {
    // If eager loading, load immediately
    if (eager) {
      setIsIntersecting(true)
      return
    }
    
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true)
      return
    }
    
    // Create observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsIntersecting(true)
            // Disconnect after first intersection
            if (observerRef.current && entry.target) {
              observerRef.current.unobserve(entry.target)
            }
          }
        })
      },
      {
        // Load images 100px before they enter viewport
        rootMargin: '100px',
        threshold: 0.01
      }
    )
    
    // Start observing
    if (imgRef.current) {
      observerRef.current.observe(imgRef.current)
    }
    
    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [eager])
  
  const handleLoad = () => {
    setIsLoaded(true)
    if (onLoad) onLoad()
  }
  
  // Calculate aspect ratio for proper placeholder sizing
  const aspectRatio = height && width ? (height / width) * 100 : 56.25 // Default to 16:9
  
  return (
    <LazyImageWrapper 
      ref={imgRef}
      className={className}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {!isLoaded && (
        <ImagePlaceholder isLoading={isIntersecting} />
      )}
      {isIntersecting && (
        <StyledImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          loaded={isLoaded}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
    </LazyImageWrapper>
  )
}

export default LazyImage