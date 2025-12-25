import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { getCitySeoData } from 'data/citiesSeoEnhanced'
import {
  FORGE_COLORS,
  FORGE_TRANSITIONS,
  FORGE_HOVER,
  CityGrid
} from '../styles'

// Alias for compatibility
const COLORS = {
  ...FORGE_COLORS,
  primary: FORGE_COLORS.ember,
  dark: FORGE_COLORS.iron,
  border: FORGE_COLORS.cardBorder,
  background: FORGE_COLORS.sectionBg,
}

const ProjectsSection = styled.section`
  padding: 5rem 0;
  background: ${COLORS.background};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.dark};
  text-align: center;
  margin-bottom: 1rem;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.textSecondary};
  text-align: center;
  margin-bottom: 3rem;
`

// Use shared CityGrid with 300px minWidth for project cards
const ProjectsGrid = styled(CityGrid)`
  /* Extends shared CityGrid */
`
ProjectsGrid.defaultProps = { $minWidth: '300px' }

const ProjectCard = styled.article`
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

const ProjectTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
`

const ProjectDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
`

const ProjectMeta = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${COLORS.border};
  font-size: 0.9rem;
  color: ${COLORS.textSecondary};
`

export function CityProjects({ city, language, templateData }) {
  const { t } = useTranslation()
  const seoData = getCitySeoData(city.id)
  
  if (!seoData || !seoData.localProjects) {
    return null
  }
  
  const projects = seoData.localProjects[language] || seoData.localProjects.pl
  
  const title = language === 'pl' 
    ? `Nasze realizacje w ${city.name[language]}`
    : `Our projects in ${city.name[language]}`
    
  const subtitle = language === 'pl'
    ? 'Zobacz przykładowe prace wykonane dla klientów z Twojego miasta'
    : 'See example works completed for clients from your city'
  
  return (
    <ProjectsSection>
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
        
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard key={index}>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectMeta>
                {language === 'pl' ? 'Lokalizacja: ' : 'Location: '}
                {city.name[language]}
              </ProjectMeta>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  )
}