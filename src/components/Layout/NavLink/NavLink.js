import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'

/**
 * Navigation link component
 * Using Gatsby's built-in prefetching system for performance
 * IMPORTANT: We're directly using gatsby-plugin-react-i18next Link to maintain language context
 */
export const NavLink = ({ text, onClick, to, activeClassName }) => {
  return (
    <StyledNavLink 
      to={to} 
      onClick={onClick} 
      activeClassName={activeClassName}
      as={Link} // Key change - using the Link component from gatsby-plugin-react-i18next
    >
      {text}
    </StyledNavLink>
  )
}
