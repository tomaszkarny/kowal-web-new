import React from 'react'

import { StyledCtaButton } from './CtaButton.styles'

export function CityCtaButton({ as = 'button', variant = 'primary', children, ...props }) {
  return (
    <StyledCtaButton
      as={as}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledCtaButton>
  )
}
