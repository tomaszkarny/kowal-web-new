import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const ContainerWrapper = styled.div`
  height: 700px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.main};

  ${mq('tablet')} {
    padding: 5rem;
  }
`

export const StyledMapElement = styled.div`
  height: 100%;
`
