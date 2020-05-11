import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const StyledListItem = styled.li`
  list-style-type: none;
`

export const StyledUl = styled.ul`
  padding-top: 2rem;
  ${mq('tablet')} {
    padding: 3rem 3rem 0 1rem;
  }
`
