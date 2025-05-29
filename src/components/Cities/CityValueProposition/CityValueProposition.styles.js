import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  border: THEME.color.lightGray,
  background: '#f8f9fa',
  white: '#ffffff',
  success: '#28a745',
  accent: '#007bff'
}

export const Section = styled.section`
  padding: 5rem 0;
  background: ${COLORS.white};
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
  margin-bottom: 3rem;
  
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
  background: ${COLORS.background};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  }
`

export const CardIcon = styled.div`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
`

export const CardTitle = styled.h3`
  color: ${COLORS.dark};
  font-size: 1.3rem;
  margin-bottom: 1rem;
`

export const CardDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.8;
  white-space: pre-line;
  font-size: 0.95rem;
`

export const ProcessFlow = styled.div`
  background: ${COLORS.background};
  border-radius: 12px;
  padding: 3rem 2rem;
  margin-bottom: 4rem;
  
  h3 {
    margin-bottom: 2rem;
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
  background: ${COLORS.primary};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  flex-shrink: 0;
`

export const StepTitle = styled.h4`
  color: ${COLORS.dark};
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`

export const StepDescription = styled.p`
  color: ${COLORS.textSecondary};
  font-size: 0.9rem;
  margin: 0;
`

export const Arrow = styled.div`
  color: ${COLORS.primary};
  font-size: 2rem;
  
  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`

export const GuaranteeSection = styled.div`
  margin-bottom: 4rem;
  
  h3 {
    margin-bottom: 2rem;
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
  background: ${COLORS.background};
  border-radius: 8px;
  border-left: 4px solid ${COLORS.success};
`

export const GuaranteeIcon = styled.div`
  color: ${COLORS.success};
  font-size: 1.5rem;
`

export const GuaranteeText = styled.p`
  color: ${COLORS.dark};
  margin: 0;
  font-weight: 500;
`

export const ServiceRadiusInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  background: ${COLORS.background};
  border-radius: 12px;
  padding: 3rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
    text-align: center;
  }
`

export const RadiusMap = styled.div`
  color: ${COLORS.accent};
  
  svg {
    width: 80px;
    height: 80px;
  }
`

export const RadiusDetails = styled.div`
  flex: 1;
  
  h3 {
    color: ${COLORS.dark};
    margin-bottom: 1rem;
    font-size: 1.5rem;
    text-align: left;
    
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