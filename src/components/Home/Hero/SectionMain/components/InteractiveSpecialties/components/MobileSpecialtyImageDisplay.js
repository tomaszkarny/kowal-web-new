import React, { useRef, useState, useEffect } from 'react';
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

export const MobileSpecialtyImageDisplay = ({
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox,
  handleItemChange,
  t
}) => {
  // Enhanced touch state tracking
  const [touchData, setTouchData] = useState({
    startX: null,
    startY: null,
    currentX: null,
    currentY: null,
    startTime: null,
    isSwiping: false,
    direction: null
  });
  
  // Visual feedback for swiping
  const [swipeFeedback, setSwipeFeedback] = useState({
    isActive: false,
    direction: null,
    strength: 0
  });
  
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

  // Constants for touch detection
  const SWIPE_THRESHOLD = 60; // Min distance for a swipe
  const SWIPE_TIMEOUT = 300; // Max time in ms for a swipe
  const TAP_THRESHOLD = 10; // Max movement for a tap
  
  // Handle touch start for image swipes
  const handleTouchStart = (e) => {
    // Store comprehensive touch start data
    setTouchData({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      currentX: e.touches[0].clientX,
      currentY: e.touches[0].clientY,
      startTime: Date.now(),
      isSwiping: false,
      direction: null
    });
    
    // Reset swipe feedback
    setSwipeFeedback({
      isActive: false,
      direction: null,
      strength: 0
    });
  };
  
  // Handle touch move with improved visual feedback
  const handleTouchMove = (e) => {
    if (!touchData.startX) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchData.startX;
    const diffY = currentY - touchData.startY;
    
    // Only process if mostly horizontal movement (prevent scrolling conflicts)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Prevent default to stop scrolling
      e.preventDefault();
      
      // Update touch tracking data
      setTouchData(prev => ({
        ...prev,
        currentX,
        currentY,
        isSwiping: Math.abs(diffX) > TAP_THRESHOLD,
        direction: diffX > 0 ? 'right' : 'left'
      }));
      
      // Calculate swipe strength as a percentage (max 100%)
      const strength = Math.min(Math.abs(diffX) / SWIPE_THRESHOLD, 1);
      
      // Only show visual feedback if we're actually swiping and not in reduced motion mode
      if (Math.abs(diffX) > TAP_THRESHOLD && !prefersReducedMotion) {
        setSwipeFeedback({
          isActive: true,
          direction: diffX > 0 ? 'right' : 'left',
          strength
        });
      }
    }
  };

  // Handle touch end with improved logic
  const handleTouchEnd = (e) => {
    // If we don't have start data, bail early
    if (!touchData.startX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchData.startX;
    const timeDiff = Date.now() - touchData.startTime;
    
    // Determine if this is a valid swipe gesture
    const isSwipe = Math.abs(diffX) > SWIPE_THRESHOLD && 
                    timeDiff < SWIPE_TIMEOUT &&
                    touchData.isSwiping;
    
    if (isSwipe) {
      // Calculate next item based on swipe direction
      // Get the max item ID from the Object.keys of imageMap
      const maxItem = Math.max(...Object.keys(imageMap).map(Number));
      const nextItemId = diffX < 0
        ? Math.min(activeItem + 1, maxItem) // Swipe left, go to next
        : Math.max(activeItem - 1, 1); // Swipe right, go to previous
      
      // Only change if it's different
      if (nextItemId !== activeItem) {
        handleItemChange(nextItemId);
      }
    } else if (!touchData.isSwiping && Math.abs(diffX) < TAP_THRESHOLD) {
      // If it's a tap (minimal movement), open lightbox
      openLightbox(null, activeItem - 1); // Adjust index for lightbox
      e.preventDefault(); // Prevent default behavior
    }

    // Always reset touch and feedback state
    setTouchData({
      startX: null,
      startY: null,
      currentX: null,
      currentY: null,
      startTime: null,
      isSwiping: false,
      direction: null
    });
    
    setSwipeFeedback({
      isActive: false,
      direction: null,
      strength: 0
    });
  };
  // Generate dynamic styles for swipe visual feedback
  const getSwipeStyles = () => {
    if (!swipeFeedback.isActive || prefersReducedMotion) return {};
    
    // Calculate transform based on swipe direction and strength
    const translateX = swipeFeedback.direction === 'right' 
      ? `${swipeFeedback.strength * 15}px` 
      : `${-swipeFeedback.strength * 15}px`;
    
    return {
      transform: `translateX(${translateX})`,
      transition: 'transform 0.1s ease-out'
    };
  };
  
  return (
    <>
      <MobileImageContainer>
        <MobileSpecialtyImage
          className={fadeOut ? 'fade-out' : 'fade-in'}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            // Prevent default to avoid scrolling
            e.preventDefault();
            // Open lightbox with current image
            openLightbox(null, activeItem - 1);
          }}
          style={getSwipeStyles()}
          role="img"
          aria-label={labelMap[activeItem]}
          data-swipeable="true"
          data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        >
          {/* Swipe indicators that appear during active swipe */}
          {swipeFeedback.isActive && !prefersReducedMotion && (
            <>
              <SwipeIndicator 
                className={`left ${swipeFeedback.direction === 'right' ? 'active' : ''}`}
                style={{ opacity: swipeFeedback.direction === 'right' ? swipeFeedback.strength : 0 }}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </SwipeIndicator>
              <SwipeIndicator 
                className={`right ${swipeFeedback.direction === 'left' ? 'active' : ''}`}
                style={{ opacity: swipeFeedback.direction === 'left' ? swipeFeedback.strength : 0 }}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </SwipeIndicator>
            </>
          )}
          
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
              onClick={(e) => {
                // Only handle tap events, not swipes
                if (!touchData.isSwiping) {
                  // Stop propagation to prevent multiple handlers from firing
                  e.stopPropagation();
                  // Prevent default to avoid scrolling
                  e.preventDefault();
                  // Open lightbox with current image
                  openLightbox(null, activeItem - 1);
                }
              }}
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
