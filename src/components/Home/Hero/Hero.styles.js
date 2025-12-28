import styled from '@emotion/styled'
import { keyframes, css } from '@emotion/react'

import { mq } from 'utils/mediaQueries'
import { FORGE_COLORS, FORGE_SHADOWS, FORGE_GRADIENTS } from '../../Cities/styles'

// Subtle animations for brand-inspired hover effects (now ember-colored)
// Named forgeEmberGlow to avoid collision with forgeGlow in animations.js
const forgeEmberGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(232, 92, 65, 0.2); }
  50% { box-shadow: 0 0 15px rgba(232, 92, 65, 0.5); }
  100% { box-shadow: 0 0 5px rgba(232, 92, 65, 0.2); }
`

const forgeSpark = keyframes`
  0% { transform: translateX(-100%) scale(0.5); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%) scale(1); opacity: 0; }
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
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100px;
    height: 4px;
    background: ${FORGE_GRADIENTS.emberGradient};
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 2px;
    box-shadow: 0 0 15px rgba(232, 92, 65, 0.3);
  }

  ${mq('medium')} {
    font-size: 48px;
  }
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 1.8;
  color: #${({ theme }) => theme.color.bluewood};
  font-size: 1.125rem;
  text-align: center;
  box-sizing: inherit;
  margin: 0 auto 35px;
  padding: 0;
  max-width: 600px;
  opacity: 0.9;
`

export const HeroWrapper = styled.div`
  width: 100%;
  height: 100vh; // Full viewport height for impact
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: none;
  box-sizing: border-box;
  background: #000;

  /* Ensure proper height on smaller screens */
  ${mq('small')} {
    min-height: 100vh;
  }

  ${mq('medium')} {
    flex-direction: row;
    min-height: 80vh;
    max-height: 800px;
    position: relative;
    /* Creates an overlapping effect where image container naturally flows over content */
    & > div:last-child {
      margin-left: -10%;
      flex: 1.2;
    }
  }
`

export const ImageContainer = styled.div`
  position: relative;
  flex: 1;
  overflow: visible;
  z-index: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 50vh;
  min-height: 260px;

  ${mq('small')} {
    height: 85vh;
    min-height: 380px;
    max-height: none;
  }

  ${mq('tablet')} {
    height: 60vh;
    min-height: 320px;
    max-height: 500px;
  }

  ${mq('medium')} {
    height: 100%;
    min-height: unset;
    max-height: unset;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 0.5rem;
  justify-content: center;
  flex: 1;
  align-items: center; // Center-aligned content
  text-align: center;
  position: relative;
  z-index: 2;
  /* Mobile gradient - more opaque since content is stacked */
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 255, 255, 0.95) 50%,
    rgba(255, 255, 255, 0.92) 100%
  );
  backdrop-filter: blur(5px);

  ${mq('medium')} {
    padding: 5rem;
    padding-right: 10rem; /* Extended padding for content to blend with image */
    width: 55%;
    max-width: none;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.98) 0%,
      rgba(255, 255, 255, 0.95) 30%,
      rgba(255, 255, 255, 0.6) 70%,
      rgba(255, 255, 255, 0) 100%
    );
    box-shadow: none;
    /* Ensures a seamless blend by extending past its container */
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%);
  }
`

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Mobile overlay gradient - vertical direction with ember tint */
  background: linear-gradient(
    to bottom,
    rgba(232, 92, 65, 0.25) 0%,
    rgba(0, 0, 0, 0.5) 100%
  );
  z-index: 1;

  ${mq('medium')} {
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.05) 10%,
      rgba(232, 92, 65, 0.05) 40%,
      rgba(0, 0, 0, 0.2) 100%
    );
    /* Creates subtle texture for better visual integration */
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E");
      opacity: 0.3;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      transparent 60%,
      rgba(0, 0, 0, 0.05) 100%
    );
  }
`

export const ButtonStyles = {
  primary: css`
    background: ${FORGE_GRADIENTS.emberGradient};
    color: #fff;
    border: 2px solid ${FORGE_COLORS.ember};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    padding: 12px 32px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;
    box-shadow: ${FORGE_SHADOWS.emberButton};

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.5s ease;
    }

    &:hover {
      background: linear-gradient(90deg, #c94a33, ${FORGE_COLORS.ember});
      border-color: #c94a33;
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(232, 92, 65, 0.4);
      animation: ${forgeEmberGlow} 2s infinite;

      &:before {
        left: 100%;
        animation: ${forgeSpark} 1s forwards;
      }
    }
  `,
  secondary: css`
    background: transparent;
    color: #3a3a3a;
    border: 2px solid #3a3a3a;
    transition: all 0.3s ease;
    padding: 12px 32px;
    border-radius: 4px;
    font-weight: 600;
    letter-spacing: 0.5px;

    &:hover {
      background: rgba(232, 92, 65, 0.05);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(232, 92, 65, 0.15);
      color: ${FORGE_COLORS.ember};
      border-color: ${FORGE_COLORS.ember};
    }
  `
}
