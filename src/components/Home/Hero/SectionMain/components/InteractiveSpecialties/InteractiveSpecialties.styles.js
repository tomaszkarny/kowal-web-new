import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { mq } from 'utils/mediaQueries'

// Animation for immediate image transitions
const fadeIn = keyframes`
  from { opacity: 0.7; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`

// Smooth slide in animation
const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`

// Animation for forge-inspired hover effect
const forgeGlow = keyframes`
  0% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
  50% { box-shadow: 0 15px 40px rgba(255, 143, 31, 0.45), 0 0 15px rgba(255, 143, 31, 0.2); }
  100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
`

// Shimmering animation for decorative elements
const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`

export const SpecialtyContainer = styled.div`
  display: none; /* Hide on mobile by default */
  flex-direction: column;
  width: 100%;
  max-width: 1020px;
  margin: 3rem auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  position: relative;
  transform: translateY(0);
  transition: transform 0.4s ease-out, box-shadow 0.4s ease-out;
  z-index: 5; /* Ensure it's above other elements */
  margin-bottom: 6rem; /* Add extra space below to prevent overlap */
  height: auto; /* Allow container to size based on content */
  min-height: 500px; /* Ensure minimum height to prevent layout shifts */

  /* Add a subtle decorative border accent */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #525fc4, #6b7de0, #525fc4);
    background-size: 200% 100%;
    animation: ${shimmer} 3s infinite linear;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14), 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  ${mq('tablet')} {
    display: flex; /* Show on tablet and up */
    flex-direction: column;
    min-height: 600px; /* Larger minimum height on tablet */
  }

  ${mq('medium')} {
    flex-direction: row;
    max-width: 1100px;
    min-height: 650px; /* Even larger minimum height on desktop */
  }
`

export const SpecialtyContent = styled.div`
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;

  /* Subtle background pattern */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background-image: radial-gradient(circle, #f0f2ff 1px, transparent 1px);
    background-size: 15px 15px;
    opacity: 0.3;
    z-index: -1;
    border-radius: 50%;
    transform: translate(50%, -30%);
  }

  ${mq('small')} {
    padding: 2.2rem;
  }

  ${mq('medium')} {
    padding: 3rem;
    width: 40%;
  }
`

// Pulse animation for active elements
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 10px;
`

export const ProgressDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ active }) => active ? '#525fc4' : '#dddddd'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); /* Spring-like effect */
  position: relative;
  outline: none;

  &:hover, &:focus {
    background-color: ${({ active }) => active ? '#525fc4' : '#bbbbbb'};
    transform: scale(1.15); /* Subtle scale effect on hover for inactive dots */
  }

  ${({ active }) => active && css`
    transform: scale(1.4);
    box-shadow: 0 0 0 4px rgba(82, 95, 196, 0.2);
  `}
`

