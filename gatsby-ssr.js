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
 * Add analytics and verification scripts/tags to the document head
 */
exports.onRenderBody = ({ setHeadComponents }) => {
  const headComponents = [];
  
  // Add Ahrefs analytics script if environment variable is defined
  if (process.env.GATSBY_AHREFS_ANALYTICS_KEY) {
    headComponents.push(
      React.createElement('script', {
        key: 'ahrefs-analytics',
        src: 'https://analytics.ahrefs.com/analytics.js',
        'data-key': process.env.GATSBY_AHREFS_ANALYTICS_KEY,
        async: true
      })
    );
  }
  
  // Add Google site verification meta tag
  headComponents.push(
    React.createElement('meta', {
      key: 'google-site-verification',
      name: 'google-site-verification',
      content: 'JKUnr_75ce6PD0-NuNVM1t-CWuSLqi_vBwMky594zTM'
    })
  );
  
  // Set all head components if we have any
  if (headComponents.length > 0) {
    setHeadComponents(headComponents);
  }
};
