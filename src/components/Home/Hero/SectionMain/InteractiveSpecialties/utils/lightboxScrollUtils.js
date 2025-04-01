/**
 * Utility functions for handling scroll management with lightbox
 */

export const handleLightboxClose = (
  scrollPosRef, 
  setIsViewerOpen, 
  setFadeOut, 
  startProgressAndAutoCycle
) => {
  // Prevent default scroll behavior by keeping the exact same scroll position
  const currentPos = window.scrollY;
  const preventScroll = () => window.scrollTo(0, currentPos);
  
  // Add temporary listeners to block any scroll changes during lightbox close
  window.addEventListener('scroll', preventScroll, { passive: false });
  document.body.style.overflow = 'hidden'; // Prevent body scroll
  
  // Close lightbox and restart cycle
  setIsViewerOpen(false);
  setFadeOut(false);
  
  // Remove the scroll prevention after a short delay
  setTimeout(() => {
    window.removeEventListener('scroll', preventScroll);
    document.body.style.overflow = ''; // Restore scrolling
    window.scrollTo({
      top: scrollPosRef.current,
      behavior: 'auto'
    });
    
    // Only restart cycle after scroll is restored
    startProgressAndAutoCycle();
  }, 100);
};

export const openLightbox = (
  autoTimerRef,
  progressTimerRef,
  scrollPosRef,
  hasOpenedLightbox,
  activeItem,
  setCurrentSlide,
  setIsViewerOpen
) => {
  // Clear timers to prevent auto-cycle interference while Lightbox is open
  if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
  if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  
  // Store current scroll position in ref
  scrollPosRef.current = window.scrollY;
  hasOpenedLightbox.current = true;
  setCurrentSlide(activeItem - 1);
  setIsViewerOpen(true);
};
