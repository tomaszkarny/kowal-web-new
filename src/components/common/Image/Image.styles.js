import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

import { mq } from 'utils/mediaQueries'

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  ${({ isHero }) => !isHero && `padding: 1rem 0;`}
  
  ${mq('tablet')} {
    flex: 1;
    ${({ isHero }) => isHero ? `
      position: relative;
      /* Slight negative margin to blend with content */
      margin-left: -5%;
      /* Make image fill entire space */
      width: 105%;
      height: 100%;
      overflow: hidden;
    ` : `padding: 3rem;`}
  }
`

export const StyledImg = styled(GatsbyImage, {
  shouldForwardProp: (prop) => !['small', 'isHero'].includes(prop)
})`
  object-fit: cover;
  object-position: center;
  width: ${({ small }) => (small ? '180px' : '100%')};
  height: ${({ small }) => (small ? '180px' : '100%')};
  border-radius: ${({ small }) => (small ? '50%' : '0')};
  display: block;
  
  ${({ isHero }) => isHero && `
    height: 100%;
    width: 100%;
    /* Enhance image with subtle shadow for depth */
    filter: contrast(1.05);
    /* Add gentle transition for any hover effects */
    transition: transform 0.5s ease-out;
  `}

  ${mq('tablet')} {
    width: ${({ small }) => (small ? '350px' : '100%')};
    height: ${({ small }) => (small ? '350px' : '100%')};
    ${({ isHero }) => isHero && `
      /* Slight scale effect to push image into the content area visually */
      transform: scale(1.05);
      /* Position image from left side */
      object-position: left center;
    `}
  }
`
