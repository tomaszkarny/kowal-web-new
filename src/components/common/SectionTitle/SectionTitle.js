import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const SectionTitle = styled.h1`
  text-align: center;
  box-sizing: inherit;
  font-weight: 700;
  margin: 0 0 25px;

  color: #1d2d35;
  letter-spacing: -0.75px;
  line-height: 1.2;
  font-size: ${({ main }) => (main ? '26px' : '36px')};
  font-family: 'Merriweather';

  ${mq('tablet')} {
    font-size: ${({ main }) => (main ? '36px' : '56px')};
  }
`
