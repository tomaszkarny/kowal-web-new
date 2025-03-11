import React from 'react'

import { ContactDetails } from 'components/Contact/ContactDetails/ContactDetails'
import { ContactForm } from 'components/Contact/ContactForm/ContactForm'
import { WrappedGoogleMap } from 'components/Contact/GoogleMap/GoogleMap'

import {
  ContainerWrapper,
  StyledMapElement,
} from 'components/Contact/GoogleMap/GoogleMap.styles'
import { ContactWrapper } from 'components/Contact/Contact.styles'

export const Contact = () => {
  return (
    <>
      <ContactWrapper>
        <ContactDetails />
        <ContactForm />
      </ContactWrapper>
      <WrappedGoogleMap
        isMarkerShown
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places${process.env.GATSBY_GOOGLE_API_KEY ? `&key=${process.env.GATSBY_GOOGLE_API_KEY}` : ''}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<ContainerWrapper />}
        mapElement={<StyledMapElement />}
      />
    </>
  )
}
