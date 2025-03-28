import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Image } from 'components/common/Image/Image'

import { HeroWrapper, TitleWrapper } from 'components/Home/Hero/Hero.styles'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { SectionMain } from 'components/Home/Hero/SectionMain/SectionMain'

import { Link } from 'components/common/Link/Link'
import { LinkWrapper } from 'components/common/Link/Link.styles'

import { SECTION_IDS } from 'consts/sectionID'

export const Hero = ({ id }) => {
  const { t } = useTranslation('common')
  const { image } = useStaticQuery(graphql`
    query MyQuery {
      image: file(relativePath: { eq: "forge.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP])
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
            {t('heroTitle')}
          </SectionTitle>
          <SectionDescription>
            {t('heroDescription')}
          </SectionDescription>
          <LinkWrapper>
            <Link
              primary="primary"
              text={t('learnMore')}
              to="/"
              onClick={handleItemClick}
              name={SECTION_IDS.MAIN}
            />
            <Link text={t('seeOurWork')} to="/gallery/" />
          </LinkWrapper>
        </TitleWrapper>
        <Image image={getImage(image.childImageSharp)} alt={t('siteTitle')} />
      </HeroWrapper>
      <SectionMain main id={id} />
    </>
  )
}
