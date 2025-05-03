import { keyframes } from '@emotion/react';

/**
 * Shared fadeIn animation for entrance effects.
 */
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: none; }
`;

/**
 * FadeInScale animation for buttons and cards.
 */
export const fadeInScale = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

/**
 * Subtle slide up animation for sequential items.
 */
export const slideUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/**
 * Spring effect for active state.
 * Simplified to avoid issues with complex animations.
 */
export const springScale = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.07); }
  100% { transform: scale(1.05); }
`;
