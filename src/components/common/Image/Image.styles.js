import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { mq } from 'utils/mediaQueries'
import { kenBurns } from '../animations/animations'

const heroImageStyles = css`
  height: 100%;
  width: 100%;
  filter: contrast(1.05);
  transition: transform 0.5s ease-out;
  animation: ${kenBurns} 20s ease-in-out infinite alternate;
`

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
      margin-left: -5%;
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

  ${({ isHero }) => isHero && heroImageStyles}

  ${mq('tablet')} {
    width: ${({ small }) => (small ? '350px' : '100%')};
    height: ${({ small }) => (small ? '350px' : '100%')};
    ${({ isHero }) => isHero && `
      transform: scale(1.05);
      object-position: left center;
    `}
  }
`
