import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import { mq } from 'utils/mediaQueries'

const iconPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #3a3a3a;
  line-height: 1.6;
  
  svg {
    color: #525fc4;
    margin-right: 12px;
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    animation: ${iconPulse} 1s ease infinite;
  }
  
  ${mq('small')} {
    font-size: 18px;
  }
  
  ${mq('large')} {
    font-size: 20px;
  }
`

export const StyledUl = styled.ul`
  padding-top: 2rem;
  list-style-type: none;
  display: grid;
  grid-gap: 1rem;
  width: 100%;
  
  ${mq('tablet')} {
    padding: 2rem 0;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`
