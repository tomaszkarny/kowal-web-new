import React, { useRef, useEffect, useState } from 'react';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { 
  MobileSpecialtyList, 
  MobileSpecialtyItem,
  SwipeableArea
} from '../styles/mobile.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ArrowButton } from './MobileSpecialtyItems.styles';

export const MobileSpecialtyItems = ({ 
  items, 
  activeItem, 
  handleItemChange,
  t 
}) => {
  const listRef = useRef(null);
  const activeItemRef = useRef(null);

  // Arrow navigation handlers
  const goPrev = () => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx > 0) handleItemChange(items[idx - 1].id);
    else handleItemChange(items[items.length - 1].id); // wrap
  };
  const goNext = () => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx < items.length - 1) handleItemChange(items[idx + 1].id);
    else handleItemChange(items[0].id); // wrap
  };


  useEffect(() => {
    if (activeItemRef.current && listRef.current) {
      const container = listRef.current;
      const activeElement = activeItemRef.current;
      
      // Calculate position to center the active item
      const scrollLeft = activeElement.offsetLeft - (container.clientWidth / 2) + (activeElement.clientWidth / 2);
      
      // Smooth scroll to the position
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeItem]);

  // Enhanced touch handling for better mobile experience
  const [touchData, setTouchData] = useState({
    startX: null,
    startY: null,
    startTime: null,
    isSwiping: false
  });

  // Detection thresholds
  const SWIPE_THRESHOLD = 40; // Min distance for a swipe
  const SWIPE_TIMEOUT = 300; // Max time in ms for a swipe
  const TAP_THRESHOLD = 10; // Max movement for a tap
  
  // Handle touch start for swipe detection
  const handleTouchStart = (e) => {
    // Store initial touch data
    setTouchData({
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY,
      startTime: Date.now(),
      isSwiping: false
    });
  };

  // Handle touch move for detecting active swipe
  const handleTouchMove = (e) => {
    if (!touchData.startX) return;
    
    const currentX = e.touches[0].clientX;
    const diffX = currentX - touchData.startX;
    
    // If significant horizontal movement detected, mark as swiping
    if (Math.abs(diffX) > TAP_THRESHOLD) {
      setTouchData(prev => ({ ...prev, isSwiping: true }));
      
      // Optionally add visual feedback during swipe
      // could add transform: translateX() for drag effect
    }
  };

  // Handle touch end for completing swipe or tap actions
  const handleTouchEnd = (e, id) => {
    if (!touchData.startX) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchData.startX;
    const timeDiff = Date.now() - touchData.startTime;
    
    // Check for swipe based on distance, time, and swipe flag
    const isSwipe = Math.abs(diffX) > SWIPE_THRESHOLD && 
                  timeDiff < SWIPE_TIMEOUT &&
                  touchData.isSwiping;
    
    if (isSwipe) {
      // Handle swipe based on direction
      if (diffX > 0) {
        // Right swipe - go to previous
        goPrev();
      } else {
        // Left swipe - go to next
        goNext();
      }
      // Prevent click from firing
      e.preventDefault();
    } else if (!touchData.isSwiping && Math.abs(diffX) < TAP_THRESHOLD) {
      // If it's a tap (minimal movement), handle as click
      handleItemChange(id);
    }
    
    // Reset touch data
    setTouchData({
      startX: null,
      startY: null,
      startTime: null,
      isSwiping: false
    });
  };

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

  return (
    <div 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
      className="mobile-specialty-controls"
    >
      <ArrowButton
        aria-label="Previous specialty"
        onClick={goPrev}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </ArrowButton>
      <SwipeableArea
        aria-label="Swipeable specialty items"
        role="region"
      >
        <MobileSpecialtyList 
          ref={listRef}
          role="listbox"
          aria-orientation="horizontal"
          // Add swipe event handlers at the list level
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => handleTouchEnd(e, activeItem)} // Default to active item
          // Optional data attributes for dev debugging
          data-swipeable="true"
          data-reduced-motion={prefersReducedMotion ? "true" : "false"}
        >
          {items.map(item => (
            <MobileSpecialtyItem
              key={item.id}
              onClick={() => handleItemChange(item.id)}
              // Individual item touch events
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={(e) => handleTouchEnd(e, item.id)}
              isActive={activeItem === item.id}
              ref={activeItem === item.id ? activeItemRef : null}
              role="option"
              aria-selected={activeItem === item.id}
              tabIndex={activeItem === item.id ? 0 : -1}
              // Add keyboard handling for accessibility
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleItemChange(item.id);
                }
              }}
            >
              <StyledIcon
                icon={item.icon}
                fixedWidth={item.fixedWidth}
                aria-hidden="true" // Hide icon from screen readers
              />
              <span>{t(item.translationKey, item.text)}</span>
            </MobileSpecialtyItem>
          ))}
        </MobileSpecialtyList>
      </SwipeableArea>
      <ArrowButton
        aria-label="Next specialty"
        onClick={goNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ArrowButton>
    </div>
  );
};
