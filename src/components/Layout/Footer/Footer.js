import React from 'react'

import * as CONTACT_DETAILS from 'consts/contactDetails'

import {
  StyledFooter,
  FooterSection,
  FooterTitle,
  FooterParagraph,
  FooterLink,
} from 'components/Layout/Footer/Footer.styles'

import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

export const Footer = () => (
  <StyledFooter>
    <FooterSection>
      <FooterTitle>Pracownia Kowalstwa Artystycznego</FooterTitle>
      <FooterParagraph>Tadeusz Karny</FooterParagraph>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Informacje</FooterTitle>
      <FooterLink to="/contact/">Kontakt</FooterLink>
      <FooterLink to="/about/">O nas</FooterLink>
      <FooterLink to="/gallery/">Galeria</FooterLink>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Kontakt</FooterTitle>
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
      <FooterTitle>International</FooterTitle>
      <StyledAnchor to="/">English Version</StyledAnchor>
      <StyledAnchor to="/">Polish Version</StyledAnchor>
    </FooterSection>
  </StyledFooter>
)
