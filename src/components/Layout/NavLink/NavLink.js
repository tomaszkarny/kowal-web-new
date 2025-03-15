import React from 'react'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'

/**
 * Navigation link component
 * Using Gatsby's built-in prefetching system for performance
 */
export const NavLink = ({ text, onClick, to, activeClassName }) => {
  return (
    <StyledNavLink 
      to={to} 
      onClick={onClick} 
      activeClassName={activeClassName}
    >
      {text}
    </StyledNavLink>
  )
}
