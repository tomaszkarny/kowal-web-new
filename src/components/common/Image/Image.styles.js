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
    ${({ isHero }) => !isHero && `padding: 3rem;`}
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
  `}

  ${mq('tablet')} {
    width: ${({ small }) => (small ? '350px' : '100%')};
    height: ${({ small }) => (small ? '350px' : '100%')};
  }
`
