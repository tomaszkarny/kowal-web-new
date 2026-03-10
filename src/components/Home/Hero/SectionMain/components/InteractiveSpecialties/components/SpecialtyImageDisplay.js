import React, { useRef } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  ImageContainer,
  ProgressBar,
  SpecialtyImage,
  FallbackImage
} from '../styles/styles.js';
import { ProgressDots } from './ProgressDots';

export function SpecialtyImageDisplay({
  progress,
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox,
  handleItemChange,
  items,
  t
}) {
  const touchStartXRef = useRef(null);

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartXRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchStartX = touchStartXRef.current;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 50) {
      const maxItem = Math.max(...Object.keys(imageMap).map(Number));
      const nextItemId = diff < 0
        ? Math.min(activeItem + 1, maxItem)
        : Math.max(activeItem - 1, 1);

      if (nextItemId !== activeItem) {
        handleItemChange(nextItemId);
      }
    } else if (Math.abs(diff) < 10) {
      openLightbox(null, activeItem - 1);
    }

    touchStartXRef.current = null;
  };

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
            objectFit="cover"
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

      {items && t && (
        <ProgressDots
          items={items}
          activeItem={activeItem}
          handleItemChange={handleItemChange}
          t={t}
        />
      )}
    </ImageContainer>
  );
}
