/**
 * SSR Helper Utilities
 * --------------------
 * Centralized utilities for Server-Side Rendering safety checks.
 *
 * Replaces 9+ occurrences of: typeof window !== 'undefined'
 */

/**
 * Check if code is running on the client side (browser)
 * @returns {boolean} true if running in browser, false if SSR
 */
export const isClientSide = () => typeof window !== 'undefined'

/**
 * Check if code is running on the server side (SSR)
 * @returns {boolean} true if running on server, false if browser
 */
export const isServerSide = () => typeof window === 'undefined'

/**
 * Get a value safely, with SSR fallback
 * @param {Function} clientGetter - Function to get value on client
 * @param {*} fallback - Fallback value for SSR
 * @returns {*} The value from clientGetter or fallback
 */
export const getClientValue = (clientGetter, fallback) => {
  if (isClientSide()) {
    try {
      return clientGetter()
    } catch {
      return fallback
    }
  }
  return fallback
}
