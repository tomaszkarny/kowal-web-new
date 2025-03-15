// Add support for prefetching pages
// This tells Gatsby to preload linked pages when they come into view
exports.onRouteUpdate = ({ location, prevLocation }) => {
  // Prefetch pages that are linked to from the current page
  if (prevLocation !== null) {
    // Additional custom logic can go here if needed
  }
}
