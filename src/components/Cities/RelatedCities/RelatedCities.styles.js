import styled from '@emotion/styled'
import { Link } from 'gatsby-plugin-react-i18next'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_SHADOWS,
  FORGE_SPACING,
  CitySection,
  CityGrid,
} from '../styles'

// Compact section for related cities
export const RelatedSection = styled(CitySection)`
  padding: 3rem 0;
  border-top: 1px solid ${FORGE_COLORS.cardBorder};
`

// Use shared CityGrid with smaller gap for compact layout
export const CitiesGrid = styled(CityGrid)`
  gap: ${FORGE_SPACING.lg};
`

export const CityCard = styled(Link)`
  background: ${FORGE_COLORS.cardLight};
  border-radius: 0 0 4px 4px;
  padding: ${FORGE_SPACING.lg};
  text-decoration: none;
  color: ${FORGE_COLORS.iron};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  transition: ${FORGE_TRANSITIONS.default};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    box-shadow: ${FORGE_SHADOWS.cardHover};
    border-top-color: ${FORGE_COLORS.ember};
  }
`

export const CityName = styled.h4`
  font-size: 1.2rem;
  color: ${FORGE_COLORS.ember};
  margin-bottom: 0.5rem;
`

export const CityInfo = styled.div`
  color: ${FORGE_COLORS.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
`

export const Distance = styled.span`
  display: block;
  margin-top: 0.5rem;
  font-weight: 500;
  color: ${FORGE_COLORS.iron};
`

export const Badge = styled.span`
  display: inline-block;
  background: ${FORGE_GRADIENTS.emberGradient};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-top: 0.75rem;
  align-self: flex-start;
`
