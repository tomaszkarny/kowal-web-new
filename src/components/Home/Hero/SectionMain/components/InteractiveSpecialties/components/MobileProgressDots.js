import React from 'react';
import { MobileProgressContainer, MobileProgressDot } from '../styles/mobile.styles';

export const MobileProgressDots = ({ 
  items, 
  activeItem, 
  handleItemChange,
  t 
}) => {
  return (
    <MobileProgressContainer>
      {items.map(item => (
        <MobileProgressDot
          key={item.id}
          active={activeItem === item.id}
          onClick={() => handleItemChange(item.id)}
          aria-label={`Select ${t(item.translationKey, item.text)}`}
        />
      ))}
    </MobileProgressContainer>
  );
};
