import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { mq } from 'utils/mediaQueries'

// Animation for image transitions
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

// Animation for forge-inspired hover effect
const forgeGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(82, 95, 196, 0.2); }
  50% { box-shadow: 0 0 15px rgba(82, 95, 196, 0.5); }
  100% { box-shadow: 0 0 5px rgba(82, 95, 196, 0.2); }
`

export const SpecialtyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  
  ${mq('medium')} {
    flex-direction: row;
    max-width: 90%;
  }
`

export const SpecialtyContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  
  ${mq('medium')} {
    padding: 2rem;
    width: 40%;
  }
`

export const SpecialtyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

export const SpecialtyItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  background: ${({ isActive }) => isActive ? 'rgba(82, 95, 196, 0.1)' : 'transparent'};
  border-left: ${({ isActive }) => isActive ? '4px solid #525fc4' : '4px solid transparent'};
  
  &:hover {
    background: rgba(82, 95, 196, 0.05);
  }
  
  /* Active state */
  ${({ isActive }) => isActive && `
    transform: translateX(5px);
    font-weight: 500;
    
    svg {
      color: #525fc4;
    }
  `}
  
  /* Icon styling */
  svg {
    margin-right: 1rem;
    transition: all 0.3s ease;
    color: ${({ isActive }) => isActive ? '#525fc4' : '#666'};
  }
  
  span {
    font-size: 1rem;
    color: #333;
    
    ${mq('small')} {
      font-size: 1.1rem;
    }
  }
`

export const ImageContainer = styled.div`
  padding: 1.5rem;
  background: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  
  ${mq('medium')} {
    width: 60%;
    padding: 2rem;
  }
`

export const SpecialtyImage = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  /* Applying animation to image transitions */
  .specialty-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${fadeIn} 0.5s ease-out;
    transition: transform 0.5s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  /* Caption overlay */
  .image-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
    color: white;
    padding: 1.5rem 1rem 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: center;
  }
  
  ${mq('medium')} {
    height: 400px;
    
    /* Create a forge-inspired glow on hover */
    &:hover {
      animation: ${forgeGlow} 2s infinite;
    }
  }
`
