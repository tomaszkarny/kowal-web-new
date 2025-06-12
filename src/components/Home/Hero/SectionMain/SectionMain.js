import React from 'react'

import { InteractiveSpecialties } from './components/InteractiveSpecialties/InteractiveSpecialties'
import { SectionContent } from './components/SectionContent/SectionContent'
import { SectionHeader } from './components/SectionHeader/SectionHeader'
import { SectionDivider } from './components/SectionDivider/SectionDivider'

import {
  SpecializationWrapper,
  SectionConnector,
  InteractiveSpecialtiesContainer
} from './SectionMain.styles'

/**
 * SectionMain component that combines multiple sub-components:
 * - SectionHeader: The title section
 * - InteractiveSpecialties: The interactive showcases of specialties
 * - SectionDivider: A simple spacing component
 * - SectionContent: The descriptive content section
 */
export function SectionMain({ id }) {
  return (
    <SpecializationWrapper id={id}>
      {/* Header section */}
      <SectionHeader />

      {/* Interactive specialties component */}
      <InteractiveSpecialtiesContainer>
        <InteractiveSpecialties />
      </InteractiveSpecialtiesContainer>

      {/* Clear separator to ensure no overlap */}
      <SectionDivider />

      {/* Content section */}
      <SectionContent />
    </SpecializationWrapper>
  )
}
