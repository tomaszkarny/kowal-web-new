import React from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Image } from 'components/common/Image/Image'

import {
  HeroWrapper,
  TitleWrapper,
  ImageOverlay,
  ButtonStyles
} from 'components/Home/Hero/Hero.styles'

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
      image: file(relativePath: { eq: "Hero_image.webp" }) {
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
        <ImageOverlay />
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
              customStyles={ButtonStyles.primary}
            />
            <Link
              text={t('seeOurWork')}
              to="/gallery/"
              customStyles={ButtonStyles.secondary}
            />
          </LinkWrapper>
        </TitleWrapper>
        <div style={{ position: 'relative', flex: '1', overflow: 'hidden', zIndex: '0', margin: 0, padding: 0 }}>
          <Image
            image={getImage(image.childImageSharp)}
            alt={t('siteTitle')}
            isHero
          />
        </div>
      </HeroWrapper>
      <SectionMain main id={id} />
    </>
  )
}
