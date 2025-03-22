import React from 'react'

// import { graphql, useStaticQuery } from 'gatsby'

import { ImageWrapper, StyledImg } from 'components/common/Image/Image.styles'

// import forge from 'assets/images/forge.jpg'

export const Image = ({ alt, small, secondary, image }) => {
  return (
    <ImageWrapper>
      <StyledImg
        image={image}
        alt={alt || ""}
        small={small}
        secondary={secondary}
      />
    </ImageWrapper>
  )
}
