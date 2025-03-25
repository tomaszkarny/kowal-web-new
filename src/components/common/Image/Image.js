import React from 'react'

import { ImageWrapper, StyledImg } from 'components/common/Image/Image.styles'

/**
 * Renders an optimized image
 * @param {Object} props - Component props
 * @param {Object} props.image - Gatsby image object
 * @param {string} props.alt - Alt text for the image
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.small - Whether to show a small rounded image
 * @param {boolean} props.isHero - Whether this image is used in the hero section
 */
export const Image = ({ alt, style, small, image, isHero }) => {
  return (
    <ImageWrapper isHero={isHero}>
      <StyledImg
        image={image}
        alt={alt || ""}
        style={style}
        small={small}
        isHero={isHero}
      />
    </ImageWrapper>
  )
}
