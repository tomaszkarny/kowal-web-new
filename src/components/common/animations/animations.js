import { keyframes } from '@emotion/react';

/**
 * Shared fadeIn animation for entrance effects.
 */
export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: none; }
`;
