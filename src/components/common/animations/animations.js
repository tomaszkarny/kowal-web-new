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

/**
 * Forge glow pulse for featured items.
 * Subtle golden glow effect inspired by forge aesthetics.
 */
export const forgeGlow = keyframes`
  0%, 100% { box-shadow: 0 4px 24px rgba(212, 168, 83, 0.15); }
  50% { box-shadow: 0 8px 40px rgba(212, 168, 83, 0.35); }
`;

/**
 * Shimmer effect for card borders and buttons.
 */
export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

/**
 * Ember pulse for forge-themed featured cards.
 * Hot orange glow that pulses like heated iron.
 */
export const emberPulse = keyframes`
  0%, 100% {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 0 20px rgba(232, 92, 65, 0.3),
      0 0 40px rgba(232, 92, 65, 0.1);
  }
  50% {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.1),
      0 0 30px rgba(232, 92, 65, 0.5),
      0 0 60px rgba(232, 92, 65, 0.2);
  }
`;
