import { useState, useEffect } from 'react';

/**
 * Custom hook to track page visibility
 * Pauses expensive operations when page is not visible
 */
export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(() => {
    // Safe check for SSR
    if (typeof document === 'undefined') return true;
    return !document.hidden;
  });

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return isVisible;
};

/**
 * Custom hook for debounced resize events
 * Prevents excessive re-renders on window resize
 */
export const useDebouncedResize = (callback, delay = 250) => {
  useEffect(() => {
    let timeoutId;
    
    const debouncedCallback = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };

    window.addEventListener('resize', debouncedCallback, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedCallback);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};