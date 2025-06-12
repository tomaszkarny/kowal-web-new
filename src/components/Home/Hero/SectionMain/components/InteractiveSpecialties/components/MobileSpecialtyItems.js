import React, { useRef, useEffect, useState, useCallback } from 'react';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { 
  MobileSpecialtyList, 
  MobileSpecialtyItem,
  SwipeableArea
} from '../styles/mobile.styles';
import { useSimpleSwipe, useHapticFeedback } from '../hooks/useSimpleSwipe';

export function MobileSpecialtyItems({ 
  items, 
  activeItem, 
  handleItemChange,
  t 
}) {
  const listRef = useRef(null);
  const activeItemRef = useRef(null);

  // Simplified touch handling
  const triggerHaptic = useHapticFeedback();
  
  // Navigation handlers for swipe
  const goNext = useCallback(() => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx < items.length - 1) {
      handleItemChange(items[idx + 1].id);
    } else {
      handleItemChange(items[0].id); // wrap to first
    }
    triggerHaptic('light');
  }, [items, activeItem, handleItemChange, triggerHaptic]);

  const goPrev = useCallback(() => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx > 0) {
      handleItemChange(items[idx - 1].id);
    } else {
      handleItemChange(items[items.length - 1].id); // wrap to last
    }
    triggerHaptic('light');
  }, [items, activeItem, handleItemChange, triggerHaptic]);

  const swipeHandlers = useSimpleSwipe(goNext, goPrev);


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
    <SwipeableArea
      aria-label="Swipeable specialty items"
      role="region"
    >
      <MobileSpecialtyList 
        ref={listRef}
        role="listbox"
        aria-orientation="horizontal"
        {...swipeHandlers}
        data-swipeable="true"
        data-reduced-motion={prefersReducedMotion ? "true" : "false"}
      >
        {items.map(item => (
          <MobileSpecialtyItem
            key={item.id}
            onClick={() => handleItemChange(item.id)}
            isActive={activeItem === item.id}
            ref={activeItem === item.id ? activeItemRef : null}
            role="option"
            aria-selected={activeItem === item.id}
            tabIndex={activeItem === item.id ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleItemChange(item.id);
                triggerHaptic('light');
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
  );
}
