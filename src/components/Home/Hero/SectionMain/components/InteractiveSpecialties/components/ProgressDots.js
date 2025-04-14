import React from 'react';
import { ProgressContainer, ProgressDot } from '../styles/styles.js';

export const ProgressDots = ({ 
  items, 
  activeItem, 
  handleItemChange,
  t 
}) => {
  return (
    <ProgressContainer>
      {items.map(item => (
        <ProgressDot
          key={item.id}
          active={activeItem === item.id}
          onClick={() => handleItemChange(item.id)}
          aria-label={`Select ${t(item.translationKey, item.text)}`}
        />
      ))}
    </ProgressContainer>
  );
};
