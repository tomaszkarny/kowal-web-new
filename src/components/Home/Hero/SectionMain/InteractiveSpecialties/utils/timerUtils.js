/**
 * timerUtils.js
 * Utility functions to manage the progress timer and auto-cycle timer.
 */

export const startProgressTimer = (cycleDuration, updateInterval, setProgress) => {
  const totalSteps = cycleDuration / updateInterval;
  let currentStep = 0;
  return setInterval(() => {
    currentStep++;
    setProgress((currentStep / totalSteps) * 100);
  }, updateInterval);
};

export const startAutoCycleTimer = (
  cycleDuration,
  fadeDuration,
  activeItem,
  ListItemData,
  setFadeOut,
  setActiveItem,
  setProgress,
  restartCallback
) => {
  return setTimeout(() => {
    setFadeOut(true);
    setTimeout(() => {
      const currentIndex = ListItemData.findIndex(item => item.id === activeItem);
      const nextIndex = (currentIndex + 1) % ListItemData.length;
      setActiveItem(ListItemData[nextIndex].id);
      setFadeOut(false);
      setProgress(0);
      restartCallback();
    }, fadeDuration);
  }, cycleDuration);
};
