import { useState, useEffect, useRef } from 'react'

/**
 * IntersectionObserver-based scroll reveal hook.
 * SSR-safe, triggers once by default for entrance animations.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1)
 * @param {string} options.rootMargin - Root margin for early/late trigger
 * @param {boolean} options.triggerOnce - Disconnect after first trigger
 * @returns {{ ref: React.RefObject, isVisible: boolean }}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) { // eslint-disable-line no-undef
      setIsVisible(true)
      return undefined
    }

    const element = ref.current
    if (!element) return undefined

    const observer = new IntersectionObserver( // eslint-disable-line no-undef
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.disconnect()
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, rootMargin, triggerOnce])

  return { ref, isVisible }
}
