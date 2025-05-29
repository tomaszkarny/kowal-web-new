import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { getCitySeoData } from 'data/citiesSeoEnhanced'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  border: THEME.color.lightGray,
  background: '#f8f9fa'
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ProjectCard = styled.article`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
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