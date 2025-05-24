const React = require('react');

/**
 * Fix for 404 flash issue - prevents "404 Page Not Found" title from appearing during initial page load
 * This works by modifying the HTML structure before it's sent to the browser
 */
exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents, pathname }) => {
  // Get current head components
  const headComponents = getHeadComponents();
  
  // Only process if pathname is undefined, empty, or specifically a 404
  const shouldProcess404 = !pathname || pathname === '' || pathname === '/' || pathname.includes('/404');
  
  if (shouldProcess404) {
    // Check if we're on a 404 page (actual 404, not just a flash)
    const isActual404 = pathname && (pathname.includes('/404') || pathname === '/404.html');
    
    // Only process titles that look like 404 errors when appropriate
    headComponents.forEach(component => {
      if (
        component.type === 'title' && 
        component.props && 
        component.props.children
      ) {
        const titleStr = component.props.children.toString().toLowerCase();
        
        // Check for any indication this is a 404 title
        if (
          titleStr.includes('404') || 
          titleStr.includes('not found') || 
          titleStr.includes('nie znaleziono') ||
          titleStr.includes('strona nie istnieje')
        ) {
          // Only replace if this isn't an actual 404 page
          if (!isActual404) {
            // Save the original title in a data attribute for debugging
            component.props['data-original'] = component.props.children;
            
            // Replace with language-appropriate title
            const isEnglish = pathname && pathname.startsWith('/en')
            component.props.children = isEnglish 
              ? 'Tadeusz Karny Artistic Blacksmith'
              : 'Kowalstwo Artystyczne - Tadeusz Karny';
          }
        }
      }
    });
  }
  
  // Enhance canonical URLs by ensuring they are properly defined for SEO
  // This is critical for proper indexing by search engines
  headComponents.forEach(component => {
    // Look for canonical link tags
    if (
      component.type === 'link' && 
      component.props && 
      component.props.rel === 'canonical'
    ) {
      // Ensure the key attribute exists to prevent duplicates
      if (!component.props.key) {
        component.props.key = 'canonical';
      }
      
      // Add additional attributes for better SEO
      component.props['data-testid'] = 'canonical-link';
    }
  });

  // Add a meta viewport tag - ensures proper mobile rendering
  // Sometimes this can be missing in SPAs causing issues
  const hasViewport = headComponents.some(
    component => component.type === 'meta' && component.props && component.props.name === 'viewport'
  );
  
  if (!hasViewport) {
    headComponents.push(
      <meta 
        name="viewport" 
        content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        key="viewport"
      />
    );
  }
  
  // Replace all head components with our modified version
  replaceHeadComponents(headComponents);
};

/**
 * Add a script to immediately hide any 404 title if it appears and include other necessary SEO/analytics scripts
 * This runs as early as possible in the browser, even before React hydration
 */
exports.onRenderBody = ({ setHeadComponents }) => {
  // Create an array of all head components we want to add
  const allHeadComponents = [
    // 1. Script to fix 404 title flash - THIS IS CRITICAL
    <script
      key="prevent-404-flash"
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Only fix 404 titles during initial load or on error pages
            function fix404Title() {
              // Only run this fix if we detect a possible 404 scenario
              var path = window.location.pathname;
              var shouldCheck = !path || path === '/' || path.includes('/404') || document.readyState === 'loading';
              
              if (!shouldCheck) return;
              
              var titleEl = document.querySelector('title');
              if (titleEl && (
                titleEl.textContent.includes('404') || 
                titleEl.textContent.toLowerCase().includes('not found') ||
                titleEl.textContent.toLowerCase().includes('nie znaleziono') ||
                titleEl.textContent.toLowerCase().includes('strona nie istnieje')
              )) {
                const isEn = window.location.pathname.startsWith('/en')
                titleEl.textContent = isEn 
                  ? 'Tadeusz Karny Artistic Blacksmith'
                  : 'Kowalstwo Artystyczne - Tadeusz Karny';
                
                // Also set it again after a short delay to handle race conditions
                setTimeout(function() {
                  if (document.querySelector('title').textContent.includes('404')) {
                    const isEn = window.location.pathname.startsWith('/en')
                    document.querySelector('title').textContent = isEn 
                      ? 'Tadeusz Karny Artistic Blacksmith'
                      : 'Kowalstwo Artystyczne - Tadeusz Karny'
                  }
                }, 50);
              }
            }
            
            // Run immediately
            fix404Title();
            
            // Also run on DOMContentLoaded and after timeout to ensure it works in all cases
            document.addEventListener('DOMContentLoaded', fix404Title);
            setTimeout(fix404Title, 100);
          })();
        `,
      }}
    />,
  
    // 2. Google site verification meta tag
    React.createElement('meta', {
      key: 'google-site-verification',
      name: 'google-site-verification',
      content: 'JKUnr_75ce6PD0-NuNVM1t-CWuSLqi_vBwMky594zTM'
    }),

    // 3. Preload hints for faster navigation
    React.createElement('link', {
      key: 'preload-about',
      rel: 'prefetch',
      href: '/about/',
      as: 'document'
    }),
    React.createElement('link', {
      key: 'preload-gallery',
      rel: 'prefetch',
      href: '/gallery/',
      as: 'document'
    }),
    React.createElement('link', {
      key: 'preload-contact',
      rel: 'prefetch',
      href: '/contact/',
      as: 'document'
    })
  ];
  
  // 4. Add Ahrefs analytics script if environment variable is defined
  if (process.env.GATSBY_AHREFS_ANALYTICS_KEY) {
    allHeadComponents.push(
      React.createElement('script', {
        key: 'ahrefs-analytics',
        src: 'https://analytics.ahrefs.com/analytics.js',
        'data-key': process.env.GATSBY_AHREFS_ANALYTICS_KEY,
        async: true
      })
    );
  }

  // Removed duplicate robots meta tag - handled by EnhancedSEO component instead
  
  // Set all head components
  setHeadComponents(allHeadComponents);
};
