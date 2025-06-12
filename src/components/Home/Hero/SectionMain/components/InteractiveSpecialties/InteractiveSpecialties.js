import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Import modern lightbox library
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Import styles
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { SectionHeading, HelpText } from '../../SectionMain.styles';
import { SpecialtyContainer, SpecialtyContent } from './InteractiveSpecialties.styles';

// Import custom performance hooks
import { usePageVisibility, useDebouncedResize } from './hooks/usePageVisibility';

// Import data
import { ListItemData } from './data/ListItemData';
import { config } from './data/configData';

// Import utility functions
import { startAutoCycleTimer } from './utils/timerUtils';
import {
  createImageAndLabelMaps,
  createLightboxPhotos
} from './utils/lightboxUtils';
import { handleKeyNavigation } from './utils/navigationUtils';

// Import desktop components
import { SpecialtyItems } from './components/SpecialtyItems';
import { ProgressDots } from './components/ProgressDots';
import { SpecialtyImageDisplay } from './components/SpecialtyImageDisplay';

// Import mobile components
import { MobileSpecialtyContainer } from './components/MobileSpecialtyContainer';

/**
 * Interactive specialties component with enhanced UI elements and animations
 */
export function InteractiveSpecialties() {
  // State management
  const [activeItem, setActiveItem] = useState(1); // Default to first item
  const [progress, setProgress] = useState(0); // Progress for auto-cycling
  const [fadeOut, setFadeOut] = useState(false); // Handle fade-out effect
  const [viewerIsOpen, setViewerIsOpen] = useState(false); // Lightbox open state
  const [currentImage, setCurrentImage] = useState(0); // Current slide index for lightbox

  // Refs
  const autoTimerRef = useRef(null); // Reference to the auto-cycle timer
  const progressTimerRef = useRef(null); // Reference for progress bar updates
  const specialtyContainerRef = useRef(null); // Reference to the specialty container

  // Translation hook
  const { t } = useTranslation('common');

  // Performance hooks
  const isPageVisible = usePageVisibility();

  // Optimized images query with better performance settings
  const data = useStaticQuery(graphql`
    query OptimizedSpecialtyImages {
      gates: file(relativePath: { eq: "gallery/bramy3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 350,
            height: 280,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 700, 1050]
          )
          original {
            src
            width
            height
          }
        }
      }
      railings: file(relativePath: { eq: "gallery/balu3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 350,
            height: 280,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 700, 1050]
          )
          original {
            src
            width
            height
          }
        }
      }
      fences: file(relativePath: { eq: "gallery/ogrodz2.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 350,
            height: 280,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 700, 1050]
          )
          original {
            src
            width
            height
          }
        }
      }
      gratings: file(relativePath: { eq: "gallery/ogrodz6.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 350,
            height: 280,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 700, 1050]
          )
          original {
            src
            width
            height
          }
        }
      }
      decorative: file(relativePath: { eq: "gallery/elo3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 350,
            height: 280,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 700, 1050]
          )
          original {
            src
            width
            height
          }
        }
      }
    }
  `);

  // Memoized image and label maps for performance
  const { imageMap, labelMap } = useMemo(() => 
    createImageAndLabelMaps(data, t), 
    [data, t]
  );

  // Memoized lightbox photos array
  const lightboxPhotos = useMemo(() => 
    createLightboxPhotos(imageMap, labelMap), 
    [imageMap, labelMap]
  );

  // Handle changing the active item
  const handleItemChange = useCallback((id) => {
    // Don't do anything if the same item is clicked
    if (id === activeItem) return;

    // Reset auto-cycle timer when user interacts
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    // Immediately change the active item with minimal transition
    setActiveItem(id);

    // Reset progress
    setProgress(0);
    startProgressAndAutoCycle();
  }, [activeItem]);

  // Use the same direct handler for both hover and click
  const handleMouseEnter = handleItemChange;

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e, id) => {
    handleKeyNavigation(e, id, activeItem, ListItemData, handleItemChange);
  }, [activeItem, handleItemChange]);

  // Optimized timer management with visibility API
  const startProgressAndAutoCycle = useCallback(() => {
    // Only start timers if page is visible
    if (!isPageVisible) return;

    const { cycleDuration, updateInterval, fadeDuration } = config;
    const totalSteps = cycleDuration / updateInterval;
    let currentStep = 0;

    // Clear existing timers
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

    // Progress bar timer - reduced frequency for better performance
    progressTimerRef.current = setInterval(() => {
      // Check visibility before updating
      if (!document.hidden) {
        currentStep += 1;
        setProgress((currentStep / totalSteps) * 100);

        if (currentStep >= totalSteps) {
          clearInterval(progressTimerRef.current);
        }
      }
    }, updateInterval);

    // Auto-cycle timer - use imported function
    autoTimerRef.current = startAutoCycleTimer(
      cycleDuration,
      fadeDuration,
      activeItem,
      ListItemData,
      setFadeOut,
      setActiveItem,
      setProgress,
      startProgressAndAutoCycle
    );
  }, [activeItem, isPageVisible]);

  // Clear timers when page becomes hidden
  useEffect(() => {
    if (!isPageVisible) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    } else {
      // Restart timers when page becomes visible again
      startProgressAndAutoCycle();
    }
  }, [isPageVisible, startProgressAndAutoCycle]);

  // Open lightbox handler
  const openLightbox = useCallback((_, photoProps) => {
    // If no specific index is provided, use the activeItem as the index
    // This ensures the lightbox shows the currently active image
    let index = activeItem - 1; // Default: subtract 1 because activeItem is 1-indexed but lightbox is 0-indexed
    
    if (photoProps !== undefined) {
      index = typeof photoProps === 'object' ? photoProps.index : photoProps;
    }

    // Prevent scrolling to top when opening lightbox
    if (typeof window !== 'undefined') {
      // Save current scroll position
      const { scrollY } = window;

      // Set timeout to restore scroll position after state updates
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }

    setCurrentImage(index);
    setViewerIsOpen(true);
    // Pause auto-cycling when lightbox is open
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, [activeItem]);

  // Close lightbox handler
  const closeLightbox = useCallback(() => {
    setViewerIsOpen(false);
    // Resume auto-cycling
    startProgressAndAutoCycle();
  }, [startProgressAndAutoCycle]);

  // Add state for viewport detection
  const [isMobileView, setIsMobileView] = useState(null);

  // Optimized viewport detection with debounced resize
  const handleResize = useCallback(() => {
    // Use 992px to match 'medium' breakpoint in mediaQueries.js
    setIsMobileView(window.innerWidth < 992);
  }, []);

  // Initialize viewport detection (safely for SSR)
  useEffect(() => {
    // Set initial value
    handleResize();
  }, [handleResize]);

  // Use debounced resize handler
  useDebouncedResize(handleResize, 150);

  // Start auto-cycle when component mounts
  useEffect(() => {
    startProgressAndAutoCycle();

    // Clean up timers on unmount
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [startProgressAndAutoCycle]);

  // Only render when isMobileView is determined (prevents hydration issues)
  if (isMobileView === null) {
    return null; // Return nothing during initial render to prevent flash
  }

  return (
    <>
      {/* Mobile version - only render when in mobile view */}
      {isMobileView && (
        <MobileSpecialtyContainer
          className="interactive-component"
          t={t}
          ListItemData={ListItemData}
          activeItem={activeItem}
          handleItemChange={handleItemChange}
          fadeOut={fadeOut}
          imageMap={imageMap}
          labelMap={labelMap}
          openLightbox={openLightbox}
        />
      )}

      {/* Desktop version - only render when not in mobile view */}
      {!isMobileView && (
        <SpecialtyContainer className="interactive-component" ref={specialtyContainerRef}>
          <SpecialtyContent>
            <SectionHeading>
              <StyledIcon icon={faHammer} />
              {t('specialties_section_title', 'We specialize in making')}
            </SectionHeading>

            <SpecialtyItems
              items={ListItemData}
              activeItem={activeItem}
              handleMouseEnter={handleMouseEnter}
              handleItemChange={handleItemChange}
              handleKeyDown={handleKeyDown}
              t={t}
            />

            <HelpText>
              <FontAwesomeIcon icon={faInfoCircle} />
              {t('hover_to_see', 'Hover or click to see examples')}
            </HelpText>

            <ProgressDots
              items={ListItemData}
              activeItem={activeItem}
              handleItemChange={handleItemChange}
              t={t}
            />
          </SpecialtyContent>

          <SpecialtyImageDisplay
            progress={progress}
            fadeOut={fadeOut}
            activeItem={activeItem}
            imageMap={imageMap}
            labelMap={labelMap}
            openLightbox={openLightbox}
            handleItemChange={handleItemChange}
          />
        </SpecialtyContainer>
      )}

      {/* Modern Lightbox component - shared between mobile and desktop */}
      {viewerIsOpen && (
        <Lightbox
          open={viewerIsOpen}
          close={closeLightbox}
          index={currentImage}
          slides={lightboxPhotos}
          carousel={{ finite: true }}
          styles={{
            container: { zIndex: 9999 }, // Ensure lightbox is above everything
            root: { zIndex: 9999 },
            navigationPrev: { zIndex: 10000 },
            navigationNext: { zIndex: 10000 },
            captionsTitle: { zIndex: 10000 },
            captionsDescription: { zIndex: 10000 }
          }}
          animation={{ fade: 300 }}
          controller={{
            closeOnBackdropClick: true,
            // Prevent scrolling when lightbox is open
            touchAction: 'none'
          }}
          on={{
            view: ({ index }) => {
              setCurrentImage(index);
              // Maintain scroll position
              if (typeof window !== 'undefined') {
                const { scrollY } = window;
                setTimeout(() => window.scrollTo(0, scrollY), 10);
              }
            }
          }}
        />
      )}
    </>
  );
}