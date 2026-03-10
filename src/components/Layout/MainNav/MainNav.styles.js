import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'

export const MainNavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.light};

  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9;
  flex-direction: column;
  transform: translateX(${({ isOpen }) => (isOpen ? '0' : '-100%')});
  transition: transform 0.25s ease-in-out;

  ${mq('medium')} {
    height: 70px;
    align-items: center;
    align-items: flex-end;

    transform: none;
    transition: background-color 0.3s ease, box-shadow 0.3s ease,
      backdrop-filter 0.3s ease;

    background-color: ${({ isScrolled }) =>
      isScrolled
        ? 'rgba(248, 248, 248, 0.95)'
        : 'rgba(248, 248, 248, 0.6)'};
    backdrop-filter: ${({ isScrolled }) =>
      isScrolled ? 'blur(10px)' : 'none'};
    box-shadow: ${({ isScrolled }) =>
      isScrolled
        ? '0 2px 20px rgba(0, 0, 0, 0.08)'
        : 'none'};
  }
`

export const NavItems = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${mq('medium')} {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
  }
`

export const NavItem = styled.li`
  margin: 20px 0;
  list-style: none;

  /* font-family: */
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  transition: opacity 0.25s 0.2s ease-in-out;
  ${mq('medium')} {
    opacity: 1;
    margin: 0;
    padding-left: 0;
    &:last-of-type {
      margin-right: 20px;
    }
  }
`
