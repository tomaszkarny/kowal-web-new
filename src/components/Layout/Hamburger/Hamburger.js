import React from 'react'

import {
  StyledHamburger,
  InnerHamburger,
} from 'components/Layout/Hamburger/Hamburger.styles'

export const Hamburger = ({ isOpen, onClick }) => (
  <StyledHamburger isOpen={isOpen} onClick={onClick}>
    <InnerHamburger isOpen={isOpen} />
  </StyledHamburger>
)
