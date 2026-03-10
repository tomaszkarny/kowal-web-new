import React from 'react'

import { ScrollReveal } from 'components/common/animations/ScrollReveal'
import { InteractiveSpecialties } from './components/InteractiveSpecialties/InteractiveSpecialties'
import { SectionContent } from './components/SectionContent/SectionContent'
import { SectionHeader } from './components/SectionHeader/SectionHeader'
import { SectionDivider } from './components/SectionDivider/SectionDivider'
import { StatsCounter } from './components/StatsCounter/StatsCounter'

import {
  SpecializationWrapper,
  SectionConnector,
  InteractiveSpecialtiesContainer
} from './SectionMain.styles'

/**
 * SectionMain component that combines multiple sub-components:
 * - SectionHeader: The title section
 * - InteractiveSpecialties: The interactive showcases of specialties
 * - StatsCounter: Animated stats (years, projects, handmade)
 * - SectionDivider: A simple spacing component
 * - SectionContent: The descriptive content section (card grid)
 */
export function SectionMain({ id }) {
  return (
    <SpecializationWrapper id={id}>
      {/* Header section */}
      <ScrollReveal variant="fadeUp" delay={0}>
        <SectionHeader />
      </ScrollReveal>

      {/* Interactive specialties component */}
      <ScrollReveal variant="fadeUp" delay={0.1}>
        <InteractiveSpecialtiesContainer>
          <InteractiveSpecialties />
        </InteractiveSpecialtiesContainer>
      </ScrollReveal>

      {/* Stats counter */}
      <StatsCounter />

      {/* Clear separator to ensure no overlap */}
      <SectionDivider />

      {/* Content section - cards */}
      <SectionContent />
    </SpecializationWrapper>
  )
}
