import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';

export function SpecialtyLightbox({
  isViewerOpen,
  currentSlide,
  lightboxPhotos,
  scrollPosRef,
  setIsViewerOpen,
  setFadeOut,
  setCurrentSlide,
  startProgressAndAutoCycle,
  lightboxSettings
}) {
  if (!isViewerOpen) return null;
  
  return (
    <Lightbox
      open={isViewerOpen}
      index={currentSlide}
      slides={lightboxPhotos}
      plugins={[Captions]}
      captions={lightboxSettings.captions}
      close={() => {
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
      }}
      on={{
        view: ({ index }) => {
          setCurrentSlide(index);
        }
      }}
      animation={lightboxSettings.animation} 
      carousel={lightboxSettings.carousel}
      styles={lightboxSettings.styles}
    />
  );
}
