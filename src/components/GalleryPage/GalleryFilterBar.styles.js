import styled from '@emotion/styled'
import { css } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_GRADIENTS,
  FORGE_TRANSITIONS,
  FORGE_SPACING,
} from '../Cities/styles/forgedIronTheme'

export const FilterBarOuter = styled.div`
  position: sticky;
  top: 70px;
  z-index: 10;
  background: ${FORGE_GRADIENTS.ironDarkGradient};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);

  /* Bottom glow line to separate from content below */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(232, 92, 65, 0.25),
      transparent
    );
  }
`

export const FilterBarInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${FORGE_SPACING.sm} ${FORGE_SPACING.xl};
`

export const PrimaryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${FORGE_SPACING.xs};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2px; /* prevent clipping of focus rings */

  /* Hide scrollbar */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const SubRow = styled.div`
  overflow: hidden;
  max-height: ${({ isVisible }) => (isVisible ? '60px' : '0')};
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  transition: max-height 0.25s ease, opacity 0.2s ease, padding 0.25s ease;
  padding-top: ${({ isVisible }) => (isVisible ? FORGE_SPACING.xs : '0')};
  padding-bottom: ${({ isVisible }) => (isVisible ? '2px' : '0')};
  display: flex;
  align-items: center;
  gap: ${FORGE_SPACING.xs};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const pillActiveStyles = css`
  background: ${FORGE_GRADIENTS.emberGradient};
  color: ${FORGE_COLORS.white};
  box-shadow: ${FORGE_SHADOWS.emberButton};
  border-color: transparent;
`

const pillBaseStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  scroll-snap-align: start;
  flex-shrink: 0;
  padding: 0.45rem 0.95rem;
  border-radius: 100px;
  border: 1px solid rgba(232, 230, 227, 0.18);
  background: rgba(255, 255, 255, 0.1);
  color: ${FORGE_COLORS.textOnDark};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  transition: ${FORGE_TRANSITIONS.fast};
  letter-spacing: 0.01em;
  outline: none;
  line-height: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(232, 230, 227, 0.3);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px ${FORGE_COLORS.ember};
    border-color: ${FORGE_COLORS.ember};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const FilterPill = styled.button`
  ${pillBaseStyles}
  ${({ isActive }) => isActive && pillActiveStyles}
`

export const SubFilterPill = styled.button`
  ${pillBaseStyles}
  font-size: 0.8rem;
  padding: 0.35rem 0.85rem;
  border-color: rgba(232, 92, 65, 0.25);
  background: rgba(232, 92, 65, 0.08);
  color: rgba(232, 230, 227, 0.85);

  &:hover {
    background: rgba(232, 92, 65, 0.15);
    border-color: rgba(232, 92, 65, 0.4);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background: ${FORGE_GRADIENTS.emberGradient};
      color: ${FORGE_COLORS.white};
      box-shadow: ${FORGE_SHADOWS.emberButton};
      border-color: transparent;
    `}
`

export const CountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 600;
  opacity: 0.75;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 100px;
  padding: 0.1rem 0.38rem;
  letter-spacing: 0;

  ${FilterPill}[data-active="true"] & {
    opacity: 0.9;
    background: rgba(0, 0, 0, 0.25);
  }
`

export const LiveRegion = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
`
