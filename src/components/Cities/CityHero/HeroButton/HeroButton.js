import React from 'react'
import { StyledHeroButton } from './HeroButton.styles'

export function HeroButton({ children, ...props }) {
  return (
    <StyledHeroButton {...props}>
      {children}
    </StyledHeroButton>
  )
}
