import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

// Styles
import {
  StyledNapDisplay,
  BusinessName,
  AddressContainer,
  ContactInfoContainer,
  HoursContainer,
  HoursList,
  HoursItem,
  DayLabel,
  HoursLabel,
  SectionHeader,
  SocialLinks
} from './NapDisplay.styles'

// Constants
import { 
  getNapInfo, 
  BUSINESS_NAME_ML,
  ADDRESS_ML,
  PHONE_NUMBER,
  PHONE_NUMBER_DISPLAY,
  EMAIL_ADDRESS,
  OPENING_HOURS_ML,
  FACEBOOK_URL,
  INSTAGRAM_URL
} from 'consts/contactDetails'

/**
 * Component for displaying consistent Name, Address, Phone (NAP) information
 * 
 * @param {Object} props - Component props
 * @param {string} props.variant - Display variant ('full', 'compact', 'footer')
 * @param {boolean} props.showHours - Whether to display business hours
 * @param {boolean} props.showSocialLinks - Whether to display social media links
 * @param {boolean} props.showEmail - Whether to display email address
 * @param {boolean} props.showMap - Whether to display a Google Map link
 * @param {Object} props.className - CSS class for styling
 */
export const NapDisplay = ({
  variant = 'full',
  showHours = true,
  showSocialLinks = true,
  showEmail = true,
  showMap = true,
  className
}) => {
  const { t, i18n } = useTranslation('common')
  const currentLang = i18n.language || 'pl'
  
  // Get NAP info for current language
  const napInfo = getNapInfo(currentLang)
  
  // Determine what elements to show based on variant
  const isCompact = variant === 'compact'
  const isFooter = variant === 'footer'
  
  // Adjust what to show based on variant
  const displayHours = showHours && !isCompact
  const displaySocial = showSocialLinks && !isCompact
  
  return (
    <StyledNapDisplay className={className}>
      <BusinessName>
        {napInfo.businessName}
      </BusinessName>
      
      <AddressContainer>
        {showMap ? (
          <StyledAnchor 
            href={`https://maps.google.com/?q=${napInfo.address.street},${napInfo.address.postalCode},${napInfo.address.city}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('map_directions')}
          >
            {napInfo.address.full}
          </StyledAnchor>
        ) : (
          <span>{napInfo.address.full}</span>
        )}
      </AddressContainer>
      
      <ContactInfoContainer>
        <StyledAnchor 
          href={`tel:${napInfo.phone}`}
          aria-label={t('call_us')}
        >
          {napInfo.phoneFormatted}
        </StyledAnchor>
        
        {showEmail && (
          <StyledAnchor 
            href={`mailto:${napInfo.email}`}
            aria-label={t('email_us')}
          >
            {napInfo.email}
          </StyledAnchor>
        )}
      </ContactInfoContainer>
      
      {displayHours && (
        <HoursContainer>
          <SectionHeader>
            {t('opening_hours')}
          </SectionHeader>
          <HoursList>
            {napInfo.openingHours.map((item, index) => (
              <HoursItem key={`hours-${index}`}>
                <DayLabel>{item.days}</DayLabel>
                <HoursLabel>{item.hours}</HoursLabel>
              </HoursItem>
            ))}
          </HoursList>
        </HoursContainer>
      )}
      
      {displaySocial && (
        <SocialLinks>
          {FACEBOOK_URL && (
            <StyledAnchor 
              href={`https://${FACEBOOK_URL}`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t('visit_facebook')}
            >
              {FACEBOOK_URL}
            </StyledAnchor>
          )}
          {INSTAGRAM_URL && (
            <StyledAnchor 
              href={`https://${INSTAGRAM_URL}`}
              target="_blank" 
              rel="noopener noreferrer"
              aria-label={t('visit_instagram')}
            >
              {INSTAGRAM_URL}
            </StyledAnchor>
          )}
        </SocialLinks>
      )}
    </StyledNapDisplay>
  )
}

export default NapDisplay
