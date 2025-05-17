/**
 * Gatsby browser APIs
 * We simply return the element unchanged; all i18n context is provided
 * by gatsby-plugin-react-i18next, avoiding duplicate providers.
 */
exports.wrapRootElement = ({ element }) => element;

/**
 * This function runs when the site is first loaded in the browser
 * We use this to customize behavior and suppress specific console warnings
 */
exports.onClientEntry = () => {
  console.log('Website initialized with i18next backend support');
  
  // Log navigation events (useful for debugging)  
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    window.addEventListener('popstate', () => {
      console.log('Navigation via popstate event');
    });
  }
  
  // Suppress the defaultProps warning in memo components
  // This is particularly an issue with react-photo-gallery
  if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args[0] || '';
      
      // Filter out defaultProps warnings for memo components
      if (typeof message === 'string' && 
          message.includes('defaultProps will be removed from memo components')) {
        return;
      }
      
      // Pass through all other console errors
      return originalConsoleError.apply(console, args);
    };
  }
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
