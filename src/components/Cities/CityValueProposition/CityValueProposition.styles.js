import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
} from '../styles'

// Alias for compatibility with existing component code
const COLORS = FORGE_COLORS

export const Section = styled.section`
  padding: 5rem 0;
  background: ${COLORS.sectionBg};
`

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const Title = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.iron};
  text-align: center;
  margin-bottom: 3rem;
  font-family: 'Merriweather', serif;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, ${COLORS.ember}, ${COLORS.emberGlow});
    margin: 0.75rem auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const Card = styled.div`
  background: ${COLORS.cardLight};
  border-radius: 0 0 4px 4px;
  border: 1px solid ${COLORS.cardBorder};
  border-top: 3px solid ${COLORS.iron};
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-top-color: ${COLORS.ember};
    box-shadow: 0 8px 24px rgba(45, 45, 68, 0.12);
  }
`

export const CardIcon = styled.div`
  color: ${COLORS.ember};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`

export const CardTitle = styled.h3`
  color: ${COLORS.iron};
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-family: 'Merriweather', serif;
`

export const CardDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.8;
  white-space: pre-line;
  font-size: 0.95rem;
`

export const ProcessFlow = styled.div`
  background: ${COLORS.white};
  border-radius: 4px 4px 4px 20px;
  border-top: 3px solid ${COLORS.iron};
  padding: 3rem 2rem;
  margin-bottom: 4rem;

  h3 {
    margin-bottom: 2rem;
    color: ${COLORS.iron};
    font-family: 'Merriweather', serif;
  }
`

export const ProcessStep = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`

export const StepContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, ${COLORS.ember} 0%, #c94a33 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(232, 92, 65, 0.3);
`

export const StepTitle = styled.h4`
  color: ${COLORS.iron};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`

export const StepDescription = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`

export const Arrow = styled.div`
  color: ${COLORS.ember};
  font-size: 2rem;

  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`

export const GuaranteeSection = styled.div`
  margin-bottom: 4rem;

  h3 {
    margin-bottom: 2rem;
    color: ${COLORS.iron};
    font-family: 'Merriweather', serif;
  }
`

export const GuaranteeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

export const GuaranteeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${COLORS.white};
  border-radius: 4px;
  border-left: 4px solid ${COLORS.success};
  transition: all 0.3s ease;

  &:hover {
    border-left-color: ${COLORS.ember};
    box-shadow: 0 4px 12px rgba(45, 45, 68, 0.08);
  }
`

export const GuaranteeIcon = styled.div`
  color: ${COLORS.success};
  font-size: 1.5rem;
`

export const GuaranteeText = styled.p`
  color: ${COLORS.iron};
  margin: 0;
  font-weight: 500;
`

export const ServiceRadiusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  background: ${COLORS.white};
  border-radius: 4px 4px 4px 20px;
  border-top: 3px solid ${COLORS.iron};
  padding: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    text-align: center;
  }
`

export const RadiusMap = styled.div`
  color: ${COLORS.ember};

  svg {
    width: 80px;
    height: 80px;
  }
`

export const RadiusDetails = styled.div`
  flex: 1;

  h3 {
    color: ${COLORS.iron};
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: left;
    font-family: 'Merriweather', serif;

    @media (max-width: 768px) {
      text-align: center;
    }
  }

  p {
    color: ${COLORS.textSecondary};
    line-height: 1.6;
    margin: 0;
  }
`
