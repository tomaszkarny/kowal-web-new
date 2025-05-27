import { useRef, useMemo, useCallback } from 'react';

/**
 * Simplified swipe hook for better performance
 * Removes complex state tracking in favor of simple touch detection
 */
export const useSimpleSwipe = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const touchStart = useRef(null);
  const touchTime = useRef(null);

  const handlers = useMemo(() => ({
    onTouchStart: (e) => {
      touchStart.current = e.touches[0].clientX;
      touchTime.current = Date.now();
    },
    
    onTouchEnd: (e) => {
      if (!touchStart.current) return;
      
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchEnd - touchStart.current;
      const timeDiff = Date.now() - touchTime.current;
      
      // Only process if it's a quick swipe (< 300ms) and significant distance
      if (Math.abs(diff) > threshold && timeDiff < 300) {
        if (diff > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
        // Prevent any other touch events from firing
        if (e.cancelable) {
          e.preventDefault();
        }
        e.stopPropagation();
      }
      
      // Reset
      touchStart.current = null;
      touchTime.current = null;
    },
    
    onTouchMove: (e) => {
      // Prevent scrolling during horizontal swipes
      if (touchStart.current) {
        const currentX = e.touches[0].clientX;
        const diff = Math.abs(currentX - touchStart.current);
        
        if (diff > 10) {
          // Only preventDefault if we can
          if (e.cancelable) {
            e.preventDefault();
          }
        }
      }
    }
  }), [onSwipeLeft, onSwipeRight, threshold]);
  
  return handlers;
};

/**
 * Hook for haptic feedback (where supported)
 */
export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((type = 'light') => {
    if (navigator.vibrate && 'ontouchstart' in window) {
      switch(type) {
        case 'light': 
          navigator.vibrate(10); 
          break;
        case 'medium': 
          navigator.vibrate(50); 
          break;
        case 'heavy': 
          navigator.vibrate(100); 
          break;
        default:
          break;
      }
    }
  }, []);
  
  return triggerHaptic;
};