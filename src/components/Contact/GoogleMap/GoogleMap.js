import React, { useState, useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

import { GOOGLE_MAP_DIRECTIONS, GOOGLE_MAP_MARKER } from 'consts/consts'

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
    <GoogleMap defaultZoom={8} defaultCenter={GOOGLE_MAP_DIRECTIONS}>
      {isMarkerShown && (
        <Marker
          position={GOOGLE_MAP_DIRECTIONS}
          onClick={() => {
            setSelectedMarker(!selectedMarker)
          }}
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
            <StyledAnchor href="ttps://www.google.com/maps/place/Pracownia+Kowalstwa+Artystycznego+-+Tadeusz+Karny/@53.1207196,23.079953,12z/data=!4m19!1m13!4m12!1m4!2m2!1d23.1397079!2d53.1595208!4e1!1m6!1m2!1s0x471ff978bd2b0fa3:0xe1a3131fbae4b7cd!2sPracownia+Kowalstwa+Artystycznego+-+Tadeusz+Karny,+k,+Bia%C5%82ystok+31,+15-378+Hryniewicze!2m2!1d23.1371503!2d53.0805839!3m4!1s0x471ff978bd2b0fa3:0xe1a3131fbae4b7cd!8m2!3d53.0805839!4d23.1371503">
              See on Google Maps
            </StyledAnchor>
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  )
}

export const WrappedGoogleMap = withScriptjs(withGoogleMap(Map))
