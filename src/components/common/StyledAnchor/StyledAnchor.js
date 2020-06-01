import styled from '@emotion/styled'

export const StyledAnchor = styled.a`
  color: ${({ theme, isBolded }) =>
    theme.color[isBolded ? 'darkBlue' : 'white']};
  opacity: 0.5;
  text-decoration: none;
  font-size: ${({ small }) => (small ? '12px' : '18px')};
  line-height: 27px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;

  &:hover {
    opacity: 1;
    text-decoration: underline;
    transition: all 0.3s ease-in-out;
  }
`
