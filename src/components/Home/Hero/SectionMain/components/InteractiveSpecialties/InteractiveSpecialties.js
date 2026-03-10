import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useTranslation } from 'gatsby-plugin-react-i18next';

// Import modern lightbox library
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Import styles
import { SpecialtyContainer, SpecialtyContent } from './InteractiveSpecialties.styles';

// Import custom performance hooks
import { usePageVisibility } from './hooks/usePageVisibility';

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

// Import components
import { SpecialtyItems } from './components/SpecialtyItems';
import { SpecialtyImageDisplay } from './components/SpecialtyImageDisplay';

/**
 * Interactive specialties component — dark forge themed, unified responsive
 */
export function InteractiveSpecialties() {
  const [activeItem, setActiveItem] = useState(1);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const autoTimerRef = useRef(null);
  const progressTimerRef = useRef(null);
  const specialtyContainerRef = useRef(null);

  const { t } = useTranslation('common');
  const isPageVisible = usePageVisibility();

  // Higher-res images for sharp display at all responsive sizes
  const data = useStaticQuery(graphql`
    query OptimizedSpecialtyImages {
      gates: file(relativePath: { eq: "gallery/bramy3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 700,
            height: 520,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 525, 700, 1050]
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
            width: 700,
            height: 520,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 525, 700, 1050]
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
            width: 700,
            height: 520,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 525, 700, 1050]
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
            width: 700,
            height: 520,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 525, 700, 1050]
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
            width: 700,
            height: 520,
            quality: 85,
            placeholder: BLURRED,
            formats: [AUTO, WEBP, AVIF],
            breakpoints: [350, 525, 700, 1050]
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

  const { imageMap, labelMap } = useMemo(() =>
    createImageAndLabelMaps(data, t),
    [data, t]
  );

  const lightboxPhotos = useMemo(() =>
    createLightboxPhotos(imageMap, labelMap),
    [imageMap, labelMap]
  );

  const handleItemChange = useCallback((id) => {
    if (id === activeItem) return;

    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);

    setActiveItem(id);
    setProgress(0);
    startProgressAndAutoCycle();
  }, [activeItem]);

  const handleMouseEnter = handleItemChange;

  const handleKeyDown = useCallback((e, id) => {
    handleKeyNavigation(e, id, activeItem, ListItemData, handleItemChange);
  }, [activeItem, handleItemChange]);

  const startProgressAndAutoCycle = useCallback(() => {
    if (!isPageVisible) return;

    const { cycleDuration, updateInterval, fadeDuration } = config;
    const totalSteps = cycleDuration / updateInterval;
    let currentStep = 0;

    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);

    progressTimerRef.current = setInterval(() => {
      if (!document.hidden) {
        currentStep += 1;
        setProgress((currentStep / totalSteps) * 100);

        if (currentStep >= totalSteps) {
          clearInterval(progressTimerRef.current);
        }
      }
    }, updateInterval);

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

  useEffect(() => {
    if (!isPageVisible) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    } else {
      startProgressAndAutoCycle();
    }
  }, [isPageVisible, startProgressAndAutoCycle]);

  const openLightbox = useCallback((_, photoProps) => {
    let index = activeItem - 1;

    if (photoProps !== undefined) {
      index = typeof photoProps === 'object' ? photoProps.index : photoProps;
    }

    if (typeof window !== 'undefined') {
      const { scrollY } = window;
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 50);
    }

    setCurrentImage(index);
    setViewerIsOpen(true);
    if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, [activeItem]);

  const closeLightbox = useCallback(() => {
    setViewerIsOpen(false);
    startProgressAndAutoCycle();
  }, [startProgressAndAutoCycle]);

  useEffect(() => {
    startProgressAndAutoCycle();

    return () => {
      if (autoTimerRef.current) clearTimeout(autoTimerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [startProgressAndAutoCycle]);

  return (
    <>
      <SpecialtyContainer className="interactive-component" ref={specialtyContainerRef}>
        <SpecialtyContent>
          <SpecialtyItems
            items={ListItemData}
            activeItem={activeItem}
            handleMouseEnter={handleMouseEnter}
            handleItemChange={handleItemChange}
            handleKeyDown={handleKeyDown}
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
          items={ListItemData}
          t={t}
        />
      </SpecialtyContainer>

      {viewerIsOpen && (
        <Lightbox
          open={viewerIsOpen}
          close={closeLightbox}
          index={currentImage}
          slides={lightboxPhotos}
          carousel={{ finite: true }}
          styles={{
            container: { zIndex: 9999 },
            root: { zIndex: 9999 },
            navigationPrev: { zIndex: 10000 },
            navigationNext: { zIndex: 10000 },
            captionsTitle: { zIndex: 10000 },
            captionsDescription: { zIndex: 10000 }
          }}
          animation={{ fade: 300 }}
          controller={{
            closeOnBackdropClick: true,
            touchAction: 'none'
          }}
          on={{
            view: ({ index }) => {
              setCurrentImage(index);
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
