import React from 'react'

// import { graphql, useStaticQuery } from 'gatsby'

import { ImageWrapper, StyledImg } from 'components/common/Image/Image.styles'

// import forge from 'assets/images/forge.jpg'

export const Image = ({ Tag, fluid, fadeIn, alt, style, small, fixed }) => {
  return (
    <ImageWrapper>
      <StyledImg
        Tag={Tag}
        fluid={fluid}
        fixed={fixed}
        fadeIn={fadeIn}
        alt={alt}
        style={style}
        small={small}
      />
    </ImageWrapper>
  )
}
