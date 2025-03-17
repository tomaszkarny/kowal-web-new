import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const SectionDescription = styled.p`
  font-weight: ${({ isBolded }) => (isBolded ? 500 : 400)};
  line-height: ${({ isUnderLined }) => (isUnderLined ? 'none' : '2.5')};
  color: ${({ theme, isBolded }) =>
    theme?.color?.[isBolded ? 'darkBlue' : 'bluewood'] || (isBolded ? '#1a365d' : '#2c3e50')};
  font-size: 15px;
  text-align: ${({ main }) => (main ? 'left' : 'center')};
  box-sizing: inherit;
  margin: 0 0 15px;
  max-width: ${({ main }) => (main ? '100%' : '')};
  ${mq('small')} {
    max-width: ${({ main }) => (main ? '55ch' : '')};
  }

  ${mq('tablet')} {
    font-size: ${({ isBolded }) => (isBolded ? '18px' : '1.2rem')};
    padding-top: ${({ isBolded }) => (isBolded ? '0' : '3rem')};
    max-width: ${({ main }) => (main ? '65ch' : '')};
  }
  
  ${mq('large')} {
    max-width: ${({ main }) => (main ? '80ch' : '')};
  }
`
