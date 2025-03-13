import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'

/**
 * ContentContainer component providing consistent padding
 * Used for sections that need standardized spacing
 */
export const ContentContainer = styled.div`
  padding: 3rem;
  
  ${mq('tablet')} {
    padding: 4rem;
  }
`
