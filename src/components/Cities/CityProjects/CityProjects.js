import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { getCitySeoData } from 'data/citiesSeoEnhanced'
import {
  ProjectsSection,
  Container,
  Title,
  Subtitle,
  ProjectsGrid,
  ProjectCard,
  ProjectTitle,
  ProjectDescription,
  ProjectMeta,
} from './CityProjects.styles'

export function CityProjects({ city, language, templateData }) {
  const { t } = useTranslation('cities')
  const seoData = getCitySeoData(city.id)

  if (!seoData || !seoData.localProjects) {
    return null
  }

  const projects = seoData.localProjects[language] || seoData.localProjects.pl

  const title = t('cityPage.projects.titleTemplate', { city: city.name[language] })
  const subtitle = t('cityPage.projects.subtitle')

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
                {t('cityPage.projects.locationLabel')}
                {city.name[language]}
              </ProjectMeta>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </ProjectsSection>
  )
}
