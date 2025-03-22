import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'

/**
 * Navigation link component
 * Using Gatsby's built-in prefetching system for performance
 */
export const NavLink = ({ text, onClick, to, activeClassName }) => {
  // Use Link from gatsby-plugin-react-i18next which handles language-aware navigation
  return (
    <StyledNavLink 
      to={to} 
      onClick={onClick} 
      activeClassName={activeClassName}
      // Add language support to ensure correct active state detection
      language={undefined} // Use current language
    >
      {text}
    </StyledNavLink>
  )
}
