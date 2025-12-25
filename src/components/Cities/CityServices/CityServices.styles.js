import styled from '@emotion/styled'
import { THEME } from 'consts/theme'
import { FORGE_COLORS } from '../styles'

// Alias for compatibility
const COLORS = FORGE_COLORS

export const ServicesSection = styled.section`
  padding: 5rem 0;
  background: ${COLORS.sectionBg};

  @media (max-width: ${THEME.breakpoints.desktop || 1440}px) {
    padding: 4.5rem 0;
  }
`

export const ServicesContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
`

export const ServicesHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

export const ServicesTitle = styled.h2`
  font-size: 2.5rem;
  color: ${COLORS.iron};
  margin-bottom: 1rem;
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

export const ServicesSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${COLORS.textSecondary};
  max-width: 600px;
  margin: 0 auto;
  padding: 0 0.5rem;
`

export const DeliveryInfo = styled.div`
  background: white;
  border-radius: 4px 4px 4px 20px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(45, 45, 68, 0.1);
  border-top: 3px solid ${COLORS.iron};
  transition: all 0.3s ease;

  &:hover {
    border-top-color: ${COLORS.ember};
  }

  h3 {
    margin: 0 0 1rem 0;
    color: ${COLORS.iron};
    font-size: 1.3rem;
    font-family: 'Merriweather', serif;
  }
`

export const DeliveryItem = styled.div`
  margin: 0.8rem 0;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: ${props => props.isHighlighted ? COLORS.success : COLORS.textSecondary};
  font-weight: ${props => props.isHighlighted ? '600' : '400'};
`

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 1.8vw, 2.25rem);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const ServiceCard = styled.div`
  background: ${COLORS.cardLight};
  padding: 2rem;
  border-radius: 0 0 4px 4px;
  border: 1px solid ${COLORS.cardBorder};
  border-top: 3px solid ${COLORS.iron};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-top-color: ${COLORS.ember};
    box-shadow: 0 8px 24px rgba(45, 45, 68, 0.12);
  }
`

export const ServiceTitle = styled.h3`
  color: ${COLORS.ember};
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
`

export const ServiceDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`
