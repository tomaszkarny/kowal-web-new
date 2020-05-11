import React from 'react'

import { GalleryPage } from 'components/GalleryPage/GalleryPage'
import { Layout } from 'components/Layout/Layout'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledSection } from 'components/common/StyledSection/StyledSection'

export default () => (
  <Layout>
    <StyledSection>
      <SectionTitle>Nasze przykładowe prace</SectionTitle>
      <GalleryPage />
    </StyledSection>
  </Layout>
)
