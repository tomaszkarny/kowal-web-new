import React, { useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  ImageContainer,
  ProgressBar,
  SpecialtyImage,
  FallbackImage
} from '../styles/styles.js';

export const SpecialtyImageDisplay = ({
  progress,
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox,
  handleItemChange
}) => {
  const touchStartXRef = useRef(null);

  // Handle touch events for swiping between images
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartXRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchStartX = touchStartXRef.current;
    const diff = touchEndX - touchStartX;

    // If it's a significant swipe (more than 50px), change the item
    if (Math.abs(diff) > 50) {
      // Calculate the next item ID based on swipe direction
      const maxItem = Math.max(...Object.keys(imageMap).map(Number));
      const nextItemId = diff < 0
        ? Math.min(activeItem + 1, maxItem) // Swipe left, go to next
        : Math.max(activeItem - 1, 1); // Swipe right, go to previous (min 1)

      // Only change if it's different
      if (nextItemId !== activeItem) {
        handleItemChange(nextItemId);
      }
    } else if (Math.abs(diff) < 10) {
      // If it's a tap (minimal movement), open lightbox
      openLightbox(null, activeItem - 1);
    }

    // Reset touch start position
    touchStartXRef.current = null;
  };

  // Handle click to open lightbox
  const handleClick = () => {
    openLightbox(null, activeItem - 1);
  };
  return (
    <ImageContainer>
      <ProgressBar progress={progress} />
      <SpecialtyImage
        className={fadeOut ? 'fade-out' : 'fade-in'}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {imageMap[activeItem] ? (
          <GatsbyImage
            image={getImage(imageMap[activeItem])}
            alt={labelMap[activeItem]}
            className="specialty-image"
            objectFit="contain"
            objectPosition="center"
            loading="eager"
            fadeIn={false}
            placeholder="none"
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <FallbackImage>
            Image not found
          </FallbackImage>
        )}
        <div className="image-caption">{labelMap[activeItem]}</div>
      </SpecialtyImage>
    </ImageContainer>
  );
};
