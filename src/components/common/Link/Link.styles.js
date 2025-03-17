import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { Link } from 'gatsby'

import { mq } from 'utils/mediaQueries'

// Define fallback colors to prevent theme access issues
const fallbackColors = {
  primary: '#e22c2f',  // Red primary color
  white: '#ffffff',    // White
  bluewood: '#2c3e50'  // Dark blue/slate
}

// Safe color accessor function to prevent undefined theme errors
const getColor = (theme, colorKey, fallback) => {
  if (!theme || !theme.color || !theme.color[colorKey]) {
    return fallback
  }
  return theme.color[colorKey]
}

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'main' && prop !== 'primary'
})`
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
    primary 
      ? getColor(theme, 'white', fallbackColors.white)
      : getColor(theme, 'bluewood', fallbackColors.bluewood)};
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
    primary ? getColor(theme, 'primary', fallbackColors.primary) : 'transparent'};
  border-radius: ${({ primary }) => (primary ? '10px' : '')};
  border-bottom: ${({ primary }) => (primary ? '' : `2px solid ${fallbackColors.primary}`)};
  border-color: ${({ primary, theme }) => 
    (primary ? '' : getColor(theme, 'primary', fallbackColors.primary))};

  &:hover {
    box-shadow: ${({ primary }) => (primary ? 'none' : '')};
    color: ${({ primary, theme }) =>
      primary 
        ? getColor(theme, 'white', fallbackColors.white)
        : getColor(theme, 'primary', fallbackColors.primary)};
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
