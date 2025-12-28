/**
 * ServiceContact Component
 * Contact section with phone number and CTA for service pages
 */

import React from 'react'
import { Link } from 'gatsby-plugin-react-i18next'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../../Cities/styles/sharedStyles'
import { CityCtaButton } from '../../Cities/CtaButton'
import { FORGE_COLORS } from '../../Cities/styles/forgedIronTheme'
import { PHONE_NUMBER } from 'consts/contactDetails'
import { PhoneIcon } from '../ServiceIcons'
import {
  ContactContent,
  ContactText,
  PhoneNumber,
  PhoneIconWrapper,
  ContactActions,
} from './ServiceContact.styles'

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.text1 - First paragraph
 * @param {string} props.text2 - Second paragraph
 * @param {string} props.hours - Business hours text
 * @param {string} [props.text3] - Optional third paragraph
 * @param {string} props.ctaText - CTA button text
 * @param {string} [props.ctaHref='/contact/'] - CTA button link
 */
export function ServiceContact({
  title,
  text1,
  text2,
  hours,
  text3,
  ctaText,
  ctaHref = '/contact/',
}) {
  return (
    <CitySection $bg={FORGE_COLORS.white}>
      <CityContainer>
        <CityTitle>{title}</CityTitle>
        <ContactContent>
          <ContactText>{text1}</ContactText>
          <ContactText>{text2}</ContactText>
          <PhoneNumber>
            <PhoneIconWrapper>
              <PhoneIcon />
            </PhoneIconWrapper>
            {PHONE_NUMBER}
          </PhoneNumber>
          <ContactText>{hours}</ContactText>
          {text3 && <ContactText>{text3}</ContactText>}
          <ContactActions>
            <CityCtaButton as={Link} to={ctaHref} variant="primary">
              {ctaText}
            </CityCtaButton>
          </ContactActions>
        </ContactContent>
      </CityContainer>
    </CitySection>
  )
}
