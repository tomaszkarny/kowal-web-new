/**
 * ServiceTypes Styles
 * Cards for displaying service types (gate types, fence types, styles)
 */

import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_MEDIA,
  FORGE_SPACING,
  FORGE_RADIUS,
  FORGE_TYPOGRAPHY,
} from '../../Cities/styles/forgedIronTheme'

// Entry animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

export const TypesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ $columns }) => ($columns === 2 ? '350px' : '280px')}, 1fr)
  );
  gap: ${FORGE_SPACING.xl};
  margin-bottom: ${FORGE_SPACING.xxl};

  ${FORGE_MEDIA.tablet} {
    grid-template-columns: 1fr;
    gap: ${FORGE_SPACING.lg};
  }
`

export const TypeCard = styled.div`
  background: ${FORGE_COLORS.cardLight};
  padding: ${FORGE_SPACING.xl};
  border-radius: ${FORGE_RADIUS.card};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  text-align: center;
  transition: ${FORGE_TRANSITIONS.default};
  opacity: 0;
  animation: ${fadeInUp} 0.5s ease-out forwards;

  /* Staggered animation delays */
  &:nth-of-type(1) { animation-delay: 0.1s; }
  &:nth-of-type(2) { animation-delay: 0.2s; }
  &:nth-of-type(3) { animation-delay: 0.3s; }

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    border-top-color: ${FORGE_COLORS.ember};
    box-shadow: ${FORGE_SHADOWS.cardHover};
  }
`

export const TypeTitle = styled.h3`
  font-size: 1.5rem;
  color: ${FORGE_COLORS.ember};
  margin-bottom: ${FORGE_SPACING.md};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 600;
`

export const TypeDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ $hasFeatures }) =>
    $hasFeatures ? FORGE_SPACING.lg : '0'};
`

export const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
`

export const FeatureItem = styled.li`
  color: ${FORGE_COLORS.textSecondary};
  margin: ${FORGE_SPACING.xs} 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;

  &::before {
    content: '\u2713';
    position: absolute;
    left: 0;
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`
