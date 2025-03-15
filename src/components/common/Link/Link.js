import React from 'react'

import { StyledLink } from 'components/common/Link/Link.styles'

/**
 * Enhanced Link component
 * Uses Gatsby's built-in prefetching which is better than manual prefetching
 */
export const Link = ({ text, primary, to, main, onClick, name }) => {
  return (
    <StyledLink
      to={to}
      primary={primary}
      main={main}
      onClick={onClick}
      name={name}
    >
      {text}
    </StyledLink>
  )
}
