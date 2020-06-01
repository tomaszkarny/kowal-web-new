import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const StyledSection = styled.section`
  background-color: ${({ theme }) => theme.color.main};
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: ${({ isAligned }) => (isAligned ? '' : 'center')};
  align-content: center;
  align-items: left;
  width: 100%;
  height: 100%;
  padding: 2rem;

  ${mq('tablet')} {
    padding: 5rem;
  }
`
