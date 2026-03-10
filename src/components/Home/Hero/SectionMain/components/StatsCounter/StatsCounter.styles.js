import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'
import { THEME } from 'consts/theme'

export const StatsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 3rem auto;
  padding: 2.5rem 1.5rem;
  min-height: 160px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transform: ${({ isVisible }) => (isVisible ? 'none' : 'translateY(20px)')};
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;

  ${mq('tablet')} {
    flex-direction: row;
    justify-content: center;
    gap: 3rem;
    padding: 3rem 2rem;
  }

  ${mq('medium')} {
    gap: 4rem;
  }
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1rem;
`

export const StatIcon = styled.div`
  font-size: 1.5rem;
  color: ${THEME.color.ember};
  margin-bottom: 0.75rem;
  opacity: 0.85;
`

export const StatNumber = styled.span`
  font-family: 'Merriweather', serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${THEME.color.ember};
  line-height: 1.2;

  ${mq('tablet')} {
    font-size: 3rem;
  }
`

export const StatSuffix = styled.span`
  font-family: 'Merriweather', serif;
  font-size: inherit;
  font-weight: 700;
  color: ${THEME.color.ember};
`

export const StatLabel = styled.span`
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
  letter-spacing: 0.3px;
  text-transform: uppercase;

  ${mq('tablet')} {
    font-size: 0.95rem;
  }
`
