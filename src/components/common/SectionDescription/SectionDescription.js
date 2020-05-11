import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const SectionDescription = styled.p`
  font-weight: 400;
  line-height: 2.5;
  color: ${({ theme }) => theme.color.bluewood};
  font-size: 15px;
  text-align: ${({ main }) => (main ? 'left' : 'center')};
  box-sizing: inherit;
  margin: 0 0 28px;

  max-width: ${({ main }) => (main ? 'auto' : '')};

  ${mq('tablet')} {
    font-size: 1.2rem;
    padding-top: 3rem;
  }
`
