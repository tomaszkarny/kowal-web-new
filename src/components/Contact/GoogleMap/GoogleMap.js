import React, { useState, useEffect } from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps'

import { GOOGLE_MAP_DIRECTIONS, GOOGLE_MAP_MARKER } from 'consts/consts'

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
          </div>
        </InfoWindow>
      ) : null}
    </GoogleMap>
  )
}

export const WrappedGoogleMap = withScriptjs(withGoogleMap(Map))
