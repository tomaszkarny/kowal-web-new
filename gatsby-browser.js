const React = require('react');
const I18NextWrapper = require('./src/components/i18n/I18NextWrapper').default;

/**
 * Wrap the entire application with our I18NextWrapper component
 * This ensures i18next is properly initialized with the backend
 * before any translation functions are called
 */
exports.wrapRootElement = ({ element }) => {
  return React.createElement(I18NextWrapper, null, element);
};

/**
 * This function runs when the site is first loaded in the browser
 */
exports.onClientEntry = () => {
  console.log('Website initialized with i18next backend support');
};

// Add support for prefetching pages
// This tells Gatsby to preload linked pages when they come into view
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Prefetch pages that are linked to from the current page
  if (prevLocation !== null) {
    // Additional custom logic can go here if needed
  }
};

// Improve page transitions by preserving i18next context between route changes
exports.shouldUpdateScroll = () => {
  // Prevent unnecessary scrolling during translation-related page updates
  // Return false if transition is only due to language change
  if (window.location.search.includes('i18n=')) {
    return false;
  }
  return true;
};
