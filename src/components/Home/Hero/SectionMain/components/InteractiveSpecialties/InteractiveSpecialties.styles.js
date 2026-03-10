import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { mq } from 'utils/mediaQueries'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_GRADIENTS,
  FORGE_TRANSITIONS,
  FORGE_RADIUS,
  hammeredTexture,
} from 'components/Cities/styles'

// Core image transition animation
const crossFade = keyframes`
  0% { opacity: 0.6; transform: scale(0.99); }
  100% { opacity: 1; transform: scale(1); }
`

export const SpecialtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  max-width: 1020px;
  margin: 2rem auto 3rem;
  background: linear-gradient(145deg, ${FORGE_COLORS.ironDark}, ${FORGE_COLORS.iron});
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  box-shadow: ${FORGE_SHADOWS.card};
  overflow: hidden;
  position: relative;
  z-index: 5;
  min-height: auto;

  /* Static ember gradient accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${FORGE_GRADIENTS.emberGradient};
    opacity: 0.6;
    z-index: 3;
  }

  /* Hammered texture overlay */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: ${hammeredTexture};
    opacity: 0.03;
    pointer-events: none;
    z-index: 0;
  }

  ${mq('medium')} {
    flex-direction: row;
    max-width: 1100px;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
`

export const SpecialtyContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  min-width: 0;

  ${mq('tablet')} {
    padding: 2rem;
  }

  ${mq('medium')} {
    padding: 2.5rem;
    width: 38%;
  }
`

export const SpecialtyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  max-width: 100%;
  overflow: hidden;

  ${mq('medium')} {
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 0.25rem;
    justify-content: flex-start;
  }
`

export const SpecialtyItem = styled.li`
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  border-radius: 4px;
  transition: ${FORGE_TRANSITIONS.fast};
  cursor: pointer;
  position: relative;
  color: ${FORGE_COLORS.textOnDark};
  background: ${({ isActive }) =>
    isActive ? 'rgba(232, 92, 65, 0.15)' : 'transparent'};
  border: 1px solid ${({ isActive }) =>
    isActive ? FORGE_COLORS.ember : 'rgba(232, 230, 227, 0.12)'};
  outline: none;
  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;

  &:focus-visible {
    box-shadow: 0 0 0 2px ${FORGE_COLORS.ember};
  }

  &:hover {
    background: rgba(232, 92, 65, 0.1);
    border-color: rgba(232, 92, 65, 0.4);
  }

  ${({ isActive }) =>
    isActive &&
    `
    font-weight: 500;

    svg {
      color: ${FORGE_COLORS.ember};
    }
  `}

  svg {
    margin-right: 0.8rem;
    transition: ${FORGE_TRANSITIONS.fast};
    color: ${({ isActive }) =>
      isActive ? FORGE_COLORS.ember : 'rgba(232, 230, 227, 0.5)'};
    font-size: 1rem;
  }

  span {
    font-size: 0.9rem;
    color: ${FORGE_COLORS.textOnDark};
    white-space: normal;
    letter-spacing: 0.3px;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }

  ${mq('medium')} {
    padding: 1rem 1.2rem;

    svg {
      font-size: 1.1rem;
    }

    span {
      font-size: 1.05rem;
    }
  }
`

export const ImageContainer = styled.div`
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  min-height: 280px;

  ${mq('tablet')} {
    min-height: 350px;
    padding: 2rem;
  }

  ${mq('medium')} {
    width: 62%;
    min-height: auto;
    padding: 2.5rem;
  }
`

export const SpecialtyImage = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  transition: ${FORGE_TRANSITIONS.smooth};
  z-index: 2;
  cursor: pointer;

  .specialty-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1.02) contrast(1.05);
    position: relative;
    z-index: 1;
    opacity: 1;
    transition: opacity 0.25s ease, transform 0.4s ease;
  }

  &.fade-out .specialty-image {
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &.fade-in .specialty-image {
    opacity: 1;
    transition: opacity 0.25s ease;
  }

  &:hover .specialty-image {
    transform: scale(1.03);
  }

  &.animate-transition .specialty-image {
    animation: ${crossFade} 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
    will-change: opacity, transform;
  }

  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.6) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    color: ${FORGE_COLORS.textOnDark};
    padding: 2.5rem 1.5rem 1.5rem;
    font-size: 1.15rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    pointer-events: none;
    z-index: 3;
  }

  /* Subtle inner border */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 4px;
    z-index: 2;
    pointer-events: none;
  }

  ${mq('tablet')} {
    height: 350px;
  }

  ${mq('medium')} {
    height: 420px;

    &:hover {
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3), ${FORGE_SHADOWS.emberGlow};
    }
  }
`

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 10px;
`

export const ProgressDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) =>
    active ? FORGE_COLORS.ember : 'rgba(232, 230, 227, 0.3)'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  outline: none;

  &:hover,
  &:focus {
    background-color: ${({ active }) =>
      active ? FORGE_COLORS.ember : 'rgba(232, 230, 227, 0.5)'};
    transform: scale(1.15);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${FORGE_COLORS.ember};
  }

  ${({ active }) =>
    active &&
    css`
      transform: scale(1.4);
      box-shadow: 0 0 0 4px rgba(232, 92, 65, 0.2);
    `}
`

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${FORGE_GRADIENTS.emberGradient};
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.1s linear;
  z-index: 3;
  opacity: 0.8;
`

export const FallbackImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${FORGE_COLORS.textOnDark};
`
