import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Styled icon component with consistent styling based on theme
 * Replaces repetitive inline icon styles
 */
export const StyledIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.color.primary};
  margin-right: 10px;
`
