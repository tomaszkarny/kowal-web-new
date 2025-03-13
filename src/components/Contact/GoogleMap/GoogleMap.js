import React, { useState, useEffect, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api'

import { WORKSHOP_LOCATION, GOOGLE_MAP_MARKER } from 'consts/consts'
import { StyledAnchor } from 'components/common/StyledAnchor/StyledAnchor'
import {
  MapContainer,
  InfoTitle,
  InfoText,
  mapContainerStyle,
  MapLoadingElement
} from './GoogleMap.styles'

export const WrappedGoogleMap = ({ isMarkerShown }) => {
  const [selectedMarker, setSelectedMarker] = useState(null)
  const [map, setMap] = useState(null)

  const onMapLoad = useCallback((map) => {
    setMap(map)
  }, [])

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
    <MapContainer>
      <LoadScript
        googleMapsApiKey={process.env.GATSBY_GOOGLE_API_KEY || ''}
        loadingElement={<MapLoadingElement />}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={WORKSHOP_LOCATION}
          onLoad={onMapLoad}
        >
          {isMarkerShown && (
            <Marker
              position={WORKSHOP_LOCATION}
              onClick={() => {
                setSelectedMarker(!selectedMarker)
              }}
            />
          )}

          {selectedMarker && (
            <InfoWindow
              position={WORKSHOP_LOCATION}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <InfoTitle>Pracownia Kowalstwa Artystycznego - Tadeusz Karny</InfoTitle>
                <InfoText>
                  Hryniewicze 31 <br /> 15 - 378 Białystok
                </InfoText>
                <InfoText>kom: +48 604 253 145</InfoText>
                <StyledAnchor
                  isBolded
                  href="https://www.google.com/maps/place/Pracownia+Kowalstwa+Artystycznego+-+Tadeusz+Karny/@53.079393,23.136083,18z/data=!3m1!4b1!4m6!3m5!1s0x471ff978bd2b0fa3:0xe1a3131fbae4b7cd!8m2!3d53.079393!4d23.136083!16s%2Fg%2F11ptsbc7kn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See on Google Maps
                </StyledAnchor>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  )
}
