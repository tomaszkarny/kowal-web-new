/**
 * Utility functions for handling navigation in InteractiveSpecialties component
 */

export const handleKeyNavigation = (e, id, activeItem, ListItemData, handleItemChange) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleItemChange(id);
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    e.preventDefault();
    const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
    const nextIndex = (currentIndex + 1) % ListItemData.length;
    handleItemChange(ListItemData[nextIndex].id);
  } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    e.preventDefault();
    const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
    const prevIndex = (currentIndex - 1 + ListItemData.length) % ListItemData.length;
    handleItemChange(ListItemData[prevIndex].id);
  }
};
