import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'

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

// Now using styled.a instead of styled(Link)
// The 'as' prop allows applying these styles to any component
export const StyledLink = styled('a', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'main' && prop !== 'primary' && prop !== 'customStyles'
})`
  /* Add data attribute to help with navigation handling */
  &[data-gatsby-link="true"] {
    z-index: 2;
  }
  ${({ customStyles }) => customStyles || ''}
  width: auto;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  box-sizing: inherit;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: 0;
  box-shadow: ${({ primary }) =>
    primary ? '0 6px 15px -3px rgba(82, 95, 196, 0.4)' : 'none'};
  color: ${({ primary, theme }) =>
    primary
      ? getColor(theme, 'white', fallbackColors.white)
      : getColor(theme, 'bluewood', fallbackColors.bluewood)};
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  line-height: 1;
  padding: ${({ primary }) => (primary ? '18px 32px 16px' : '16px 0 6px 0')};
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: normal;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ primary, theme }) =>
    primary ? getColor(theme, 'primary', fallbackColors.primary) : 'transparent'};
  border-radius: ${({ primary }) => (primary ? '10px' : '')};
  border-bottom: ${({ primary }) => (primary ? '' : `2px solid ${fallbackColors.primary}`)};
  border-color: ${({ primary, theme }) =>
    (primary ? '' : getColor(theme, 'primary', fallbackColors.primary))};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    box-shadow: ${({ primary }) => (primary ? '0 8px 20px -4px rgba(82, 95, 196, 0.6)' : 'none')};
    color: ${({ primary, theme }) =>
      primary
        ? getColor(theme, 'white', fallbackColors.white)
        : getColor(theme, 'primary', fallbackColors.primary)};
    transform: translateY(-2px);

    &:before {
      transform: translateX(100%);
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(1px);
    box-shadow: ${({ primary }) => (primary ? '0 3px 10px -2px rgba(82, 95, 196, 0.5)' : 'none')};
  }

  ${mq('tablet')} {
    align-self: center;
    width: ${({ main }) => (main ? '250px' : 'auto')};
    font-size: 14px;
  }
`

export const LinkWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 450px;
  align-items: center;
  align-self: center;
  margin: 0 auto;

  ${mq('small')} {
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
  }

  ${mq('tablet')} {
    gap: 2rem;
  }

  a {
    min-width: 160px;
    justify-content: center;
  }
`
