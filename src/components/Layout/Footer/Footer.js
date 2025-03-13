import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useI18next } from 'gatsby-plugin-react-i18next'

import * as CONTACT_DETAILS from 'consts/contactDetails'

import {
  StyledFooter,
  FooterSection,
  FooterTitle,
  FooterParagraph,
  FooterLink,
  LanguageLink
} from 'components/Layout/Footer/Footer.styles'

import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

export const Footer = () => {
  const { t } = useTranslation('footer')
  const { languages, originalPath, language } = useI18next()
  
  return (
    <StyledFooter>
      <FooterSection>
        <FooterTitle>{t('pracownia')}</FooterTitle>
        <FooterParagraph>Tadeusz Karny</FooterParagraph>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('informacje')}</FooterTitle>
        <FooterLink to="/contact">{t('contact')}</FooterLink>
        <FooterLink to="/about">{t('about')}</FooterLink>
        <FooterLink to="/gallery">{t('gallery')}</FooterLink>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('kontakt')}</FooterTitle>
        {/* <FooterParagraph>{CONTACT_DETAILS.ADDRESS}</FooterParagraph> */}

        <StyledAnchor href={`mailto:${CONTACT_DETAILS.EMAIL_ADDRESS}`}>
          {CONTACT_DETAILS.EMAIL_ADDRESS}
        </StyledAnchor>

        <StyledAnchor href={`https://${CONTACT_DETAILS.FACEBOOK_URL}`}>
          {CONTACT_DETAILS.FACEBOOK_URL}
        </StyledAnchor>

        <StyledAnchor href={`tel:${CONTACT_DETAILS.PHONE_NUMBER}`}>
          {CONTACT_DETAILS.PHONE_NUMBER}
        </StyledAnchor>
      </FooterSection>

      <FooterSection>
        <FooterTitle>{t('international')}</FooterTitle>
        {languages.map(lng => (
          <LanguageLink 
            key={lng} 
            to={originalPath} 
            language={lng}
            active={lng === language}
          >
            {lng === 'en' ? t('englishVersion') : t('polishVersion')}
          </LanguageLink>
        ))}
      </FooterSection>
    </StyledFooter>
  )
}
