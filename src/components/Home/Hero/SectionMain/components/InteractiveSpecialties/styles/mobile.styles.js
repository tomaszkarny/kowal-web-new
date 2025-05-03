import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { mq } from 'utils/mediaQueries'

// Mobile-specific animations
const swipeHint = keyframes`
  0% { transform: translateX(0); opacity: 0.7; }
  50% { transform: translateX(10px); opacity: 1; }
  100% { transform: translateX(0); opacity: 0.7; }
`

const touchPulse = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
`

// Mobile container with touch-optimized styles
export const MobileSpecialtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1020px;
  margin: 2rem auto 10rem; /* Add extra bottom margin to prevent overlap */
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 1rem;
  z-index: 5; /* Ensure proper stacking */
  min-height: 500px; /* Ensure minimum height to prevent layout shifts */
  height: auto; /* Allow container to size based on content */

  /* Add a clear separator after the container */
  &:after {
    content: '';
    position: absolute;
    bottom: -5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 4px;
    background: linear-gradient(90deg, #525fc4, #6b7de0, #525fc4);
    border-radius: 2px;
    opacity: 0.5;
  }

  /* Show for mobile and tablet, hide for desktop */
  ${mq('medium')} {
    display: none;
  }
`

// Swipeable area for specialty items
export const SwipeableArea = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: none; /* Hide scrollbar on Firefox */
  position: relative;
  padding: 0.2rem 0;

  /* Hide scrollbar on Chrome/Safari */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Add swipe hint animation on first load */
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 10px;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23525fc4' width='24px' height='24px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    transform: translateY(-50%);
    opacity: 0.7;
    animation: ${swipeHint} 1.5s infinite;
    pointer-events: none;
    z-index: 10;
  }
  
  /* Responsive adjustments */
  @media (max-width: 480px) {
    padding: 0.1rem 0;
    margin: 0 -0.5rem; /* Negative margin to make better use of screen width */
    width: calc(100% + 1rem);
  }
`

// Horizontal list for mobile
export const MobileSpecialtyList = styled.ul`
  list-style: none;
  padding: 0.6rem 0.3rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  min-width: max-content;
  gap: 0.4rem;
  
  /* Much tighter spacing on small mobile */
  @media (max-width: 480px) {
    padding: 0.4rem 0.2rem;
    gap: 0.3rem;
  }
`

// Mobile specialty item
export const MobileSpecialtyItem = styled.li`
  padding: 0.4rem 0.6rem;
  padding-bottom: 0.3rem;
  display: flex;
  flex-direction: column; /* Stack icon and text vertically */
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  background: ${({ isActive }) => isActive ? 'rgba(82, 95, 196, 0.1)' : 'rgba(245, 246, 250, 0.8)'};
  border-bottom: ${({ isActive }) => isActive ? '2px solid #525fc4' : '2px solid transparent'};
  box-shadow: ${({ isActive }) => isActive ? '0 2px 6px rgba(82, 95, 196, 0.1)' : '0 1px 2px rgba(0, 0, 0, 0.05)'};
  white-space: normal; /* Allow text to wrap */
  min-width: 75px;
  max-width: 95px; /* Prevent overly wide items */
  word-wrap: break-word; /* Enable word breaking */
  text-align: center; /* Center-align for better text layout */
  height: auto; /* Allow height to adjust to content */
  
  /* Even smaller on mobile */
  @media (max-width: 480px) {
    padding: 0.3rem 0.4rem;
    padding-bottom: 0.2rem;
    min-width: 60px;
    max-width: 80px;
    border-radius: 5px;
    border-bottom-width: 1px;
  }

  /* Active state animation */
  ${({ isActive }) => isActive && css`
    animation: ${touchPulse} 2s infinite ease-in-out;
  `}

  /* Active indicator dot */
  ${({ isActive }) => isActive && css`
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: #525fc4;
    }
  `}

  /* Touch feedback */
  &:active {
    transform: scale(0.97);
    background: rgba(82, 95, 196, 0.15);
  }

  /* Icon styling */
  svg {
    margin-bottom: 0.3rem;
    transition: all 0.15s ease;
    color: ${({ isActive }) => isActive ? '#525fc4' : '#888'};
    font-size: 0.9rem;
    
    @media (max-width: 480px) {
      font-size: 0.75rem;
      margin-bottom: 0.2rem;
    }
  }

  span {
    font-size: 0.8rem;
    color: #333;
    transition: all 0.15s ease;
    font-weight: ${({ isActive }) => isActive ? '500' : '400'};
    display: block; /* Make span a block element for better wrapping */
    padding: 0;
    margin: 0;
    line-height: 1.1; /* Improve readability with better line height */
    hyphens: auto; /* Enable hyphenation for long words */
    
    @media (max-width: 480px) {
      font-size: 0.65rem;
      line-height: 1;
      letter-spacing: -0.2px; /* Slightly tighter letter spacing */
    }
  }
