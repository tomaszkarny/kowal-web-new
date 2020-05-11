import React from 'react'
import { FooterLink } from 'components/Layout/Footer/Footer.styles'

import { StyledSection } from 'components/Layout/AsideFooter/AsideFooter.styles'

export const AsideFooter = () => (
  <StyledSection>
    <p>
      ©&nbsp;2020 ·{' '}
      <FooterLink small to="/">
        Dealwithgrowth
      </FooterLink>{' '}
      · Ecommerce consultancy powered by{' '}
      <FooterLink small to="https://tomaszkarny.netlify.com/">
        Tomasz Karny
      </FooterLink>
      · Currently based in Poland
    </p>
  </StyledSection>
)
