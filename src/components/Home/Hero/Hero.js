import React, { useState, useEffect, useRef, useCallback } from 'react'

import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { Image } from 'components/common/Image/Image'

import {
  HeroWrapper,
  TitleWrapper,
  ImageOverlay,
  ButtonStyles,
  ImageContainer
} from 'components/Home/Hero/Hero.styles'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'

import { Link } from 'components/common/Link/Link'
import { LinkWrapper } from 'components/common/Link/Link.styles'

import { SECTION_IDS } from 'consts/sectionID'

export function Hero() {
  const { t } = useTranslation('common')
  const [isMounted, setIsMounted] = useState(false)
  const [parallaxOffset, setParallaxOffset] = useState(0)
  const heroRef = useRef(null)

  const { image } = useStaticQuery(graphql`
    query MyQuery {
      image: file(relativePath: { eq: "Hero_image.webp" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            height: 1080
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
            quality: 85
            transformOptions: {
              cropFocus: CENTER
              fit: COVER
            }
            breakpoints: [768, 1024, 1366, 1920]
          )
        }
      }
    }
  `)

  useEffect(() => {
    // Trigger entrance animations after mount
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Parallax scroll handler - disabled on mobile
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return
    const { scrollY } = window
    const maxOffset = 200
    setParallaxOffset(Math.min(scrollY * 0.3, maxOffset))
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return undefined

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [handleScroll])

  const handleItemClick = e => {
    e.preventDefault()

    const element = document.querySelector(`#${e.target.name}`)

    window.scroll({
      top: element.offsetTop - 60,
      behavior: 'smooth',
    })
  }

  return (
    <HeroWrapper ref={heroRef}>
        <ImageOverlay />
        <TitleWrapper isMounted={isMounted}>
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
        <ImageContainer
          className="image-container"
          style={{
            transform: parallaxOffset ? `translateY(${parallaxOffset}px)` : undefined,
          }}
        >
          <Image
            image={getImage(image.childImageSharp)}
            alt={t('siteTitle')}
            isHero
          />
        </ImageContainer>
      </HeroWrapper>
  )
}