`

// Mobile image container
export const MobileImageContainer = styled.div`
  padding: 1.5rem;
  background: #f5f6fa;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 12px;
  margin: 0.5rem 1rem 1.5rem;

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
`

// Swipe indicator animation
const swipeIndicator = keyframes`
  0% { opacity: 0; transform: translateX(-20px); }
  20% { opacity: 0.7; transform: translateX(0); }
  80% { opacity: 0.7; transform: translateX(0); }
  100% { opacity: 0; transform: translateX(20px); }
`

// Mobile specialty image
export const MobileSpecialtyImage = styled.div`
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12), 0 5px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  z-index: 2;

  /* Add swipe indicators on the sides */
  &:before, &:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    background-size: contain;
    background-repeat: no-repeat;
    transform: translateY(-50%);
    opacity: 0;
    z-index: 10;
    pointer-events: none;
  }

  /* Left arrow */
  &:before {
    left: 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff' width='24px' height='24px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E");
  }

  /* Right arrow */
  &:after {
    right: 10px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ffffff' width='24px' height='24px'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'/%3E%3C/svg%3E");
  }

  /* Show indicators on touch start */
  &:active:before, &:active:after {
    opacity: 0.8;
    animation: ${swipeIndicator} 1s ease-in-out;
  }

  .specialty-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(1.02) contrast(1.05);
    position: relative;
    z-index: 2;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  &.fade-out .specialty-image {
    opacity: 0;
    transition: opacity 0.25s ease;
  }

  &.fade-in .specialty-image {
    opacity: 1;
    transition: opacity 0.25s ease;
  }

  /* Caption overlay */
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%);
    color: white;
    padding: 1.5rem 0.75rem 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    text-align: center;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 3px rgba(0,0,0,0.2);
    /* Ensure text is fully visible */
    max-height: none;
    overflow: visible;
    line-height: 1.3;
    word-break: break-word;
    z-index: 5;
  }

  /* Touch feedback */
  &:active {
    transform: scale(0.98);
  }
`

// Mobile progress dots container
export const MobileProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0.5rem 0 1rem;
  gap: 12px;
`

// Mobile progress dot
export const MobileProgressDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => active ? '#525fc4' : '#dddddd'};
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  outline: none;

  /* Make touch target larger than visual size */
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }

  ${({ active }) => active && css`
    transform: scale(1.4);
    box-shadow: 0 0 0 4px rgba(82, 95, 196, 0.2);
  `}
`

// Swipe indicators for visual feedback during active swipes
export const SwipeIndicator = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  pointer-events: none; /* Don't interfere with touches */
  opacity: 0;
  transition: opacity 0.2s ease;
  
  &.left {
    left: 15px;
  }
  
  &.right {
    right: 15px;
  }
  
  &.active {
    opacity: 1;
  }
  
  svg {
    font-size: 1.2rem;
    color: #525fc4;
  }
`

// Caption text styling (displayed below the image)
export const SpecialtyCaption = styled.div`
  text-align: center;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75rem 1rem;
  margin: 0.5rem auto;
  max-width: 90%;
  line-height: 1.3;
  background-color: rgba(245, 246, 250, 0.8);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`

// Swipe instruction text
export const SwipeInstruction = styled.div`
  text-align: center;
  color: #888;
  font-size: 0.85rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    font-size: 0.9rem;
    color: #525fc4;
  }

  ${mq('medium')} {
    display: none;
  }
`
