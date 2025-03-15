import styled from '@emotion/styled'

import { Link } from 'gatsby-plugin-react-i18next'

import { mq } from 'utils/mediaQueries'

export const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  width: auto;
  background: ${({ theme }) => theme.color.dark};
  color: ${({ theme }) => theme.color.white};
  grid-gap: 50px;
  padding: 4rem;

  ${mq('tablet')} {
    grid-gap: 10%;
  }
`
export const FooterSection = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

/**
 * Styled component for language switcher links
 * Using shouldForwardProp to prevent 'active' prop from reaching the DOM
 */
export const LanguageLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'active'
})`
  text-decoration: none;
  margin-bottom: 10px;
  display: block;
  color: ${props => props.active ? '#ffcc00' : '#ffffff'};

  &:hover {
    opacity: 1;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
  }
`

export const FooterParagraph = styled.p`
  opacity: 0.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-size: 18px;
`
export const FooterTitle = styled.h3`
  opacity: 1;
  text-transform: none;
  letter-spacing: 0;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  padding-bottom: 5px;
`

export const FooterLink = styled(Link)`
  color: ${({ theme, isBolded }) =>
    theme.color[isBolded ? 'darkBlue' : 'white']};
  opacity: 0.5;
  text-decoration: none;
  font-size: ${({ small }) => (small ? '12px' : '18px')};
  line-height: 27px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
  }
`
