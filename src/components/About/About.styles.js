import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 20px; */
  width: 100%;
  justify-content: center;
  ${mq('medium')} {
    flex-direction: row;
  }
`
