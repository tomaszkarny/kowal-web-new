import React, { useState, useEffect, useRef, useCallback } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer, faInfoCircle, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { ListItemData } from './ListItemData'
import { StyledIcon } from 'components/common/Icon/Icon.styles'
import { SectionHeading, HelpText } from './SectionMain.styles'

import {
  SpecialtyContainer,
  SpecialtyList,
  SpecialtyItem,
  SpecialtyImage,
  SpecialtyContent,
  ImageContainer,
  ProgressContainer,
  ProgressDot,
  ProgressBar
} from './InteractiveSpecialties.styles'

/**
 * with enhanced UI elements and animations
 */
export const InteractiveSpecialties = () => {
  const [activeItem, setActiveItem] = useState(1) // Default to first item
  const [progress, setProgress] = useState(0) // Progress for auto-cycling
  const [isTransitioning, setIsTransitioning] = useState(false) // For image transition effect
  const [fadeOut, setFadeOut] = useState(false) // Stan do obsługi efektu fade-out
  const autoTimerRef = useRef(null) // Reference to the auto-cycle timer
  const progressTimerRef = useRef(null) // Reference for progress bar updates
  const { t } = useTranslation('common')

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleItemChange(id);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
      const nextIndex = (currentIndex + 1) % ListItemData.length;
      handleItemChange(ListItemData[nextIndex].id);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
      const prevIndex = (currentIndex - 1 + ListItemData.length) % ListItemData.length;
      handleItemChange(ListItemData[prevIndex].id);
    }
  }, [activeItem]);

  // Handle changing the active item immediately
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
    }, 250); // Just enough time for a quick transition

    // Reset progress
    setProgress(0);
    startProgressAndAutoCycle();
  }, [activeItem]);

  // Use the same direct handler for both hover and click
  const handleMouseEnter = handleItemChange;

  // Start progress bar and auto-cycle
  const startProgressAndAutoCycle = useCallback(() => {
    const cycleDuration = 5000; // 5 seconds
    const updateInterval = 50; // Update progress every 50ms
    const totalSteps = cycleDuration / updateInterval;
    let currentStep = 0;
    const fadeDuration = 500 // 

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

    // Auto-cycle timer
    autoTimerRef.current = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
        const nextIndex = (currentIndex + 1) % ListItemData.length;
        setActiveItem(ListItemData[nextIndex].id);
        setFadeOut(false);
        setProgress(0);
        startProgressAndAutoCycle();
      }, fadeDuration);
    }, cycleDuration);
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

  // Using actual images from the gallery folder
  const data = useStaticQuery(graphql`
    query {
      gates: file(relativePath: { eq: "gallery/bramy1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      railings: file(relativePath: { eq: "gallery/balu1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      fences: file(relativePath: { eq: "gallery/ogrodz1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      gratings: file(relativePath: { eq: "gallery/elo5.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      decorative: file(relativePath: { eq: "gallery/elo1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)

  // Map item IDs to images - replace placeholder.webp with actual images later
  const imageMap = {
    1: getImage(data.gates.childImageSharp),
    2: getImage(data.railings.childImageSharp),
    3: getImage(data.fences.childImageSharp),
    4: getImage(data.gratings.childImageSharp),
    5: getImage(data.decorative.childImageSharp),
  }

  // Custom label map for captions
  const labelMap = {
    1: t('specialties_items_gates', 'Gates (wing, sliding, wickets)'),
    2: t('specialties_items_railings', 'Railings (interior and exterior)'),
    3: t('specialties_items_fences', 'Fences'),
    4: t('specialties_items_gratings', 'Gratings'),
    5: t('specialties_items_decorative', 'Other decorative elements (candlesticks, furniture, etc.)'),
  }

  return (
    <SpecialtyContainer>
      <SpecialtyContent>
        <SectionHeading>
          <StyledIcon icon={faHammer} />
          {t('specialties_section_title', 'We specialize in making')}
        </SectionHeading>

        <SpecialtyList>
          {ListItemData.map(item => (
            <SpecialtyItem
              key={item.id}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onClick={() => handleItemChange(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              isActive={activeItem === item.id}
              tabIndex="0" /* Make item focusable for keyboard navigation */
              role="button"
              aria-pressed={activeItem === item.id}
            >
              <StyledIcon
                icon={item.icon}
                fixedWidth={item.fixedWidth}
              />
              <span>{t(item.translationKey, item.text)}</span>
            </SpecialtyItem>
          ))}
        </SpecialtyList>

        <HelpText>
          <FontAwesomeIcon icon={faInfoCircle} />
          {t('hover_to_see', 'Hover or click to see examples')}
        </HelpText>

        <ProgressContainer>
          {ListItemData.map(item => (
            <ProgressDot
              key={item.id}
              active={activeItem === item.id}
              onClick={() => handleItemChange(item.id)}
              aria-label={`Select ${t(item.translationKey, item.text)}`}
            />
          ))}
        </ProgressContainer>
      </SpecialtyContent>

      <ImageContainer>
        <ProgressBar progress={progress} />
        <SpecialtyImage className={fadeOut ? 'fade-out' : 'fade-in'}>
          <GatsbyImage
            image={imageMap[activeItem]}
            alt={labelMap[activeItem]}
            className="specialty-image"
            objectFit="cover"
            objectPosition="center"
            loading="eager"
            fadeIn={false}
            placeholder="none"
          />
          <div className="image-caption">{labelMap[activeItem]}</div>
        </SpecialtyImage>
      </ImageContainer>
    </SpecialtyContainer>
  )
}
