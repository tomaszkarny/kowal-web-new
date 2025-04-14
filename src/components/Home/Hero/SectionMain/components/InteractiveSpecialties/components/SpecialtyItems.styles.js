import styled from '@emotion/styled';

export const SpecialtyItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${props => props.active ? 'rgba(195, 160, 70, 0.1)' : 'transparent'};
  border-left: ${props => props.active ? '3px solid #c3a046' : '3px solid transparent'};
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(195, 160, 70, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
  }
`;

export const SpecialtyIcon = styled.div`
  margin-right: 1rem;
  color: ${props => props.active ? '#c3a046' : '#666'};
`;

export const SpecialtyLabel = styled.span`
  font-weight: ${props => props.active ? '600' : '400'};
  color: ${props => props.active ? '#333' : '#666'};
`;
