import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_GRADIENTS,
  FORGE_RADIUS,
} from '../styles'

export const FAQItem = styled.div`
  background: ${FORGE_COLORS.white};
  margin-bottom: 1.5rem;
  border-radius: ${FORGE_RADIUS.cardWithCorner};
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(45, 45, 68, 0.08);
`

export const Question = styled.h3`
  background: ${FORGE_GRADIENTS.ironGradient};
  color: ${FORGE_COLORS.white};
  margin: 0;
  padding: 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
`

export const Answer = styled.div`
  padding: 1.5rem;
  line-height: 1.6;
  color: ${FORGE_COLORS.textSecondary};
`
