import React, { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import { MapLoadingElement } from './GoogleMap.styles'

/**
 * Google Maps Provider Component
 * This component handles loading the Google Maps script only once at the application level
 * It should be placed high in the component tree where Google Maps functionality is needed
 * 
 * In development mode, it shows a placeholder if no API key is available
 */
export const GoogleMapsProvider = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const apiKey = process.env.GATSBY_GOOGLE_API_KEY || '';
  
  // In development, provide a fallback for missing API key
  if (!apiKey && process.env.NODE_ENV === 'development') {
    return (
      <div style={{
        background: '#f8f8f8',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '20px',
        margin: '20px 0',
        textAlign: 'center',
        color: '#555',
        fontFamily: 'PT Sans, sans-serif'
      }}>
        <h3>Google Maps Preview</h3>
        <p>A Google Maps API key is required to display the map in development.</p>
        <p>In production, please ensure the GATSBY_GOOGLE_API_KEY environment variable is set.</p>
      </div>
    );
  }
  
  // Handle API errors
  const handleError = () => {
    setHasError(true);
  };
  
  // If we already detected an error, show the error message
  if (hasError) {
    return (
      <div style={{
        background: '#fff8f8', 
        border: '1px solid #ffdddd',
        borderRadius: '4px',
        padding: '20px',
        margin: '20px 0',
        textAlign: 'center',
        color: '#555',
        fontFamily: 'PT Sans, sans-serif'
      }}>
        <h3>Google Maps Error</h3>
        <p>There was an error loading Google Maps.</p>
        <p>Please check your API key configuration.</p>
      </div>
    );
  }
  
  return (
    <LoadScript
      googleMapsApiKey={apiKey}
      loadingElement={<MapLoadingElement />}
      onError={handleError}
    >
      {children}
    </LoadScript>
  )
}
