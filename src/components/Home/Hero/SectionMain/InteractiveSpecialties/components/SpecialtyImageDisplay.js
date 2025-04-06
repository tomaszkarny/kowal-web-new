import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { 
  ImageContainer, 
  ProgressBar, 
  SpecialtyImage,
  FallbackImage 
} from '../styles';

export const SpecialtyImageDisplay = ({ 
  progress,
  fadeOut,
  activeItem,
  imageMap,
  labelMap,
  openLightbox
}) => {
  return (
    <ImageContainer>
      <ProgressBar progress={progress} />
      <SpecialtyImage
        className={fadeOut ? 'fade-out' : 'fade-in'}
        onClick={openLightbox}
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
