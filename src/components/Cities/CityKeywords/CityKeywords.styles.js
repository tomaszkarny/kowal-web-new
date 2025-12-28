import styled from '@emotion/styled'
import { FORGE_COLORS } from '../styles'

export const KeywordsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`

export const LocalFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  text-align: center;
`

export const FeatureItem = styled.li`
  color: ${FORGE_COLORS.textSecondary};
  margin: 0.5rem 0;

  &::before {
    content: '\u2713 ';
    color: ${FORGE_COLORS.ember};
    font-weight: bold;
  }
`
