import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    // Only load in production
    if (process.env.NODE_ENV !== 'production') return;

    // Web Vitals tracking
    if ('web-vital' in window) return;

    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      const sendToAnalytics = ({ name, delta, id }) => {
        // Send to Google Analytics if available
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta),
            non_interaction: true,
          });
        }
        
        // Log to console in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`Web Vital: ${name}`, delta);
        }
      };

      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }, []);

  return null;
};

export default WebVitals;