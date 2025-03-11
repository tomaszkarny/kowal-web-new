import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

import { mq } from 'utils/mediaQueries'

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  height: 100%;
  /* ${mq('small')} {
    padding: 2rem;
  } */

  ${mq('tablet')} {
    flex: 1;
    padding: 3rem;
  }
`

export const StyledImg = styled(GatsbyImage)`
  object-fit: cover;
  /* max-width: 100%;
  max-height: 100%; */
  object-position: center;
  width: ${({ small }) => (small ? '180px' : '')};
  height: ${({ small }) => (small ? '180px' : '')};
  border-radius: ${({ small }) => (small ? '50%' : '')};

  ${mq('tablet')} {
    width: ${({ small }) => (small ? '350px' : '')};
    height: ${({ small }) => (small ? '350px' : '')};
  }
`
