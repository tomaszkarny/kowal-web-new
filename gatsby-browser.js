/**
 * This function runs when the site is first loaded in the browser
 * We use this to customize behavior and suppress specific console warnings
 */
exports.onClientEntry = () => {
  // Debug: Log current path and language detection
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Page load - pathname:', window.location.pathname);
    console.log('Page load - detected language:', window.location.pathname.startsWith('/en') ? 'en' : 'pl');
  }

  // Debug title changes in development
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Monitor title changes for debugging
    const titleObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const titleElement = document.querySelector('title');
        if (titleElement) {
          console.log('Title changed to:', titleElement.textContent);
        }
      });
    });
    
    // Start observing title changes when DOM is ready
    if (document.querySelector('title')) {
      titleObserver.observe(document.querySelector('title'), { childList: true, subtree: true, characterData: true });
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        if (document.querySelector('title')) {
          titleObserver.observe(document.querySelector('title'), { childList: true, subtree: true, characterData: true });
        }
      });
    }
  }
  
  // Log initialization without trying to manually set up i18next
  // Let gatsby-plugin-react-i18next handle the initialization
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
      
      // Filter out specific warnings that aren't relevant
      if (typeof message === 'string') {
        // Ignore defaultProps warnings for memo components
        if (message.includes('defaultProps will be removed from memo components')) {
          return;
        }
        
        // Filter out i18next initialization errors
        if (message.includes('You will need to pass in an i18next instance by using initReactI18next')) {
          return;
        }
      }
      
      // Pass through all other console errors
      return originalConsoleError.apply(console, args);
    };
  }
};

// Handle route updates and ensure proper language switching
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Debug: Log route changes in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`Route change: ${prevLocation?.pathname || 'initial'} -> ${location.pathname}`);
    
    // Log language change
    if (prevLocation) {
      const prevLang = prevLocation.pathname.startsWith('/en') ? 'en' : 'pl';
      const currentLang = location.pathname.startsWith('/en') ? 'en' : 'pl';
      if (prevLang !== currentLang) {
        console.log(`Language changed from ${prevLang} to ${currentLang}`);
      }
    }
  }

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
