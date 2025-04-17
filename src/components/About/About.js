import React, { useEffect } from 'react'
import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { Link } from 'components/common/Link/Link'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { AboutIntro } from './AboutIntro'
import { AboutLocations } from './AboutLocations'
import { AboutImages } from './AboutImages'
import { AboutCraft } from './AboutCraft'
import { AboutTestimonials } from './AboutTestimonials'
import { AboutTimeline } from './AboutTimeline'
import { SectionDivider, SectionWave, LinkWrapper } from './About.styles'

export const About = () => {
  const { t } = useTranslation('about')

  // Add smooth scrolling behavior to the page
  useEffect(() => {
    // Save the original scroll behavior
    const originalStyle = window.getComputedStyle(document.documentElement).scrollBehavior;

    // Set smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Restore original scroll behavior on unmount
    return () => {
      document.documentElement.style.scrollBehavior = originalStyle;
    };
  }, []);

  return (
    <StyledSection>
      <AboutIntro />
      <SectionWave>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Subtler path with reduced height and transparent primary color fill */}
          <path d="M0 0 Q 360 40 720 20 T 1440 0 V 60 H 0 V 0 Z" fill="rgba(82, 95, 196, 0.15)" />
        </svg>
      </SectionWave>
      <AboutImages />
      <SectionDivider />
      <AboutCraft />
      <SectionDivider />
      <AboutTestimonials />
      <SectionDivider />
      <AboutTimeline />
      <SectionDivider />
      <AboutLocations />
      <SectionDivider />
      <LinkWrapper>
        <Link to="/contact/" primary text={t('contactUs')} />
        <Link to="/gallery/" text={t('viewGallery')} />
      </LinkWrapper>
    </StyledSection>
  )
}
