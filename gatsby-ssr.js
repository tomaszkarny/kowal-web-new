const React = require('react');

/**
 * ⬇ Identity wrapper – relying solely on gatsby-plugin-react-i18next.
 *    Keeping this export avoids breaking Gatsby's API chain, but
 *    no longer injects a second i18n instance.
 */
exports.wrapRootElement = ({ element }) => element;

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
