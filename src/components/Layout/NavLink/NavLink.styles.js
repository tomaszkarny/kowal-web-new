import styled from '@emotion/styled'

/**
 * Styled component using the 'as' prop for flexibility.
 * In NavLink.js we pass 'as={Link}', where Link comes from gatsby-plugin-react-i18next.
 * This ensures that the language context is preserved during navigation.
 */
export const StyledNavLink = styled.a`
  color: ${({ theme }) => theme.color.dark};
  text-decoration: none;
  font-weight: 700;
  font-size: 22px;
  cursor: pointer;
  position: relative;
  margin-bottom: 15px;
  text-transform: uppercase;
  font-family: 'PT Sans', sans-serif;
  
  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
  
  &.active {
    color: ${({ theme }) => theme.color.primary};
  }
`
