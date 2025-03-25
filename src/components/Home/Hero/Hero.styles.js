import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

import { mq } from 'utils/mediaQueries'

// Subtle animation for brand-inspired hover effects
const forgeGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(82, 95, 196, 0.2); }
  50% { box-shadow: 0 0 15px rgba(82, 95, 196, 0.5); }
  100% { box-shadow: 0 0 5px rgba(82, 95, 196, 0.2); }
`

export const Title = styled.h1`
  text-align: center;
  box-sizing: inherit;
  font-weight: 800;
  margin: 0 0 30px;
  color: #1a1a1a;
  letter-spacing: 0.5px;
  line-height: 1.1;
  font-size: 42px;
  font-family: 'Merriweather';
  text-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  
  ${mq('medium')} {
    font-size: 48px;
  }
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 1.6;
  color: #${({ theme }) => theme.color.bluewood};
  font-size: 1.125rem;
  text-align: center;
  box-sizing: inherit;
  margin: 0 0 35px;
  padding: 0;
  max-width: 600px;
`

export const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  ${mq('medium')} {
    flex-direction: row;
    min-height: 650px;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 2rem;
  justify-content: center;
  flex: 1;
  align-items: center;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(2px);
  
  ${mq('medium')} {
    padding: 4rem;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.95) 0%,
      rgba(255, 255, 255, 0.85) 80%,
      rgba(255, 255, 255, 0.5) 100%
    );
    box-shadow: inset 0 0 60px rgba(82, 95, 196, 0.05);
  }
`

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to right,
    rgba(82, 95, 196, 0.7) 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
`

export const ButtonStyles = {
  primary: `
    background: #3a3a3a;
    color: #fff;
    border: 2px solid #3a3a3a;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(82, 95, 196, 0.3), transparent);
      transition: all 0.5s ease;
    }
    
    &:hover {
      background: #292929;
      border-color: #292929;
      animation: ${forgeGlow} 2s infinite;
      
      &:before {
        left: 100%;
      }
    }
  `,
  secondary: `
    background: transparent;
    color: #3a3a3a;
    border: 2px solid #3a3a3a;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(58, 58, 58, 0.1);
      transform: translateY(-2px);
    }
  `
}
