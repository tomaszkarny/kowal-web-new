import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const StyledHamburger = styled.button`
  padding: 15px;
  border: none;
  background: transparent;
  position: fixed;
  right: 15px;
  top: 15px;
  z-index: 9999;

  ${mq('tablet')} {
    display: none;
  }
`

export const InnerHamburger = styled.div`
  position: relative;
  width: 20px;
  height: 2px;
  background-color: ${({ theme, isOpen }) =>
    isOpen ? 'transparent' : theme.color.dark};
  transition: background-color 0.25s ease-in;

  ::after,
  ::before {
    content: '';
    position: absolute;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${({ theme }) => theme.color.dark};
    transition: transform 0.25s ease-in-out;
  }

  ::before {
    top: -6px;
    transform: translateY(${({ isOpen }) => (isOpen ? '6px' : '0')})
      rotate(${({ isOpen }) => (isOpen ? '45deg' : '0')});
  }

  ::after {
    top: 6px;
    transform: translateY(${({ isOpen }) => (isOpen ? '-6px' : '0')})
      rotate(${({ isOpen }) => (isOpen ? '-45deg' : '0')});
  }
`
