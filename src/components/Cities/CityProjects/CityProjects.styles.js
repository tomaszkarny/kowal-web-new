import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  CityGrid,
} from '../styles'

// Alias for compatibility
const COLORS = {
  ...FORGE_COLORS,
  primary: FORGE_COLORS.ember,
  dark: FORGE_COLORS.iron,
  border: FORGE_COLORS.cardBorder,
  background: FORGE_COLORS.sectionBg,
}

export const ProjectsSection = styled.section`
  padding: 5rem 0;
  background: ${COLORS.background};
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 1rem;
`

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
`

// Use shared CityGrid with 300px minWidth for project cards
export const ProjectsGrid = styled(CityGrid)`
  /* Extends shared CityGrid */
`
ProjectsGrid.defaultProps = { $minWidth: '300px' }

export const ProjectCard = styled.article`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: ${FORGE_TRANSITIONS.default};

  &:hover {
    transform: ${FORGE_HOVER.liftXLarge};
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`

export const ProjectTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

export const ProjectDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
`

export const ProjectMeta = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.border};
  font-size: 0.9rem;
  color: ${COLORS.textSecondary};
`
