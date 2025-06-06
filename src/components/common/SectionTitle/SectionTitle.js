import styled from '@emotion/styled'
import isPropValid from '@emotion/is-prop-valid'
import { mq } from 'utils/mediaQueries'

export const SectionTitle = styled('h1', {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'main' && prop !== 'isUnderLined' && prop !== 'isAligned'
})`
  text-align: ${({ isAligned }) => (isAligned ? 'left' : 'center')};
  box-sizing: inherit;
  font-weight: 700;
  margin: 0 0 25px;
  color: ${({ theme }) => theme?.color?.mirage || '#333333'};
  letter-spacing: -0.75px;
  line-height: 1.2;
  font-size: ${({ main }) => (main ? '26px' : '36px')};
  font-family: 'Merriweather';
  border-bottom: ${({ isUnderLined, theme }) =>
    isUnderLined ? `1px solid ${theme?.color?.primary || '#000000'}` : ''};
  border-width: thick;
  width: ${({ isUnderLined }) => (isUnderLined ? 'fit-content' : '')};
  font-size: ${({ isUnderLined }) => (isUnderLined ? 'fit-content' : '')};

  ${mq('tablet')} {
    font-size: ${({ main }) => (main ? '36px' : '56px')};
  }
`
