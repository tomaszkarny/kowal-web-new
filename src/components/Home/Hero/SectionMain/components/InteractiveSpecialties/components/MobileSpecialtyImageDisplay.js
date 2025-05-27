import React, { useRef, useState, useEffect, useCallback } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {
  MobileImageContainer,
  MobileSpecialtyImage,
  SwipeInstruction,
  SwipeIndicator,
  SpecialtyCaption
} from '../styles/mobile.styles';
import { useSimpleSwipe, useHapticFeedback } from '../hooks/useSimpleSwipe';

export const MobileSpecialtyImageDisplay = ({
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox,
  handleItemChange,
  t
}) => {
  // Simplified touch handling
  const triggerHaptic = useHapticFeedback();
  
  // Navigation handlers
  const goNext = useCallback(() => {
    const maxItem = Math.max(...Object.keys(imageMap).map(Number));
    const nextItemId = Math.min(activeItem + 1, maxItem);
    if (nextItemId !== activeItem) {
      handleItemChange(nextItemId);
      triggerHaptic('light');
    }
  }, [activeItem, imageMap, handleItemChange, triggerHaptic]);

  const goPrev = useCallback(() => {
    const nextItemId = Math.max(activeItem - 1, 1);
    if (nextItemId !== activeItem) {
      handleItemChange(nextItemId);
      triggerHaptic('light');
    }
  }, [activeItem, handleItemChange, triggerHaptic]);

  // Simple swipe handlers
  const swipeHandlers = useSimpleSwipe(goNext, goPrev, 60);
  
  // Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    // Check if the user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    // Add listener for changes to motion preference
    const handleMotionPreferenceChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
    };
  }, []);

  // Tap handler for opening lightbox
  const handleTap = useCallback((e) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    e.stopPropagation();
    openLightbox(null, activeItem - 1);
    triggerHaptic('medium');
  }, [openLightbox, activeItem, triggerHaptic]);
  
  return (
    <>
      <MobileImageContainer>
        <MobileSpecialtyImage
          className={fadeOut ? 'fade-out' : 'fade-in'}
          {...swipeHandlers}
          onClick={handleTap}
          role="img"
          aria-label={labelMap[activeItem]}
          data-swipeable="true"
          data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        >
          
          {imageMap[activeItem] ? (
            <GatsbyImage
              image={getImage(imageMap[activeItem])}
              alt={labelMap[activeItem]}
              className="specialty-image"
              objectFit="contain"
              objectPosition="center"
              loading="eager"
              fadeIn={false}
              placeholder="none"
              onClick={handleTap}
            />
          ) : (
            <div>Image not found</div>
          )}
        </MobileSpecialtyImage>
      </MobileImageContainer>
      
      {/* Caption text moved below the image */}
      <SpecialtyCaption>
        {labelMap[activeItem]}
      </SpecialtyCaption>

      <SwipeInstruction>
        <FontAwesomeIcon icon={faHandPointer} />
        {t('swipe_instruction', 'Swipe to change, tap to view full size')}
      </SwipeInstruction>
    </>
  );
};
