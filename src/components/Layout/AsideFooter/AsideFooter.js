import React from 'react'
import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

import { StyledSection } from 'components/Layout/AsideFooter/AsideFooter.styles'

export const AsideFooter = () => (
  <StyledSection>
    <p>
      ©&nbsp;2020 · Ecommerce consultancy powered by{' '}
      <StyledAnchor small href="https://tomaszkarny.netlify.com/">
        Tomasz Karny
      </StyledAnchor>
      · Currently based in Poland
    </p>
  </StyledSection>
)
