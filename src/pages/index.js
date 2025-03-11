import React from 'react'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'

import { SECTION_IDS } from 'consts/sectionID'

const IndexPage = () => {
  return (
    <Layout>
      <Hero id={SECTION_IDS.MAIN} />
    </Layout>
  )
}

export default IndexPage
