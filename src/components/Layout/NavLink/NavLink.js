import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'

/**
 * Navigation link component
 * Using Gatsby's built-in prefetching system for performance
 * Maintains original styling while preserving language context
 */
export const NavLink = ({ text, onClick, to, activeClassName }) => {
  return (
    <StyledNavLink 
      to={to} 
      onClick={onClick} 
      activeClassName={activeClassName || 'current-page'} // Support both activeClassName paradigms
      as={Link} // Using Link from gatsby-plugin-react-i18next for language context
    >
      {text}
    </StyledNavLink>
  )
}
