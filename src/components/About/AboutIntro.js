import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import workbenchImg from 'assets/images/workbench.png'
import {
    HeroContainer,
    HeroOverlay,
    HeroContent,
    HeroTitle,
    HeroDescription,
    HeroScrollIndicator
} from './About.styles'

export const AboutIntro = () => {
    const { t } = useTranslation('about')
    const containerRef = useRef(null)

    // Query for a better hero image
    const { heroImage } = useStaticQuery(graphql`
        query AboutHeroImageQuery {
            heroImage: file(relativePath: { eq: "workbench.png" }) {
                childImageSharp {
                    gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP], quality: 90)
                }
            }
        }
    `)

    const heroImg = heroImage?.childImageSharp ? getImage(heroImage.childImageSharp) : null

    // Parallax effect on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return

            const scrollPosition = window.scrollY
            const translateY = scrollPosition * 0.3 // Adjust speed as needed

            // Apply parallax effect
            containerRef.current.style.backgroundPositionY = `calc(50% + ${translateY}px)`
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <HeroContainer
            ref={containerRef}
            style={{
                backgroundImage: `url(${workbenchImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <HeroOverlay />
            <HeroContent>
                <HeroTitle>
                    {t('title', 'Pracownia Kowalstwa Artystycznego Tadeusza Karny')}
                </HeroTitle>
                <HeroDescription>
                    {t(
                        'description',
                        'Pracownia Kowalstwa Artystycznego Tadeusza Karny powstała w 1993 roku. ' +
                        'Właściciel pracowni zdobył bogate doświadczenie podczas zatrudnienia w ' +
                        'Pracowni Konserwacji Zabytków w Białymstoku, dzięki temu posiada ' +
                        'uprawnienia konserwatorskie, oraz wszechstronne kwalifikacje, które obecnie ' +
                        'wykorzystuje prowadząc własną działalność.'
                    )}
                </HeroDescription>
                <HeroScrollIndicator />
            </HeroContent>
        </HeroContainer>
    )
}
