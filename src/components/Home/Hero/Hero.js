import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'

import { Image } from 'components/common/Image/Image'

import { HeroWrapper, TitleWrapper } from 'components/Home/Hero/Hero.styles'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'

import { Link } from 'components/common/Link/Link'
import { LinkWrapper } from 'components/common/Link/Link.styles'

import { SECTION_IDS } from 'consts/sectionID'

export const Hero = ({ id }) => {
  const { image } = useStaticQuery(graphql`
    query MyQuery {
      image: file(relativePath: { eq: "forge.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const handleItemClick = e => {
    e.preventDefault()

    const element = document.querySelector(`#${e.target.name}`)

    window.scroll({
      top: element.offsetTop - 60,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <HeroWrapper>
        <TitleWrapper>
          <SectionTitle>
            Pracownia Kowalstwa Artystycznego Tadeusz Karny
          </SectionTitle>
          <SectionDescription>
            {' '}
            Oferujemy bogate wzornictwo bram balustrad ogrodzeń krat oraz innych
            elementów ozdobnych.
          </SectionDescription>
          <LinkWrapper>
            <Link
              primary="primary"
              text="dowiedz się więcej"
              to="/"
              onClick={handleItemClick}
              name={SECTION_IDS.MAIN}
            />
            <Link text="zobacz nasze prace" to="/gallery/" />
          </LinkWrapper>
        </TitleWrapper>
        <Image fluid={image.sharp.fluid} alt="alt" style={{ width: '100%' }} />
      </HeroWrapper>
      <SectionMain main id={id} />
    </>
  )
}
