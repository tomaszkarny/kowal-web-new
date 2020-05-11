import React from 'react'

import {
  StyledFooter,
  FooterSection,
  FooterTitle,
  FooterParagraph,
  FooterLink,
} from 'components/Layout/Footer/Footer.styles'

export const Footer = () => (
  <StyledFooter>
    <FooterSection>
      <FooterTitle>Random Title</FooterTitle>
      <FooterParagraph>Random Description</FooterParagraph>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Information</FooterTitle>
      <FooterLink to="/contact/">Contact</FooterLink>
      <FooterLink to="/about/">About</FooterLink>
      <FooterLink to="/products/">Privacy</FooterLink>
    </FooterSection>

    <FooterSection>
      <FooterTitle>Deal with growth</FooterTitle>
      <FooterParagraph>Helping Shopify merchants to thrive</FooterParagraph>
    </FooterSection>

    <FooterSection>
      <FooterTitle>International</FooterTitle>
      <FooterLink to="/">English Version</FooterLink>
      <FooterLink to="/">Polish Version</FooterLink>
    </FooterSection>
  </StyledFooter>
)
