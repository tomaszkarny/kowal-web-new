import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  success: '#00b894'
}

export const ServicesSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;

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
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  
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
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${COLORS.primary};
  
  h3 {
    margin: 0 0 1rem 0;
    color: ${COLORS.dark};
    font-size: 1.3rem;
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
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`

export const ServiceTitle = styled.h3`
  color: ${COLORS.primary};
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
`

export const ServiceDescription = styled.p`
  color: ${COLORS.textSecondary};
  line-height: 1.6;
  font-size: 1rem;
`
