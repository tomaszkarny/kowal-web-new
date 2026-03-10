import { useState, useEffect } from 'react'

/**
 * Scroll position hook that returns whether the user has scrolled past a threshold.
 * Uses requestAnimationFrame throttling for performance.
 *
 * @param {number} threshold - Scroll distance in px to trigger
 * @returns {boolean} Whether scrolled past threshold
 */
export function useScrollPosition(threshold = 50) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    // Check initial position
    setIsScrolled(window.scrollY > threshold)

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isScrolled
}
