import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import * as CONTACT_DETAILS from 'consts/contactDetails'

import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'
import { StyledSection } from 'components/common/StyledSection/StyledSection'

export const ContactDetails = () => {
  const { t } = useTranslation('contact')
  return (
    <StyledSection isAligned>
      <SectionTitle isAligned isUnderLined>
        {t('contact')}
      </SectionTitle>
      <SectionTitle main isAligned>
        {t('workshopName')}
      </SectionTitle>
      <SectionDescription isBolded main isUnderLined>
        {CONTACT_DETAILS.ADDRESS}
      </SectionDescription>
      <SectionDescription isBolded main isUnderLined>
        {t('email')}:{' '}
        <StyledAnchor isBolded href={`mailto:${CONTACT_DETAILS.EMAIL_ADDRESS}`}>
          {CONTACT_DETAILS.EMAIL_ADDRESS}
        </StyledAnchor>
      </SectionDescription>
      <SectionDescription isBolded isUnderLined main>
        {t('phone')}:{' '}
        <StyledAnchor href={`tel:${CONTACT_DETAILS.PHONE_NUMBER}`} isBolded>
          {CONTACT_DETAILS.PHONE_NUMBER}
        </StyledAnchor>
      </SectionDescription>
      <SectionDescription main isBolded isUnderLined>
        {t('likeUs')}{' '}
        <StyledAnchor
          href={`https://${CONTACT_DETAILS.FACEBOOK_URL}`}
          target="_blank"
          isBolded
        >
          {CONTACT_DETAILS.FACEBOOK_URL}
        </StyledAnchor>
      </SectionDescription>
    </StyledSection>
  )
}
