import { useRef, useEffect, useCallback, useState } from 'react';

/**
 * Hook for managing focus and keyboard navigation
 */
export const useFocusManagement = (activeIndex, totalItems, onIndexChange) => {
  const refs = useRef([]);
  
  useEffect(() => {
    if (refs.current[activeIndex]) {
      refs.current[activeIndex].focus();
    }
  }, [activeIndex]);
  
  const handleKeyDown = useCallback((e) => {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        onIndexChange(activeIndex > 0 ? activeIndex - 1 : totalItems - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        onIndexChange(activeIndex < totalItems - 1 ? activeIndex + 1 : 0);
        break;
      case 'Home':
        e.preventDefault();
        onIndexChange(0);
        break;
      case 'End':
        e.preventDefault();
        onIndexChange(totalItems - 1);
        break;
      default:
        break;
    }
  }, [activeIndex, totalItems, onIndexChange]);
  
  return { refs, handleKeyDown };
};

/**
 * Hook for screen reader announcements
 */
export const useScreenReaderAnnouncements = () => {
  const announce = useCallback((message, priority = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    announcement.style.cssText = `
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0,0,0,0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    `;
    
    document.body.appendChild(announcement);
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);
  
  return announce;
};

/**
 * Hook for reduced motion preference
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};