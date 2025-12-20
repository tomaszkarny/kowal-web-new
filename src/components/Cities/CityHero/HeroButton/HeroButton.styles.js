import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  secondary: '#6c5ce7',
  light: '#ffffff'
}

export const StyledHeroButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 50%, ${COLORS.primary} 100%);
  color: ${COLORS.light};
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: clamp(0.9rem, 1vw, 1rem);
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  min-width: auto;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  /* Mobile - smaller button */
  @media (max-width: 480px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.9rem;
  }

  /* Desktop optimization */
  @media (min-width: 1024px) {
    font-size: 1rem;
    padding: 0.8rem 1.6rem;
  }

  /* Large desktop */
  @media (min-width: 1440px) {
    font-size: 1rem;
    padding: 0.85rem 1.75rem;
  }

  &:hover {
    background: linear-gradient(135deg, ${COLORS.secondary} 0%, #8b7ff5 50%, ${COLORS.secondary} 100%);
    box-shadow: 0 6px 16px rgba(82, 95, 196, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.light};
    outline-offset: 3px;
  }
`
