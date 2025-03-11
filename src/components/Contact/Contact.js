import React from 'react'

import { ContactDetails } from 'components/Contact/ContactDetails/ContactDetails'
import { ContactForm } from 'components/Contact/ContactForm/ContactForm'
import { WrappedGoogleMap } from 'components/Contact/GoogleMap/GoogleMap'

import { ContainerWrapper } from 'components/Contact/GoogleMap/GoogleMap.styles'
import { ContactWrapper } from 'components/Contact/Contact.styles'

export const Contact = () => {
  return (
    <>
      <ContactWrapper>
        <ContactDetails />
        <ContactForm />
      </ContactWrapper>
      <ContainerWrapper>
        <WrappedGoogleMap isMarkerShown />
      </ContainerWrapper>
    </>
  )
}
