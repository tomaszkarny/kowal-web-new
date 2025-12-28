import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_RADIUS,
  CityCard,
} from '../styles'

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.5rem, 1.8vw, 2.25rem);
  margin-bottom: 3rem;
`

export const ServiceCard = styled(CityCard)`
  padding: 2rem;
`

export const ServiceDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`

export const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const FeatureItem = styled.li`
  color: ${FORGE_COLORS.textSecondary};
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &::before {
    content: '\u2713';
    position: absolute;
    left: 0;
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`

export const CTASection = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${FORGE_COLORS.sectionBg};
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  border-top: 3px solid ${FORGE_COLORS.iron};
  margin-top: 3rem;
`

export const CTATitle = styled.h3`
  font-size: 1.8rem;
  color: ${FORGE_COLORS.iron};
  margin-bottom: 1rem;
  font-family: 'Merriweather', serif;
`

export const CTAText = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`
