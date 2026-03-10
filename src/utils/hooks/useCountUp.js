import { useState, useEffect, useRef } from 'react'

/**
 * Animated counter hook using requestAnimationFrame with easeOutCubic easing.
 *
 * @param {Object} options
 * @param {number} options.end - Target number
 * @param {number} options.duration - Animation duration in ms
 * @param {boolean} options.start - Whether to start counting
 * @returns {number} Current count value
 */
export function useCountUp({ end, duration = 2000, start = false }) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)
  const startTimeRef = useRef(null)

  useEffect(() => {
    if (!start) return undefined

    const easeOutCubic = (t) => 1 - (1 - t) ** 3

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp
      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      setCount(Math.round(easedProgress * end))

      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(animate)
      }
    }

    rafRef.current = window.requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
      }
    }
  }, [start, end, duration])

  return count
}
