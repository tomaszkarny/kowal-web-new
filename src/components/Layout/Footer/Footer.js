import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'

import * as CONTACT_DETAILS from 'consts/contactDetails'
import { getCityPath } from 'utils/cityUtils'

import {
  StyledFooter,
  FooterSection,
  FooterTitle,
  FooterParagraph,
  FooterLink
} from 'components/Layout/Footer/Footer.styles'

import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

export function Footer() {
  const { t } = useTranslation('footer')
  const { languages, originalPath, language } = useI18next()
  
  // Hardcode popular cities for footer with proper slugs
  const popularCities = [
    { 
      id: 'bialystok', 
      slug: { pl: 'bialystok', en: 'bialystok' },
      name: { pl: 'Białystok', en: 'Białystok' } 
    },
    { 
      id: 'warszawa', 
      slug: { pl: 'warszawa', en: 'warsaw' },
      name: { pl: 'Warszawa', en: 'Warsaw' } 
    },
    { 
      id: 'suwalki', 
      slug: { pl: 'suwalki', en: 'suwalki' },
      name: { pl: 'Suwałki', en: 'Suwałki' } 
    },
    { 
      id: 'augustow', 
      slug: { pl: 'augustow', en: 'augustow' },
      name: { pl: 'Augustów', en: 'Augustów' } 
    },
    { 
      id: 'lomza', 
      slug: { pl: 'lomza', en: 'lomza' },
      name: { pl: 'Łomża', en: 'Łomża' } 
    },
  ]
  
  return (
    <StyledFooter>
      <FooterSection>
        <FooterTitle>{t('pracownia')}</FooterTitle>
        <FooterParagraph>Tadeusz Karny</FooterParagraph>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('informacje')}</FooterTitle>
        <FooterLink to="/contact/">{t('contact')}</FooterLink>
        <FooterLink to="/about/">{t('about')}</FooterLink>
        <FooterLink to="/gallery/">{t('gallery')}</FooterLink>
        <FooterLink to="/pricing/">{t('pricing')}</FooterLink>
        <FooterLink to="/faq/">{t('faq')}</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('kontakt')}</FooterTitle>
        {/* <FooterParagraph>{CONTACT_DETAILS.ADDRESS}</FooterParagraph> */}

        <StyledAnchor 
          href={`mailto:${CONTACT_DETAILS.EMAIL_ADDRESS}`}
          aria-label={t('emailUs')}
        >
          {CONTACT_DETAILS.EMAIL_ADDRESS}
        </StyledAnchor>

        <StyledAnchor 
          href={`tel:${CONTACT_DETAILS.PHONE_NUMBER}`}
          aria-label={t('callUs')}
        >
          {CONTACT_DETAILS.PHONE_NUMBER}
        </StyledAnchor>
        
        <StyledAnchor 
          href={CONTACT_DETAILS.GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('findUs')}
        >
          {CONTACT_DETAILS.ADDRESS}
        </StyledAnchor>

        <StyledAnchor 
          href={CONTACT_DETAILS.FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('followFacebook')}
        >
          {CONTACT_DETAILS.FACEBOOK_URL}
        </StyledAnchor>
        
        <StyledAnchor 
          href={CONTACT_DETAILS.INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('followInstagram')}
        >
          {CONTACT_DETAILS.INSTAGRAM_URL}
        </StyledAnchor>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('services')}</FooterTitle>
        <FooterLink to="/services/custom-fences/">
          {t('customFences')}
        </FooterLink>
        <FooterLink to="/services/custom-gates/">
          {t('customGates')}
        </FooterLink>
        <FooterLink to="/services/custom-railings/">
          {t('customRailings')}
        </FooterLink>
        <FooterLink to="/gallery/">{t('gallery')}</FooterLink>
        <FooterLink to="/gallery/wrought-iron-gates/">
          {t('galleryGates')}
        </FooterLink>
        <FooterLink to="/gallery/wrought-iron-railings/">
          {t('galleryRailings')}
        </FooterLink>
        <FooterLink to="/gallery/wrought-iron-fences/">
          {t('galleryFences')}
        </FooterLink>
      </FooterSection>
      
      <FooterSection>
        <FooterTitle>{t('popularCities')}</FooterTitle>
        {popularCities.map(city => {
          const cityPath = getCityPath(city)
          
          return (
            <FooterLink 
              key={city.id}
              to={cityPath}
            >
              {city.name[language]}
            </FooterLink>
          )
        })}
        <FooterLink 
          to="/cities/"
          key="all-cities"
        >
          {t('allCities')}
        </FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('international')}</FooterTitle>
        {languages.map(lng => {
          // Remove language prefix from originalPath to get clean path
          let cleanPath = originalPath || '/'
          // Remove /en/ prefix if exists
          if (cleanPath.startsWith('/en/')) {
            cleanPath = cleanPath.substring(3) // Remove '/en' part
          }
          
          return (
            <Link
              key={lng}
              to={cleanPath}
              language={lng}
              style={{
                textDecoration: lng === language ? 'underline' : 'none',
                marginBottom: '10px',
                display: 'block',
                color: lng === language ? '#ffcc00' : '#ffffff',
                opacity: lng === language ? '1' : '0.5',
                fontSize: '18px',
                lineHeight: '27px',
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                cursor: lng === language ? 'default' : 'pointer',
                transition: 'all 0.3s ease-in-out',
                fontWeight: lng === language ? 'bold' : 'normal'
              }}
              onMouseEnter={(e) => {
                // Only apply hover effect if not the current language
                if (lng !== language) {
                  e.target.style.opacity = '1'
                  e.target.style.textDecoration = 'underline'
                }
              }}
              onMouseLeave={(e) => {
                // Only remove hover effect if not the current language
                if (lng !== language) {
                  e.target.style.opacity = '0.5'
                  e.target.style.textDecoration = 'none'
                }
              }}
            >
              {(() => {
                const key = lng === 'en' ? 'englishVersion' : 'polishVersion'
                const fallback = lng === 'en' ? 'English Version' : 'Polish Version'
                return typeof t === 'function' ? t(key) : fallback
              })()}
            </Link>
          )
        })}
      </FooterSection>
    </StyledFooter>
  )
}
