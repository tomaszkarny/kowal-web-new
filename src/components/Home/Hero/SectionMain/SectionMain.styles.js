import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import { mq } from 'utils/mediaQueries'
import { THEME } from 'consts/theme'

// Animation for decorative elements
const forgeEmber = keyframes`
  0% { opacity: 0.2; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.2; transform: scale(0.95); }
`

export const SpecializationWrapper = styled.section`
  background: linear-gradient(to bottom, #f8f9ff, #fafafa);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5rem 2rem;
  position: relative;
  
  /* Top decorative bar */
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 6px;
    background: linear-gradient(90deg, #525fc4, #6b7de0, #525fc4);
    border-radius: 3px;
    box-shadow: 0 2px 10px rgba(82, 95, 196, 0.2);
  }
  
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
    z-index: 0;
  }
  
  /* Add decorative corner elements */
  &:after {
    content: '';
    position: absolute;
    top: 40px;
    right: 40px;
    width: 120px;
    height: 120px;
    background-image: radial-gradient(circle, #f0f2ff 2px, transparent 2px);
    background-size: 20px 20px;
    opacity: 0.4;
    z-index: 0;
    border-radius: 60px;
  }
  
  /* Ensure content stays above the pattern */
  & > * {
    position: relative;
    z-index: 1;
  }
  
  ${mq('tablet')} {
    padding: 6rem 3rem 7rem;
  }
  
  ${mq('desktop')} {
    padding: 7rem 3rem 8rem;
  }
`

// Remove the connector as it's conflicting with existing layout
export const SectionConnector = styled.div`
  display: none;
`

export const SectionHeading = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #222;
  font-weight: 600;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
    color: #525fc4;
    font-size: 1.2rem;
  }
`

export const HelpText = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-top: 2rem;
  font-style: italic;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: #525fc4;
  }
`

export const StyledSpecialtyList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  list-style: none;
  padding: 2rem;
  margin: 2.5rem 0;
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  
  ${mq('tablet')} {
    padding: 2rem;
    gap: 1.25rem;
  }
`

export const SpecialtyItem = styled.li`
  padding: 0.75rem 0.5rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.05);
  page-break-inside: avoid;
  break-inside: avoid;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    transform: translateX(5px);
    background: rgba(82, 95, 196, 0.05);
    border-radius: 4px;
  }
  
  /* Apply forge-inspired hover glow effect */
  &:hover svg {
    color: #e85c41;
    filter: drop-shadow(0 0 3px rgba(232, 92, 65, 0.4));
  }
`

export const ItemIcon = styled.div`
  margin-right: 16px;
  color: #525fc4;
  font-size: 24px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #e85c41;
    top: -5px;
    right: -5px;
    animation: ${forgeEmber} 3s infinite ease-in-out;
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const HighlightedText = styled.span`
  color: ${THEME.color.primary};
  font-weight: 500;
  position: relative;
  display: inline;
  
  /* Add subtle animation effect on hover */
  transition: all 0.3s ease;
  
  &:hover {
    color: ${props => {
      // Darken the primary color slightly on hover
      const color = THEME.color.primary;
      return color.replace('#', '#3a4d');
    }};
  }
`

export const MainDescription = styled.div`
  margin: 2rem auto 3rem;
  max-width: 950px;
  position: relative;
  line-height: 1.8;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  padding: 0;
  text-align: center;
  display: block;
  
  p {
    margin-bottom: 1.2rem;
  }
  
  /* Add subtle highlight effect */
  &:before {
    content: '';
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    height: 100px;
    background: radial-gradient(ellipse at center, rgba(82, 95, 196, 0.08) 0%, rgba(255,255,255,0) 70%);
    z-index: -1;
    opacity: 0.7;
  }
  
  p {
    margin: 0 auto 1.5rem;
    color: #333;
    font-size: 1.05rem;
    text-align: center;
    max-width: 100%;
    padding: 0 1rem;
    letter-spacing: 0.2px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    /* Highlight key phrases */
    strong {
      color: #525fc4;
      font-weight: 600;
    }
    
    ${mq('small')} {
      font-size: 1.2rem;
      padding: 0 1.5rem;
    }
    
    ${mq('medium')} {
      font-size: 1.35rem;
      max-width: 850px;
      line-height: 1.9;
    }
  }
`

export const CtaButton = styled.div`
  margin: 3.5rem auto 1.5rem;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`
