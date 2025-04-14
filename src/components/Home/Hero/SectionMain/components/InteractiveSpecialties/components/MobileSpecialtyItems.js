import React, { useRef, useEffect } from 'react';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { 
  MobileSpecialtyList, 
  MobileSpecialtyItem,
  SwipeableArea
} from '../styles/mobile.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ArrowButton } from './MobileSpecialtyItems.styles';

export const MobileSpecialtyItems = ({ 
  items, 
  activeItem, 
  handleItemChange,
  t 
}) => {
  const listRef = useRef(null);
  const activeItemRef = useRef(null);

  // Arrow navigation handlers
  const goPrev = () => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx > 0) handleItemChange(items[idx - 1].id);
    else handleItemChange(items[items.length - 1].id); // wrap
  };
  const goNext = () => {
    const idx = items.findIndex(item => item.id === activeItem);
    if (idx < items.length - 1) handleItemChange(items[idx + 1].id);
    else handleItemChange(items[0].id); // wrap
  };


  useEffect(() => {
    if (activeItemRef.current && listRef.current) {
      const container = listRef.current;
      const activeElement = activeItemRef.current;
      
      // Calculate position to center the active item
      const scrollLeft = activeElement.offsetLeft - (container.clientWidth / 2) + (activeElement.clientWidth / 2);
      
      // Smooth scroll to the position
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeItem]);

  // Handle touch events for better mobile experience
  const handleTouchStart = (e) => {
    // Store the initial touch position
    listRef.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e, id) => {
    if (!listRef.current.touchStartX) return;
    
    // Get the final touch position
    const touchEndX = e.changedTouches[0].clientX;
    const touchStartX = listRef.current.touchStartX;
    
    // Calculate the difference
    const diff = touchEndX - touchStartX;
    
    // If it's a tap (minimal movement), treat it as a click
    if (Math.abs(diff) < 5) {
      handleItemChange(id);
    }
    
    // Reset the touch start position
    listRef.current.touchStartX = null;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
      <ArrowButton
        aria-label="Previous specialty"
        onClick={goPrev}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </ArrowButton>
      <SwipeableArea>
        <MobileSpecialtyList ref={listRef}>
          {items.map(item => (
            <MobileSpecialtyItem
              key={item.id}
              onClick={() => handleItemChange(item.id)}
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, item.id)}
              isActive={activeItem === item.id}
              ref={activeItem === item.id ? activeItemRef : null}
              role="button"
              aria-pressed={activeItem === item.id}
            >
              <StyledIcon
                icon={item.icon}
                fixedWidth={item.fixedWidth}
              />
              <span>{t(item.translationKey, item.text)}</span>
            </MobileSpecialtyItem>
          ))}
        </MobileSpecialtyList>
      </SwipeableArea>
      <ArrowButton
        aria-label="Next specialty"
        onClick={goNext}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ArrowButton>
    </div>
  );
};
