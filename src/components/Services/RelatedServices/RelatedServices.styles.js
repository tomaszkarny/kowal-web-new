import styled from '@emotion/styled'
import { Link } from 'gatsby'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_SPACING,
  FORGE_RADIUS,
  FORGE_TYPOGRAPHY,
  CitySection,
} from '../../Cities/styles'

export const RelatedSection = styled(CitySection)`
  padding: ${FORGE_SPACING.xxl} ${FORGE_SPACING.md};
  text-align: center;
`

export const CardContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${FORGE_SPACING.lg};
  background: ${FORGE_COLORS.white};
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  box-shadow: ${FORGE_SHADOWS.cardSubtle};
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    transform: ${FORGE_HOVER.liftSmall};
    border-top-color: ${FORGE_COLORS.ember};
    box-shadow: ${FORGE_SHADOWS.cardHover};
  }
`

export const CardTitle = styled.h3`
  margin-bottom: ${FORGE_SPACING.xs};
  color: ${FORGE_COLORS.iron};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-size: 1.3rem;
  font-weight: 600;
`

export const CardDescription = styled.p`
  margin-bottom: ${FORGE_SPACING.md};
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
  font-size: 0.95rem;
`

export const CTALink = styled(Link)`
  display: inline-block;
  padding: 14px 28px;
  background: ${FORGE_GRADIENTS.emberGradient};
  color: ${FORGE_COLORS.white};
  text-decoration: none;
  border-radius: ${FORGE_RADIUS.button};
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: ${FORGE_SHADOWS.emberButton};
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    background: linear-gradient(90deg, #c94a33, #e85c41);
    transform: ${FORGE_HOVER.liftSmall};
    box-shadow: 0 4px 12px rgba(232, 92, 65, 0.4);
  }
`
