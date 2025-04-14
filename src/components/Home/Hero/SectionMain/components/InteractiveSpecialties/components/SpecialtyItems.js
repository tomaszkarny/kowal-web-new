import React from 'react';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { SpecialtyList, SpecialtyItem } from '../styles/styles.js';

export const SpecialtyItems = ({ 
  items, 
  activeItem, 
  handleMouseEnter, 
  handleItemChange, 
  handleKeyDown,
  t 
}) => {
  return (
    <SpecialtyList>
      {items.map(item => (
        <SpecialtyItem
          key={item.id}
          onMouseEnter={() => handleMouseEnter(item.id)}
          onClick={() => handleItemChange(item.id)}
          onKeyDown={(e) => handleKeyDown(e, item.id)}
          isActive={activeItem === item.id}
          tabIndex="0"
          role="button"
          aria-pressed={activeItem === item.id}
        >
          <StyledIcon
            icon={item.icon}
            fixedWidth={item.fixedWidth}
          />
          <span>{t(item.translationKey, item.text)}</span>
        </SpecialtyItem>
      ))}
    </SpecialtyList>
  );
};
