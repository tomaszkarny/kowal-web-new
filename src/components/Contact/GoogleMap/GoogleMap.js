import React, { useState, useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

import { WORKSHOP_LOCATION, GOOGLE_MAP_MARKER } from 'consts/consts'

import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'

const Map = ({ isMarkerShown }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMarker(null)
      }
    }
    window.addEventListener('keydown', listener)

    return () => {
      window.removeEventListener('keydown', listener)
    }
  }, [])

  return (
    <GoogleMap defaultZoom={15} defaultCenter={GOOGLE_MAP_MARKER}>
      {isMarkerShown && (
        <Marker
          position={GOOGLE_MAP_MARKER}
          onClick={() => {
            setSelectedMarker(!selectedMarker)
          }}
          title="Pracownia Kowalstwa Artystycznego - Tadeusz Karny"
        />
      )}

      {selectedMarker ? (
        <InfoWindow
          onCloseClick={() => {
            setSelectedMarker(null)
          }}
          position={GOOGLE_MAP_MARKER}
        >
          <div>
            <h5>Pracownia Kowalstwa Artystycznego - Tadeusz Karny</h5>
            <p>
              Hryniewicze 31 <br /> 15 - 378 Białystok
            </p>
            <p>kom: +48 604 253 145</p>
            <StyledAnchor
              isBolded
              href="https://www.google.com/maps/place/Pracownia+Kowalstwa+Artystycznego+-+Tadeusz+Karny/@53.079393,23.136083,18z/data=!3m1!4b1!4m6!3m5!1s0x471ff978bd2b0fa3:0xe1a3131fbae4b7cd!8m2!3d53.079393!4d23.136083!16s%2Fg%2F11ptsbc7kn"
              style={{ color: '#0066CC', opacity: 1, textDecoration: 'underline', fontSize: '14px' }}
            >
              See on Google Maps
            </StyledAnchor>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  )
}

export const WrappedGoogleMap = withScriptjs(withGoogleMap(Map))
