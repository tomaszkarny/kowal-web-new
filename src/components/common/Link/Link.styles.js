import styled from '@emotion/styled'

import { Link } from 'gatsby'

import { mq } from 'utils/mediaQueries'

export const StyledLink = styled(Link)`
  width: auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  box-sizing: inherit;
  transition: all 0.2s ease-in-out;
  border: 0;
  box-shadow: ${({ primary }) =>
    primary ? '0 7px 16px 0 rgba(0, 0, 0, 0.2)' : 'none'};
  color: ${({ primary, theme }) =>
    primary ? theme.color.white : theme.color.bluewood};
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  padding: ${({ primary }) => (primary ? '22px 36px 20px' : '16px 0 6px 0')};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: normal;
  display: inline-block;
  background-color: ${({ primary, theme }) =>
    primary ? theme.color.primary : theme.color.white};
  border-radius: ${({ primary }) => (primary ? '10px' : '')};
  background-color: ${({ primary }) => (primary ? '' : 'transparent')};
  border-bottom: ${({ primary }) => (primary ? '' : '2px solid #e22c2f')};
  border-color: ${({ primary, theme }) => (primary ? '' : theme.color.primary)};

  &:hover {
    box-shadow: ${({ primary }) => (primary ? 'none' : '')};
    color: ${({ primary, theme }) =>
      primary ? theme.color.white : theme.color.primary};
    outline-offset: ${({ primary }) => (primary ? '3px' : '')};
  }
  ${mq('tablet')} {
    align-self: center;
    width: ${({ main }) => (main ? '250px' : 'auto')};
    font-size: 14px;
  }
`
export const LinkWrapper = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  grid-gap: 2rem;
  ${mq('tablet')} {
    grid-template-columns: 1fr 1fr;
  }
`
