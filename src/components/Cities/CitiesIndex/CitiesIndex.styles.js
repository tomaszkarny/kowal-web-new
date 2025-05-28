import styled from '@emotion/styled'
import { Link } from 'gatsby-plugin-react-i18next'
import { THEME } from 'consts/theme'

const COLORS = {
  primary: THEME.color.primary,
  secondary: '#6c5ce7',
  dark: THEME.color.dark.replace(';', ''),
  textSecondary: THEME.color.darkGray,
  border: THEME.color.lightGray,
  success: '#00b894'
}

export const IndexSection = styled.section`
  padding: 5rem 0;
  background: #f8f9fa;
  min-height: 80vh;
`

export const IndexContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`

export const IndexHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

export const IndexTitle = styled.h1`
  font-size: 3rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`

export const IndexSubtitle = styled.p`
  font-size: 1.3rem;
  color: ${COLORS.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`

export const FeaturedSection = styled.div`
  margin-bottom: 4rem;
`

export const AllCitiesSection = styled.div`
  margin-bottom: 2rem;
`

export const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${COLORS.primary};
  margin-bottom: 2rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`

export const CitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`

export const CityCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: ${props => props.featured ? `2px solid ${COLORS.primary}` : '1px solid #e0e0e0'};
  position: relative;
  
  ${props => props.featured && `
    &::before {
      content: '⭐';
      position: absolute;
      top: 1rem;
      right: 1rem;
      font-size: 1.2rem;
    }
  `}
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`

export const CityName = styled.h3`
  font-size: 1.5rem;
  color: ${COLORS.dark};
  margin-bottom: 1rem;
  font-weight: 600;
`

export const CityInfo = styled.div`
  margin-bottom: 1.5rem;
  
  > div:first-of-type {
    color: ${COLORS.textSecondary};
    margin-bottom: 1rem;
    font-style: italic;
  }
`

export const CityStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  div {
    color: ${COLORS.textSecondary};
    font-size: 0.9rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid #f0f0f0;
    
    &:last-child {
      border-bottom: none;
    }
  }
`

export const CityLink = styled(Link)`
  display: inline-block;
  background: ${COLORS.primary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background 0.3s ease;
  
  &:hover {
    background: ${COLORS.secondary};
    text-decoration: none;
  }
`