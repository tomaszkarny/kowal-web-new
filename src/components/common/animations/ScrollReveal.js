import React from 'react'
import { useScrollReveal } from 'utils/hooks/useScrollReveal'
import { RevealWrapper } from './ScrollReveal.styles'

/**
 * Scroll-triggered reveal wrapper component.
 * Animates children into view when they enter the viewport.
 *
 * @param {Object} props
 * @param {'fadeUp'|'fadeIn'|'scaleIn'} props.variant - Animation variant
 * @param {number} props.delay - Delay in seconds
 * @param {number} props.duration - Duration in seconds
 * @param {number} props.threshold - IntersectionObserver threshold
 * @param {React.ReactNode} props.children
 */
export function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold })

  return (
    <RevealWrapper
      ref={ref}
      isVisible={isVisible}
      variant={variant}
      delay={delay}
      duration={duration}
    >
      {children}
    </RevealWrapper>
  )
}
