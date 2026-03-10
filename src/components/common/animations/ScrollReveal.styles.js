import styled from '@emotion/styled'

const getInitialTransform = (variant) => {
  switch (variant) {
    case 'fadeUp':
      return 'translateY(30px)'
    case 'scaleIn':
      return 'scale(0.95)'
    case 'fadeIn':
    default:
      return 'none'
  }
}

export const RevealWrapper = styled.div`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible, variant }) =>
    isVisible ? 'none' : getInitialTransform(variant)};
  transition: opacity ${({ duration }) => duration}s ease-out,
    transform ${({ duration }) => duration}s ease-out;
  transition-delay: ${({ delay }) => delay}s;
  will-change: ${({ isVisible }) => (isVisible ? 'auto' : 'opacity, transform')};
`
