import React, { useEffect, useState } from 'react'
import Gallery from 'react-photo-gallery'

/**
 * Wrapper component for react-photo-gallery to handle the gallery functionality
 * while addressing common issues and warnings.
 * 
 * This component handles:
 * 1. The defaultProps warning in memo components (from react-photo-gallery)
 * 2. Proper prop forwarding with sensible defaults
 * 3. Ensures consistent rendering across different screen sizes
 */
export const GalleryWrapper = ({
  photos,
  onClick,
  margin = 2,
  targetRowHeight = 300,
  columns = undefined,
  direction = 'row',
  renderImage = undefined
}) => {
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
    direction
  };
  
  // Only add optional props if they are explicitly specified
  if (columns !== undefined) galleryProps.columns = columns;
  if (renderImage !== undefined) galleryProps.renderImage = renderImage;

  return <Gallery {...galleryProps} />;
}
