import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// Import styles
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { SectionHeading, HelpText } from './SectionMain.styles';
import { SpecialtyContainer, SpecialtyContent } from './InteractiveSpecialties.styles';

// Import data
import { ListItemData } from './ListItemData';
import { config } from './InteractiveSpecialties/data/configData';

// Import utility functions
import { startAutoCycleTimer } from './InteractiveSpecialties/utils/timerUtils.js';
import { 
  createImageAndLabelMaps,
  createLightboxPhotos 
} from './InteractiveSpecialties/utils/lightboxUtils.js';
import { handleKeyNavigation } from './InteractiveSpecialties/utils/navigationUtils.js';
import { 
  openLightbox as openLightboxUtil,
  handleLightboxClose 
} from './InteractiveSpecialties/utils/lightboxScrollUtils.js';

// Import components
import { SpecialtyItems } from './InteractiveSpecialties/components/SpecialtyItems';
import { ProgressDots } from './InteractiveSpecialties/components/ProgressDots';
import { SpecialtyImageDisplay } from './InteractiveSpecialties/components/SpecialtyImageDisplay';
import { SpecialtyLightbox } from './InteractiveSpecialties/components/SpecialtyLightbox';

/**
 * Interactive specialties component with enhanced UI elements and animations
 */
export const InteractiveSpecialties = () => {
  // State management
  const [activeItem, setActiveItem] = useState(1); // Default to first item
  const [progress, setProgress] = useState(0); // Progress for auto-cycling
  const [isTransitioning, setIsTransitioning] = useState(false); // For image transition effect
  const [fadeOut, setFadeOut] = useState(false); // Handle fade-out effect
  const [isViewerOpen, setIsViewerOpen] = useState(false); // Lightbox open state
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide index for lightbox
  
  // Refs
  const autoTimerRef = useRef(null); // Reference to the auto-cycle timer
  const progressTimerRef = useRef(null); // Reference for progress bar updates
  const specialtyContainerRef = useRef(null); // Reference to the specialty container
  const scrollPosRef = useRef(0); // Use ref for scroll position to avoid SSR issues
  const hasOpenedLightbox = useRef(false); // Track whether the lightbox has been opened

  // Translation hook
  const { t } = useTranslation('common');

  // Fetch images data with an inline query
  const data = useStaticQuery(graphql`
    query {
      gates: file(relativePath: { eq: "gallery/bramy1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          original {
            src
            width
            height
          }
        }
      }
      railings: file(relativePath: { eq: "gallery/balu1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          original {
            src
            width
            height
          }
        }
      }
      fences: file(relativePath: { eq: "gallery/ogrodz1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          original {
            src
            width
            height
          }
        }
      }
      gratings: file(relativePath: { eq: "gallery/elo5.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          original {
            src
            width
            height
          }
        }
      }
      decorative: file(relativePath: { eq: "gallery/elo1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
          original {
            src
            width
            height
          }
        }
      }
    }
  `);
  
  // Create image and label maps using utility function
  const { imageMap, labelMap } = createImageAndLabelMaps(data, t);
  
  // Create lightbox photos array
  const lightboxPhotos = createLightboxPhotos(imageMap, labelMap);

  // Handle changing the active item
  const handleItemChange = useCallback((id) => {
    // Don't do anything if the same item is clicked
    if (id === activeItem) return;

    // Reset auto-cycle timer when user interacts
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    // Immediately change the active item with minimal transition
    setActiveItem(id);

    // Update transition state briefly for smooth appearance
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, config.fadeDuration); // Quick transition

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

  // Start progress bar and auto-cycle
  const startProgressAndAutoCycle = useCallback(() => {
    const { cycleDuration, updateInterval, fadeDuration } = config;
    const totalSteps = cycleDuration / updateInterval;
    let currentStep = 0;

    // Clear existing timers
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

    // Progress bar timer
    progressTimerRef.current = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        // Time to cycle to next item
        clearInterval(progressTimerRef.current);
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
  }, [activeItem]);

  // Handle opening the lightbox
  const openLightbox = useCallback(() => {
    openLightboxUtil(
      autoTimerRef,
      progressTimerRef,
      scrollPosRef,
      hasOpenedLightbox,
      activeItem,
      setCurrentSlide,
      setIsViewerOpen
    );
  }, [activeItem]);

  // Start auto-cycle when component mounts
  useEffect(() => {
    startProgressAndAutoCycle();

    // Clean up timers on unmount
    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [startProgressAndAutoCycle]);

  return (
    <>
      <SpecialtyContainer ref={specialtyContainerRef}>
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
        />
      </SpecialtyContainer>
      
      <SpecialtyLightbox
        isViewerOpen={isViewerOpen}
        currentSlide={currentSlide}
        lightboxPhotos={lightboxPhotos}
        scrollPosRef={scrollPosRef}
        setIsViewerOpen={setIsViewerOpen}
        setFadeOut={setFadeOut}
        setCurrentSlide={setCurrentSlide}
        startProgressAndAutoCycle={startProgressAndAutoCycle}
        lightboxSettings={config.lightboxSettings}
      />
    </>
  );
};