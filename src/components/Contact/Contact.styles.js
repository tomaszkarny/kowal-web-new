import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const ContactWrapper = styled.div`
  display: grid;
  width: auto;
  grid-template-columns: 1fr;

  ${mq('tablet')} {
    font-size: 20px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`
