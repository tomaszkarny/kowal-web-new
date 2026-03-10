import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { THEME } from 'consts/theme'
import {
  FORGE_COLORS,
  FORGE_SHADOWS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  FORGE_SPACING,
  FORGE_TYPOGRAPHY,
} from '../Cities/styles/forgedIronTheme'

export const CategorySectionWrapper = styled.section`
  max-width: 1000px;
  margin: 0 auto ${FORGE_SPACING.xxl};
  padding: 0 ${FORGE_SPACING.md};
`

export const CategorySectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${FORGE_COLORS.iron};
  text-align: center;
  margin-bottom: ${FORGE_SPACING.xl};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 600;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    font-size: 1.75rem;
  }
`

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${FORGE_SPACING.lg};

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${FORGE_SPACING.xl};
  }
`

export const CategoryCard = styled(Link)`
  display: block;
  background: ${FORGE_COLORS.cardLight};
  border: 1px solid ${FORGE_COLORS.cardBorder};
  border-top: 3px solid ${FORGE_COLORS.iron};
  border-radius: 0 0 4px 4px;
  padding: ${FORGE_SPACING.xl};
  text-align: center;
  text-decoration: none;
  transition: ${FORGE_TRANSITIONS.default};
  box-shadow: ${FORGE_SHADOWS.cardSubtle};

  &:hover {
    transform: ${FORGE_HOVER.liftMedium};
    border-top-color: ${FORGE_COLORS.ember};
    box-shadow: ${FORGE_SHADOWS.cardHover};
  }
`

export const CategoryName = styled.h3`
  font-size: 1.25rem;
  color: ${FORGE_COLORS.iron};
  margin: 0 0 ${FORGE_SPACING.sm};
  font-family: ${FORGE_TYPOGRAPHY.heading};
  font-weight: 600;
  transition: ${FORGE_TRANSITIONS.fast};

  ${CategoryCard}:hover & {
    color: ${FORGE_COLORS.ember};
  }
`

export const CategoryDescription = styled.p`
  font-size: 0.95rem;
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
  margin: 0 0 ${FORGE_SPACING.md};
`

export const CategoryCount = styled.span`
  display: inline-block;
  background: ${FORGE_COLORS.ember};
  color: ${FORGE_COLORS.white};
  padding: 0.2rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
`
