import styled from '@emotion/styled'

export const ArrowButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
  color: #525fc4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background 0.2s;
  min-width: 2.5rem;
  min-height: 2.5rem;

  &:hover, &:focus {
    background: rgba(82, 95, 196, 0.12);
    outline: none;
  }

  &:active {
    background: rgba(82, 95, 196, 0.18);
  }
`;