export const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(90deg, #525fc4, #6b7de0);
  width: ${({ progress }) => `${progress}%`};
  transition: width 0.1s linear;
  z-index: 3;
  opacity: 0.7;
`

export const SpecialtyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* Add animation to list items */
  & > li {
    animation: ${slideIn} 0.4s ease-out;
    animation-fill-mode: both;
  }

  /* Stagger animation timing for each item */
  & > li:nth-of-type(2) { animation-delay: 0.1s; }
  & > li:nth-of-type(3) { animation-delay: 0.2s; }
  & > li:nth-of-type(4) { animation-delay: 0.3s; }
  & > li:nth-of-type(5) { animation-delay: 0.4s; }
`

export const SpecialtyItem = styled.li`
  padding: 1.3rem 1.5rem;
  display: flex;
  align-items: center;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1); /* Faster transition for more immediate feedback */
  cursor: pointer;
  position: relative;
  background: ${({ isActive }) => isActive ? 'rgba(82, 95, 196, 0.1)' : 'transparent'};
  border-left: ${({ isActive }) => isActive ? '5px solid #525fc4' : '5px solid transparent'};
  margin-bottom: 0.3rem;
  box-shadow: ${({ isActive }) => isActive ? '0 4px 12px rgba(82, 95, 196, 0.1)' : 'none'};
  outline: none; /* Remove default focus outline */

  /* Add custom focus style for keyboard navigation */
  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(82, 95, 196, 0.4);
    background: rgba(82, 95, 196, 0.05);
  }

  /* Subtle pulse animation for the active item */
  ${({ isActive }) => isActive && css`
    &:after {
      content: '';
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #525fc4;
      animation: ${pulse} 2s infinite ease-in-out;
    }
  `}

  &:hover {
    background: rgba(82, 95, 196, 0.08); /* Slightly more visible background on hover */
    transform: translateX(8px); /* Slightly more movement for better visual feedback */
    box-shadow: 0 6px 14px rgba(82, 95, 196, 0.08); /* Subtle shadow on hover */
  }

  /* Create subtle border effect for inactive items */
  &:not(:last-child):after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 15%;
    width: 70%;
    height: 1px;
    background: #f0f0f0;
    opacity: ${({ isActive }) => isActive ? '0' : '1'};
    transition: opacity 0.3s ease;
  }

  /* Active state */
  ${({ isActive }) => isActive && `
    transform: translateX(8px);
    font-weight: 500;

    svg {
      color: #525fc4;
      transform: scale(1.2);
    }
  `}

  /* Icon styling */
  svg {
    margin-right: 1.2rem;
    transition: all 0.15s ease; /* Faster transition for icon color change */
    color: ${({ isActive }) => isActive ? '#525fc4' : '#888'};
    font-size: 1.15rem;
  }

  span {
    font-size: 1.05rem;
    color: #333;
    transition: all 0.15s ease; /* Faster transition for text */
    letter-spacing: 0.3px;

    ${mq('small')} {
      font-size: 1.2rem;
    }
  }
`

export const ImageContainer = styled.div`
  padding: 2rem;
  background: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  /* Add subtle pattern for texture */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(#525fc4 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.03;
    pointer-events: none;
  }

  /* Add decorative corner accent */
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, transparent 50%, rgba(82, 95, 196, 0.06) 50%);
    z-index: 1;
  }

  ${mq('medium')} {
    width: 60%;
    padding: 2.5rem;
  }
`

// Faster animation for immediate image transition
const crossFade = keyframes`
  0% { opacity: 0.6; transform: scale(0.99); }
  100% { opacity: 1; transform: scale(1); }
`

export const SpecialtyImage = styled.div`
  width: 100%;
  height: 380px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.07);
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 2;
  cursor: pointer;

  /* Removed the ::before pseudo-element so we don't cover the image with a white rectangle */

  .specialty-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1.02) contrast(1.05);
    position: relative;
    z-index: 1;
    opacity: 1;
    transition: opacity 0.5s ease;
    cursor: pointer;
  }

  &.fade-out .specialty-image {
    opacity: 0;
    transition: opacity 0.25s ease; /* Faster transition */
  }

  &.fade-in .specialty-image {
    opacity: 1;
    transition: opacity 0.25s ease; /* Faster transition */
  }

  /* CSS for fade animations */

  &:hover .specialty-image {
    transform: scale(1.07); /* Slightly larger scale for more impact */
    filter: brightness(1.05) contrast(1.07); /* Enhanced filter on hover */
  }

  &.animate-transition .specialty-image {
    animation: ${crossFade} 0.25s cubic-bezier(0.25, 0.1, 0.25, 1); /* Much faster transition */
    will-change: opacity, transform; /* Performance optimization */
  }

  /* Caption overlay */
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%);
    color: white;
    padding: 2.5rem 1.5rem 1.5rem;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    pointer-events: none; /* Allow clicks to pass through */
  }

  /* Add subtle border highlight */
  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    z-index: 2;
    pointer-events: none;
  }

  ${mq('medium')} {
    height: 490px;

    /* Create a forge-inspired glow on hover */
    &:hover {
      animation: ${forgeGlow} 3s infinite;
      transform: translateY(-5px);
    }
  }
`

export const FallbackImage = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
