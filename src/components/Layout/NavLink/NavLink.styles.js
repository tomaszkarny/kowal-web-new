import styled from '@emotion/styled'
import { Link } from 'gatsby-plugin-react-i18next'

export const StyledNavLink = styled(Link)`
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

  &.current-page {
    color: ${({ theme }) => theme.color.primary};
    /* border-bottom: 2px solid #222; */
  }

  &:hover {
    color: ${({ theme }) => theme.color.primary};
    transition: all 0.3s ease-in-out;
  }
`
