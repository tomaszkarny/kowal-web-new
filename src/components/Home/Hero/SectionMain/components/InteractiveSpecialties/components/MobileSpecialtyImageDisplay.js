import React, { useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointer } from '@fortawesome/free-solid-svg-icons';
import {
  MobileImageContainer,
  MobileSpecialtyImage,
  SwipeInstruction
} from '../styles/mobile.styles';

export const MobileSpecialtyImageDisplay = ({
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox,
  handleItemChange,
  t
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
      const nextItemId = diff < 0
        ? Math.min(activeItem + 1, 5) // Swipe left, go to next (max 5)
        : Math.max(activeItem - 1, 1); // Swipe right, go to previous (min 1)

      // Only change if it's different
      if (nextItemId !== activeItem) {
        handleItemChange(nextItemId);
      }
    } else if (Math.abs(diff) < 10) {
      // If it's a tap (minimal movement), open lightbox
      // Pass the current activeItem index (subtract 1 because lightbox is 0-indexed)
      openLightbox(null, activeItem - 1);

      // Prevent default behavior to avoid scrolling
      e.preventDefault();
    }

    // Reset touch start position
    touchStartXRef.current = null;
  };
  return (
    <>
      <MobileImageContainer>
        <MobileSpecialtyImage
          className={fadeOut ? 'fade-out' : 'fade-in'}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={(e) => {
            // Prevent default to avoid scrolling
            e.preventDefault();
            // Open lightbox with current image
            openLightbox(null, activeItem - 1);
          }}
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
              onClick={(e) => {
                // Stop propagation to prevent multiple handlers from firing
                e.stopPropagation();
                // Prevent default to avoid scrolling
                e.preventDefault();
                // Open lightbox with current image
                openLightbox(null, activeItem - 1);
              }}
            />
          ) : (
            <div>Image not found</div>
          )}
          <div className="image-caption">{labelMap[activeItem]}</div>
        </MobileSpecialtyImage>
      </MobileImageContainer>

      <SwipeInstruction>
        <FontAwesomeIcon icon={faHandPointer} />
        {t('swipe_instruction', 'Swipe to change, tap to view full size')}
      </SwipeInstruction>
    </>
  );
};
