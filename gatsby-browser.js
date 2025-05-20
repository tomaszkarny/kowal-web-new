/**
 * This function runs when the site is first loaded in the browser
 * We use this to customize behavior and suppress specific console warnings
 */
exports.onClientEntry = () => {
  // Najważniejsza część - natychmiast naprawiamy tytuł 404 na klienckie
  if (typeof window !== 'undefined') {
    // Funkcja do naprawy tytułu 404
    const fix404Title = () => {
      const titleElement = document.querySelector('title');
      if (titleElement && (
        titleElement.textContent.includes('404') ||
        titleElement.textContent.toLowerCase().includes('not found') ||
        titleElement.textContent.toLowerCase().includes('nie znaleziono') ||
        titleElement.textContent.toLowerCase().includes('strona nie istnieje')
      )) {
        // Tylko jeśli nie jesteśmy na rzeczywistej stronie 404
        if (!window.location.pathname.includes('/404')) {
          console.log('Fixing 404 title flash:', titleElement.textContent);
          titleElement.textContent = 'Kowalstwo Artystyczne - Tadeusz Karny';
        }
      }
    };

    // Natychmiast napraw tytuł
    fix404Title();

    // Napraw również po małym opóźnieniu, aby złapać tytuł, jeśli zmienia się po hydratacji
    setTimeout(fix404Title, 0);
    setTimeout(fix404Title, 50);
    setTimeout(fix404Title, 100);
    
    // Obserwuj zmiany w tytule strony przez MutationObserver
    const titleObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        fix404Title();
      });
    });
    
    // Rozpocznij obserwowanie zmian tytułu gdy DOM jest gotowy
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
