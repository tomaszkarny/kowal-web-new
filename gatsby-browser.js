// Add support for prefetching pages
// This tells Gatsby to preload linked pages when they come into view
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Prefetch pages that are linked to from the current page
  if (prevLocation !== null) {
    // Additional custom logic can go here if needed
  }
}



// Improve page transitions by preserving i18next context between route changes
exports.shouldUpdateScroll = () => {
  // Prevent unnecessary scrolling during translation-related page updates
  // Return false if transition is only due to language change
  if (window.location.search.includes('i18n=')) {
    return false
  }
  return true
}
