import React from 'react';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { MobileSpecialtyItem } from '../styles/mobile.styles';

/**
 * Memoized specialty item component to prevent unnecessary re-renders
 */
export const MemoizedSpecialtyItem = React.memo(({ 
  item, 
  isActive, 
  onClick, 
  onKeyDown,
  activeItemRef,
  t,
  triggerHaptic 
}) => {
  return (
    <MobileSpecialtyItem
      onClick={onClick}
      isActive={isActive}
      ref={isActive ? activeItemRef : null}
      role="option"
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      onKeyDown={onKeyDown}
    >
      <StyledIcon
        icon={item.icon}
        fixedWidth={item.fixedWidth}
        aria-hidden="true"
      />
      <span>{t(item.translationKey, item.text)}</span>
    </MobileSpecialtyItem>
  );
});

MemoizedSpecialtyItem.displayName = 'MemoizedSpecialtyItem';

/**
 * Memoized arrow button component
 */
export const MemoizedArrowButton = React.memo(({ 
  direction, 
  onClick, 
  icon, 
  ariaLabel 
}) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        padding: '0.5rem',
        cursor: 'pointer',
        fontSize: '1.5rem',
        color: '#525fc4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s',
        minWidth: '2.5rem',
        minHeight: '2.5rem',
        touchAction: 'manipulation'
      }}
      onMouseEnter={(e) => {
        e.target.style.background = 'rgba(82, 95, 196, 0.12)';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = 'none';
      }}
      onFocus={(e) => {
        e.target.style.background = 'rgba(82, 95, 196, 0.12)';
        e.target.style.outline = 'none';
      }}
      onBlur={(e) => {
        e.target.style.background = 'none';
      }}
    >
      {icon}
    </button>
  );
});

MemoizedArrowButton.displayName = 'MemoizedArrowButton';