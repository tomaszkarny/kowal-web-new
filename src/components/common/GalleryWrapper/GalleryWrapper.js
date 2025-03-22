import React from 'react'
import styled from '@emotion/styled'

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: ${props => props.margin}px;
  width: 100%;
`

const GalleryItem = styled.div`
  position: relative;
  overflow: hidden;
  cursor: pointer;
  height: 0;
  padding-top: ${props => (props.height / props.width) * 100}%;
`

const GalleryImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`

/**
 * Modern replacement for react-photo-gallery using CSS Grid
 * Maintains the same API surface to be a drop-in replacement
 */
export const GalleryWrapper = (props) => {
  const {
    photos,
    onClick,
    margin = 2,
    // The following props are kept for API compatibility but not used
    targetRowHeight = 300, 
    columns = 1,
    direction = 'row',
    renderImage = undefined
  } = props;

  const handleClick = (event, index) => {
    if (onClick) {
      onClick(event, { index, photo: photos[index] });
    }
  };

  return (
    <GalleryGrid margin={margin}>
      {photos.map((photo, index) => (
        <GalleryItem 
          key={`gallery-item-${index}`}
          width={photo.width}
          height={photo.height}
          onClick={(e) => handleClick(e, index)}
        >
          <GalleryImage 
            src={photo.src}
            alt={photo.alt || ''}
            title={photo.title || ''}
          />
        </GalleryItem>
      ))}
    </GalleryGrid>
  )
}
