import React from 'react'

import {
  StyledHamburger,
  InnerHamburger,
} from 'components/Layout/Hamburger/Hamburger.styles'

export function Hamburger({ isOpen, onClick }) {
  return <StyledHamburger isOpen={isOpen} onClick={onClick}>
    <InnerHamburger isOpen={isOpen} />
  </StyledHamburger>
}
