import styled from '@emotion/styled'
import { FORGE_COLORS } from '../../styles'

// Alias for compatibility
const COLORS = {
  ...FORGE_COLORS,
  light: FORGE_COLORS.white,
}

export const StyledHeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  position: relative;

  /* Iron bar button style */
  background: linear-gradient(180deg, ${COLORS.ironLight} 0%, ${COLORS.iron} 100%);
  color: ${COLORS.textOnDark};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  padding: 0.9rem 2.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;

  /* Decorative side bars */
  &::before,
  &::after {
    content: '\u2550';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: ${COLORS.ember};
    opacity: 0.7;
    transition: all 0.3s ease;
  }

  &::before {
    left: 0.75rem;
  }

  &::after {
    right: 0.75rem;
  }

  /* Mobile - smaller button */
  @media (max-width: 480px) {
    padding: 0.8rem 2rem;
    font-size: 0.85rem;
  }

  /* Desktop optimization */
  @media (min-width: 1024px) {
    font-size: 0.9rem;
    padding: 0.9rem 2.5rem;
  }

  &:hover {
    background: linear-gradient(180deg, ${COLORS.ember} 0%, #c94a33 100%);
    color: ${COLORS.light};
    border-color: transparent;

    &::before,
    &::after {
      color: ${COLORS.light};
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.ember};
    outline-offset: 3px;
  }
`
