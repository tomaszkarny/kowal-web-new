import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'
import { THEME } from 'consts/theme'

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;
  max-width: 950px;

  ${mq('tablet')} {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`

export const Card = styled.div`
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(232, 92, 65, 0.1);
    border-color: rgba(232, 92, 65, 0.15);
  }

  ${mq('tablet')} {
    padding: 2.5rem 2rem;
  }
`

export const CardIcon = styled.div`
  font-size: 1.8rem;
  color: ${THEME.color.ember};
  margin-bottom: 1rem;
  opacity: 0.9;
`

export const CardTitle = styled.h3`
  font-family: 'Merriweather', serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 0.75rem;
  line-height: 1.4;

  ${mq('tablet')} {
    font-size: 1.2rem;
  }
`

export const CardText = styled.p`
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin: 0;

  ${mq('medium')} {
    font-size: 1.05rem;
    line-height: 1.8;
  }
`
