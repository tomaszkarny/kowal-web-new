import React from 'react'

import { StyledLink } from 'components/common/Link/Link.styles'

export const Link = ({ text, primary, to, main, onClick, name }) => (
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
