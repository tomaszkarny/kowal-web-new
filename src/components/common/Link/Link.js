import React from 'react'

import { StyledLink } from 'components/common/Link/Link.styles'

export const Link = ({ text, primary, to, main }) => (
  <StyledLink to={to} primary={primary} main={main}>
    {text}
  </StyledLink>
)
