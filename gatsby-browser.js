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
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Prefetch pages that are linked to from the current page
  if (prevLocation !== null) {
    // Log navigation for debugging
    console.log(`Navigation from ${prevLocation.pathname} to ${location.pathname}`);

    // Force focus to the body to prevent any lingering focus issues
    document.body.focus();
  }
};

// Improve page transitions by preserving i18next context between route changes
exports.shouldUpdateScroll = ({ routerProps: { location }, prevRouterProps }) => {
  // Prevent unnecessary scrolling during translation-related page updates
  // Return false if transition is only due to language change
  if (window.location.search.includes('i18n=')) {
    return false;
  }

  // If it's a new page navigation (not just a hash change), scroll to top
  if (prevRouterProps && location.pathname !== prevRouterProps.location.pathname) {
    window.scrollTo(0, 0);
    return false; // We've handled scrolling manually
  }

  return true; // Let Gatsby handle other scroll updates
};
