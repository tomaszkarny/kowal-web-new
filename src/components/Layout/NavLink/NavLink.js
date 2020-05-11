import React from 'react'
import { StyledNavLink } from 'components/Layout/NavLink/NavLink.styles'

export const NavLink = ({ text, onClick, to, activeClassName }) => (
  <StyledNavLink to={to} onClick={onClick} activeClassName={activeClassName}>
    {text}
  </StyledNavLink>
)
