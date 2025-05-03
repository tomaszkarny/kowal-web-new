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
 * Add Ahrefs analytics script to the document head
 * Only adds the script if the environment variable is defined
 */
exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.GATSBY_AHREFS_ANALYTICS_KEY) {
    setHeadComponents([
      React.createElement('script', {
        key: 'ahrefs-analytics',
        src: 'https://analytics.ahrefs.com/analytics.js',
        'data-key': process.env.GATSBY_AHREFS_ANALYTICS_KEY,
        async: true
      })
    ]);
  }
};
