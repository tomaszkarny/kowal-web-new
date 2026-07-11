import styled from '@emotion/styled'
import { FORGE_COLORS } from '../styles'

// Alias for compatibility
const COLORS = {
  ...FORGE_COLORS,
  light: FORGE_COLORS.white,
}

// Pick a style value by $variant prop with a fallback (avoids nested ternaries)
const byVariant = map => ({ $variant }) => map[$variant] ?? map.default

export const StyledCtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;

  /* Default: Ember button for light backgrounds */
  background: ${byVariant({
    light: COLORS.light,
    dark: `linear-gradient(180deg, ${COLORS.ironLight} 0%, ${COLORS.iron} 100%)`,
    default: `linear-gradient(135deg, ${COLORS.ember} 0%, ${COLORS.emberGlow} 100%)`,
  })};

  color: ${({ $variant }) =>
    $variant === 'light'
      ? COLORS.ember
      : COLORS.light
  };

  border: ${byVariant({
    light: `1px solid ${COLORS.ember}30`,
    dark: '1px solid rgba(255, 255, 255, 0.1)',
    default: 'none',
  })};

  border-radius: ${({ $variant }) => $variant === 'dark' ? '2px' : '4px'};

  /* Bazowe style - mobile first */
  padding: 0.85rem 1.5rem;
  font-size: 0.9rem;
  letter-spacing: ${({ $variant }) => $variant === 'dark' ? '0.08em' : '0.02em'};
  text-transform: ${({ $variant }) => $variant === 'dark' ? 'uppercase' : 'none'};

  box-shadow: ${byVariant({
    light: '0 1px 4px rgba(0, 0, 0, 0.12)',
    dark: 'none',
    default: '0 2px 8px rgba(232, 92, 65, 0.3)',
  })};

  /* Tablet */
  @media (min-width: 768px) {
    padding: 0.8rem 1.4rem;
    font-size: 0.95rem;
  }

  /* Desktop */
  @media (min-width: 1024px) {
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
  }

  /* Large desktop */
  @media (min-width: 1440px) {
    padding: 0.9rem 1.6rem;
  }

  &:hover {
    transform: translateY(-2px);

    background: ${byVariant({
      light: COLORS.ember,
      dark: `linear-gradient(180deg, ${COLORS.ember} 0%, #c94a33 100%)`,
      default: `linear-gradient(135deg, ${COLORS.emberGlow} 0%, ${COLORS.ember} 100%)`,
    })};

    color: ${COLORS.light};

    box-shadow: ${byVariant({
      light: '0 4px 12px rgba(232, 92, 65, 0.3)',
      dark: '0 4px 12px rgba(232, 92, 65, 0.3)',
      default: '0 4px 16px rgba(232, 92, 65, 0.4)',
    })};
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.ember};
    outline-offset: 3px;
  }
`
