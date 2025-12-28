import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  CityCard,
} from '../styles'

// Local override for centered card text
export const FeatureCard = styled(CityCard)`
  text-align: center;
`

export const FeatureDescription = styled.p`
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.6;
`
