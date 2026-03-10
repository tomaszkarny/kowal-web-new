import React, { useState, useEffect } from 'react'

/**
 * Component that only renders its children on the client side
 * Useful for components that don't work well with SSR
 */
export const ClientOnly = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? children : fallback
}

export default ClientOnly
