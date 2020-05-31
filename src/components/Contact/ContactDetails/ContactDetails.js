import React from 'react'

import * as CONTACT_DETAILS from 'consts/contactDetails'

import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'
import { StyledSection } from 'components/common/StyledSection/StyledSection'

export const ContactDetails = () => {
  return (
    <StyledSection isAligned>
      <SectionTitle isAligned isUnderLined>
        Kontakt
      </SectionTitle>
      <SectionTitle main isAligned>
        {' '}
        Pracownia Kowalstwa Artystycznego
        <br /> Tadeusz Karny{' '}
      </SectionTitle>
      <SectionDescription isBolded main isUnderLined>
        {CONTACT_DETAILS.ADDRESS}
      </SectionDescription>
      <SectionDescription isBolded main isUnderLined>
        Email:{' '}
        <StyledAnchor isBolded href={`mailto:${CONTACT_DETAILS.EMAIL_ADDRESS}`}>
          {CONTACT_DETAILS.EMAIL_ADDRESS}
        </StyledAnchor>
      </SectionDescription>
      <SectionDescription isBolded isUnderLined main>
        Telefon:{' '}
        <StyledAnchor href={`tel:${CONTACT_DETAILS.PHONE_NUMBER}`} isBolded>
          {CONTACT_DETAILS.PHONE_NUMBER}
        </StyledAnchor>
      </SectionDescription>
      <SectionDescription main isBolded isUnderLined>
        Polub nas!{' '}
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
