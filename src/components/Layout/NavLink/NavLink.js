import React from 'react'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'
import { useI18next } from 'gatsby-plugin-react-i18next'

/**
 * Navigation link component
 * Using Gatsby's built-in prefetching system for performance
 */
export const NavLink = ({ text, onClick, to, activeClassName }) => {
  // Get the current language from i18next
  const { language } = useI18next();
  
  return (
    <StyledNavLink 
      to={to} 
      onClick={onClick} 
      activeClassName={activeClassName}
      language={language} // Pass the current language to maintain it during navigation
    >
      {text}
    </StyledNavLink>
  )
}
