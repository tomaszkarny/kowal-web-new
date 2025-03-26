import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Styled icon component with consistent styling based on theme
 * Replaces repetitive inline icon styles
 */
export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ color, theme }) => color || theme.color.primary || '#525fc4'};
  margin-right: ${({ marginRight }) => marginRight || '12px'};
  font-size: ${({ size }) => size || '1.2em'};
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease, color 0.3s ease;
  
  ${({ featured }) => featured && `
    background: #f8f9ff;
    padding: 12px;
    width: 24px !important;
    height: 24px !important;
    border-radius: 50%;
    box-shadow: 0 3px 10px rgba(82, 95, 196, 0.15);
  `}
  
  ${({ isButton }) => isButton && `
    cursor: pointer;
    
    &:hover {
      transform: scale(1.1);
      color: #4450a9;
    }
  `}
`
