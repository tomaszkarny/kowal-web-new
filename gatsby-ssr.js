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
