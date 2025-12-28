import styled from '@emotion/styled'
import { THEME } from 'consts/theme'

export const ArrowButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${THEME.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  min-width: 2.5rem;
  min-height: 2.5rem;

  &:hover, &:focus {
    background: rgba(232, 92, 65, 0.12);
    outline: none;
  }

  &:active {
    background: rgba(232, 92, 65, 0.18);
  }
`;
