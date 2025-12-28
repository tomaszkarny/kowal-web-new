import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_RADIUS,
} from '../styles'

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`

export const InfoItem = styled.div`
  margin: 1rem 0;
  line-height: 1.6;

  strong {
    color: ${FORGE_COLORS.iron};
  }

  a {
    color: ${FORGE_COLORS.ember};
    text-decoration: none;
    border-bottom: 1px dotted ${FORGE_COLORS.ember};
  }
`

export const RatingSection = styled.div`
  background: ${FORGE_COLORS.success}10;
  border: 1px solid ${FORGE_COLORS.success}30;
  padding: 1.5rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-bottom: 1.5rem;
  text-align: center;
`

export const Stars = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

  span {
    color: #ffd700;
    font-size: 1.5rem;
  }
`

export const BusinessHours = styled.div`
  background: ${FORGE_COLORS.white};
  padding: 1.5rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-top: 1.5rem;
  border: 1px solid ${FORGE_COLORS.cardBorder};
`

export const HoursTitle = styled.h4`
  color: ${FORGE_COLORS.iron};
  margin-bottom: 1rem;
  font-size: 1.1rem;
`

export const HoursGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  font-size: 0.95rem;

  strong {
    color: ${FORGE_COLORS.iron};
  }
`

export const EmergencyInfo = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 1rem;
  border-radius: ${FORGE_RADIUS.tag};
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    fill: ${FORGE_COLORS.ember};
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    color: ${FORGE_COLORS.iron};
  }
`
