import React from 'react'
import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

import { StyledSection } from 'components/Layout/AsideFooter/AsideFooter.styles'

export const AsideFooter = () => (
  <StyledSection>
    <p>
      ©&nbsp;2020 · powered by{' '}
      <StyledAnchor small href="https://karny-tomasz.netlify.app">
        Tomasz Karny
      </StyledAnchor>
      ·
    </p>
  </StyledSection>
)
