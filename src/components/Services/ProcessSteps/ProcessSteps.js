/**
 * ProcessSteps Component
 * Step-by-step process display with numbered circles and connecting line
 */

import React from 'react'
import {
  CitySection,
  CityContainer,
  CityTitle,
} from '../../Cities/styles/sharedStyles'
import { FORGE_COLORS } from '../../Cities/styles/forgedIronTheme'
import {
  StepsContainer,
  Step,
  StepNumber,
  StepContent,
  StepTitle,
  StepDescription,
} from './ProcessSteps.styles'

/**
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {Array<{number: number, title: string, description: string}>} props.steps - Process steps
 */
export function ProcessSteps({ title, steps }) {
  return (
    <CitySection $bg={FORGE_COLORS.sectionBg}>
      <CityContainer>
        <CityTitle>{title}</CityTitle>
        <StepsContainer>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepNumber>{step.number || index + 1}</StepNumber>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepContent>
            </Step>
          ))}
        </StepsContainer>
      </CityContainer>
    </CitySection>
  )
}
