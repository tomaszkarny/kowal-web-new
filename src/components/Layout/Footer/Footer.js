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

export const Footer = () => {
  const { t } = useTranslation('footer')
  const { languages, originalPath, language } = useI18next()
  
  // Import cities data for language switching logic
  const citiesData = require('data/cities')
  const cities = citiesData.CITIES || citiesData.default || citiesData
  
  // Function to generate correct language path
  const getLanguagePath = (targetLanguage, currentPath) => {
    // Clean up any malformed URLs with multiple prefixes first
    let cleanPath = currentPath
    // Remove all consecutive /en/ and /pl/ prefixes iteratively
    while (cleanPath.match(/^\/(?:en|pl)\/+(?:en|pl)\//)) {
      cleanPath = cleanPath.replace(/^\/(?:en|pl)\/+/, '/')
    }
    // Final cleanup of any remaining single prefix
    cleanPath = cleanPath.replace(/^\/(?:en|pl)\/+/, '/') || '/'
    
    // Check if this is a city page using the cleaned path
    const cityPageMatch = cleanPath.match(/^\/cities\/([^\/]+)\/?$/)
    
    if (cityPageMatch) {
      const currentSlug = cityPageMatch[1]
      
      // Find the city by current slug (could be in either language)
      const city = cities.find(city => 
        city.slug.pl === currentSlug || city.slug.en === currentSlug
      )
      
      if (city) {
        // Generate correct path for target language
        const targetSlug = city.slug[targetLanguage]
        if (targetLanguage === 'pl') {
          return `/cities/${targetSlug}/`  // Polish without prefix
        } else {
          return `/en/cities/${targetSlug}/`  // English with prefix
        }
      }
    }
    
    // For non-city pages, use the cleaned path
    if (targetLanguage === 'pl') {
      return cleanPath
    } else {
      return cleanPath === '/' ? '/en/' : `/en${cleanPath}`
    }
  }
  
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
          href={`https://${CONTACT_DETAILS.FACEBOOK_URL}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('followFacebook')}
        >
          {CONTACT_DETAILS.FACEBOOK_URL}
        </StyledAnchor>
        
        <StyledAnchor 
          href={`https://${CONTACT_DETAILS.INSTAGRAM_URL}`}
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
        <FooterLink to="/gallery/">{t('gallery')}</FooterLink>
      </FooterSection>
      
      <FooterSection>
        <FooterTitle>{t('popularCities')}</FooterTitle>
        {popularCities.map(city => {
          const cityPath = getCityPath(city, language)
          
          return (
            <FooterLink 
              key={city.id} 
              to={cityPath}
            >
              {city.name[language]}
            </FooterLink>
          )
        })}
        <FooterLink to="/cities/">{t('allCities')}</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('international')}</FooterTitle>
        {languages.map(lng => {
          // Use originalPath from Gatsby instead of window.location to avoid double prefixes
          const currentPath = originalPath || (typeof window !== 'undefined' ? window.location.pathname : '/')
          const targetPath = getLanguagePath(lng, currentPath)
          
          return (
            <a
              key={lng}
              href={targetPath}
              style={{
                textDecoration: 'none',
                marginBottom: '10px',
                display: 'block',
                color: lng === language ? '#ffcc00' : '#ffffff',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = '1'
                e.target.style.textDecoration = 'underline'
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = '1'
                e.target.style.textDecoration = 'none'
              }}
              onClick={() => {
                // Save language preference to localStorage when clicked
                if (typeof window !== 'undefined') {
                  window.localStorage.setItem('language', lng);
                }
              }}
            >
              {lng === 'en' ? t('englishVersion') : t('polishVersion')}
            </a>
          )
        })}
      </FooterSection>
    </StyledFooter>
  )
}
