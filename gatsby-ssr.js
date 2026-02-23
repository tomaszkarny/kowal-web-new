const React = require('react');

exports.onPreRenderHTML = ({ getHeadComponents, replaceHeadComponents }) => {
  const headComponents = getHeadComponents();

  // Enhance canonical URLs
  headComponents.forEach(component => {
    if (
      component.type === 'link' &&
      component.props &&
      component.props.rel === 'canonical'
    ) {
      if (!component.props.key) {
        component.props.key = 'canonical';
      }
      component.props['data-testid'] = 'canonical-link';
    }
  });

  // Add viewport meta tag if missing
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

  replaceHeadComponents(headComponents);
};

exports.onRenderBody = ({ setHeadComponents }) => {
  const allHeadComponents = [
    // Google site verification meta tag
    React.createElement('meta', {
      key: 'google-site-verification',
      name: 'google-site-verification',
      content: 'JKUnr_75ce6PD0-NuNVM1t-CWuSLqi_vBwMky594zTM'
    }),

    // Preload hints for faster navigation
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

  // Add Ahrefs analytics script if environment variable is defined
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

  setHeadComponents(allHeadComponents);
};
