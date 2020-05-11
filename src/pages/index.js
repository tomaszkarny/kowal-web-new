import React from 'react'

import { Layout } from 'components/Layout/Layout'
import { Hero } from 'components/Home/Hero/Hero'
// import styled from '@emotion/styled'

// import { mq } from 'utils/mediaQueries'

// const StyledDiv = styled.div`
//   ${mq('small')} {
//     margin: 2rem auto;
//     max-width: 550px;
//   }
//   ${mq('large')} {
//     background: ${({ theme }) => theme.color.dark};
//   }
// `

export default () => (
  <Layout>
    <Hero />
  </Layout>
)
