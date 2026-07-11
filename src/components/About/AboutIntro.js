import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import workbenchImg from 'assets/images/workbench.png'
import {
    HeroContainer,
    HeroOverlay,
    HeroContent,
    HeroTitle,
    HeroDescription,
    HeroScrollIndicator
} from './About.styles'

export function AboutIntro() {
    const { t } = useTranslation('about')
    const containerRef = useRef(null)

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
