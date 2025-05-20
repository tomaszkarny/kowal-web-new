import styled from '@emotion/styled'

/**
 * Styled component using the 'as' prop for flexibility.
 * In NavLink.js we pass 'as={Link}', where Link comes from gatsby-plugin-react-i18next.
 * This ensures that the language context is preserved during navigation.
 */
export const StyledNavLink = styled.a`
  color: ${({ theme }) => theme.color.dark};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  line-height: 1;
  margin: 0 0.5rem 0 0;
  padding: 20px 15px;
  text-decoration: none;
  text-rendering: optimizeLegibility;

  &.current-page,
  &.active {
    color: ${({ theme }) => theme.color.primary};
    /* border-bottom: 2px solid #222; */
  }

  &:hover {
    color: ${({ theme }) => theme.color.primary};
    transition: all 0.3s ease-in-out;
  }
`
