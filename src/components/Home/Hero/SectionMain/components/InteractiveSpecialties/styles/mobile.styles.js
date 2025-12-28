import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'
import { mq } from 'utils/mediaQueries'
import { THEME } from 'consts/theme'

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
    background: linear-gradient(90deg, ${THEME.color.primary}, ${THEME.color.primaryLight}, ${THEME.color.primary});
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
  touch-action: pan-y pinch-zoom; /* Allow vertical scroll and zoom, but handle horizontal swipes */

  /* Hide scrollbar on Chrome/Safari */
  &::-webkit-scrollbar {
    display: none;
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
  padding: 1rem 0.5rem;
  margin: 0;
  display: flex;
  flex-direction: row;
  min-width: max-content;
  gap: 0.8rem;
  
  /* Adjusted spacing on small mobile */
  @media (max-width: 480px) {
    padding: 0.8rem 0.4rem;
    gap: 0.6rem;
  }
`

// Mobile specialty item with performance optimizations
export const MobileSpecialtyItem = styled.li`
  padding: 0.8rem 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  background: ${({ isActive }) => isActive ? 'rgba(232, 92, 65, 0.15)' : 'rgba(255, 255, 255, 0.9)'};
  border: ${({ isActive }) => isActive ? `2px solid ${THEME.color.primary}` : '2px solid rgba(0, 0, 0, 0.08)'};
  box-shadow: ${({ isActive }) => isActive
    ? '0 4px 12px rgba(232, 92, 65, 0.25), 0 0 0 3px rgba(232, 92, 65, 0.1)'
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  white-space: normal;
  min-width: 85px;
  max-width: 110px;
  word-wrap: break-word;
  text-align: center;
  height: auto;
  min-height: 80px;
  
  /* Performance optimizations */
  will-change: ${({ isActive }) => isActive ? 'transform, background' : 'auto'};
  transform: translateZ(0); /* Force hardware acceleration */
  -webkit-tap-highlight-color: transparent; /* Remove iOS tap highlight */
  touch-action: manipulation; /* Prevent double-tap zoom */
  
  /* CSS-only transitions for better performance */
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  
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
    transform: translateY(-2px);
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
      background-color: ${THEME.color.primary};
    }
  `}

  /* Touch feedback */
  &:active {
    transform: scale(0.97);
    background: rgba(232, 92, 65, 0.15);
  }

  /* Icon styling */
  svg {
    margin-bottom: 0.5rem;
    transition: all 0.15s ease;
    color: ${({ isActive }) => isActive ? THEME.color.primary : '#666'};
    font-size: 1.2rem;
    
    @media (max-width: 480px) {
      font-size: 1.1rem;
      margin-bottom: 0.4rem;
    }
  }

  span {
    font-size: 0.85rem;
    color: ${({ isActive }) => isActive ? '#1a1a1a' : '#444'};
    transition: all 0.15s ease;
    font-weight: ${({ isActive }) => isActive ? '600' : '500'};
    display: block;
    padding: 0;
    margin: 0;
    line-height: 1.2;
    hyphens: auto;
    letter-spacing: -0.01em;
    
    @media (max-width: 480px) {
      font-size: 0.8rem;
      line-height: 1.15;
    }
  }
`

// Mobile image container
export const MobileImageContainer = styled.div`
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fc, #f0f2f7);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  border-radius: 16px;
  margin: 1rem 0.5rem;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);

  /* Add subtle pattern for texture */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: radial-gradient(${THEME.color.primary} 1px, transparent 1px);
    background-size: 40px 40px;
    opacity: 0.03;
    pointer-events: none;
  }
`


// Mobile specialty image with performance optimizations
export const MobileSpecialtyImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);
  z-index: 2;
  border: 1px solid rgba(0, 0, 0, 0.05);
  
  /* Performance optimizations */
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration */
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-y pinch-zoom; /* Allow vertical scroll and zoom, but handle horizontal swipes */
  backface-visibility: hidden; /* Prevent flickering */
  
  /* Smooth transitions */
  transition: transform 0.2s ease;


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
  margin: 1rem 0 1.5rem;
  gap: 10px;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
`

// Mobile progress dot
export const MobileProgressDot = styled.button`
  width: ${({ active }) => active ? '24px' : '10px'};
  height: 10px;
  border-radius: ${({ active }) => active ? '5px' : '50%'};
  background-color: ${({ active }) => active ? THEME.color.primary : '#c5c5c5'};
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
    box-shadow: 0 0 0 4px rgba(232, 92, 65, 0.2);
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
    color: ${THEME.color.primary};
  }
`

// Caption text styling (displayed below the image)
export const SpecialtyCaption = styled.div`
  text-align: center;
  color: #1a1a1a;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem 1.25rem;
  margin: 1rem auto 0.5rem;
  max-width: 85%;
  line-height: 1.4;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(245, 246, 250, 0.95));
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  position: relative;
  
  /* Add subtle accent line */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: ${THEME.color.primary};
    border-radius: 2px;
  }
`

// Swipe instruction text
export const SwipeInstruction = styled.div`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  margin: 1rem 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(232, 92, 65, 0.05);
  border-radius: 20px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  svg {
    font-size: 1rem;
    color: ${THEME.color.primary};
    animation: ${swipeHint} 2s ease-in-out infinite;
  }

  ${mq('medium')} {
    display: none;
  }
`
