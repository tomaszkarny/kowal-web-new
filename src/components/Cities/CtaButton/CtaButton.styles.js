import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  light: '#ffffff'
}

export const StyledCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  background: ${({ $variant }) => $variant === 'light' ? COLORS.light : COLORS.primary};
  color: ${({ $variant }) => $variant === 'light' ? COLORS.primary : COLORS.light};
  border: 1px solid ${({ $variant }) => $variant === 'light' ? `${COLORS.primary}30` : 'transparent'};

  /* Bazowe style - mobile first */
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: ${({ $variant }) => $variant === 'light'
    ? '0 1px 4px rgba(0, 0, 0, 0.12)'
    : '0 2px 8px rgba(82, 95, 196, 0.2)'};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  /* Tablet */
  @media (min-width: 768px) {
    padding: 0.7rem 1.4rem;
    font-size: 0.95rem;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }

  /* Large desktop */
  @media (min-width: 1440px) {
    padding: 0.8rem 1.6rem;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ $variant }) => $variant === 'light'
    ? '0 4px 10px rgba(0, 0, 0, 0.15)'
    : '0 5px 14px rgba(82, 95, 196, 0.26)'};
    background: ${({ $variant }) => $variant === 'light' ? '#f8f9ff' : COLORS.dark};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${({ $variant }) => $variant === 'light' ? COLORS.primary : COLORS.light};
    outline-offset: 3px;
  }
`
