import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'

/**
 * PageDescription - reusable text component matching home page MainDescription style
 * Used for intro/description text on pages like gallery, about, etc.
 */
export const PageDescription = styled.div`
  margin: 0 auto 2rem;
  max-width: 850px;
  line-height: 1.8;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  color: #333;
  font-size: 1.05rem;
  letter-spacing: 0.2px;
  padding: 0 1rem;

  ${mq('small')} {
    font-size: 1.2rem;
    padding: 0 1.5rem;
  }

  ${mq('medium')} {
    font-size: 1.35rem;
    line-height: 1.9;
  }
`
