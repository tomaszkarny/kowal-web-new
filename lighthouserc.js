/**
 * Lighthouse CI configuration for Kowal-web-new
 * This file configures Lighthouse CI to run performance, accessibility, best practices, and SEO audits
 */
module.exports = {
  ci: {
    collect: {
      /* Setup for multiple configurations */
      /* Note: When running via CLI, you can override these settings using: */
      /* npx lhci autorun --collect.preset=mobile */
      /* or */
      /* npm run lighthouse:mobile */
      // The production URL - replace with the actual production URL once deployed
      url: ['https://kowalstwo-karny.pl'],
      // Additional important pages to test
      // url: [
      //   'https://kowalstwo-karny.pl',
      //   'https://kowalstwo-karny.pl/about',
      //   'https://kowalstwo-karny.pl/gallery',
      //   'https://kowalstwo-karny.pl/contact',
      // ],
      // Uncomment to test against a local development server
      // url: ['http://localhost:8000'],
      numberOfRuns: 3,
      settings: {
        // Desktop specific settings
        preset: 'desktop',
        // Chrome flags to simulate desktop environment
        chromeFlags: '--headless --disable-gpu --no-sandbox',
        // Use desktop form factor
        formFactor: 'desktop',
        // Set desktop screen size
        screenEmulation: {
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          mobile: false,
          disabled: false,
        },
        // Skip some irrelevant audits
        skipAudits: ['uses-http2', 'maskable-icon'],
        // Throttling settings for more reliable results
        throttling: {
          cpuSlowdownMultiplier: 1,
          rttMs: 40,
          throughputKbps: 10240,
        },
      },
    },
    upload: {
      // Upload reports to temporary storage by default
      target: 'temporary-public-storage',
      // Use GitHub token from environment variables if available
      githubToken: process.env.LHCI_GITHUB_APP_TOKEN,
      githubStatusContextSuffix: 'Lighthouse CI',
      // Alternative options for upload targets:
      // target: 'filesystem',
      // outputDir: './.lighthouseci/reports', // Local directory to store reports
      // target: 'lhci', // For using LHCI server
      // serverBaseUrl: 'https://your-lhci-server.example.com/',
    },
    
    /* Configuration for mobile-specific testing */
    /* To use this configuration, run: npm run lighthouse:mobile */
    settings: {
      // Presets can be overridden via CLI: --collect.preset=mobile
      // These settings will be applied when using mobile preset
      mobile: {
        // Mobile Chrome flags
        chromeFlags: '--headless --disable-gpu --no-sandbox',
        // Use mobile form factor
        formFactor: 'mobile',
        // Set mobile screen size (Pixel 5 dimensions)
        screenEmulation: {
          width: 393,
          height: 851,
          deviceScaleFactor: 2.75,
          mobile: true,
          disabled: false,
        },
        // Mobile throttling settings (slow 4G)
        throttling: {
          cpuSlowdownMultiplier: 4,
          rttMs: 150,
          throughputKbps: 1638,
        },
      },
    },
    assert: {
      // You can use different assertions for desktop vs. mobile by setting the preset parameter
      // when running the command, e.g.: npx lhci autorun --preset=desktop
      // The assertions below are the default if no preset is specified
      assertions: {
        // Category score thresholds
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        
        // Core Web Vitals assertions
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],  // 2 seconds
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }], // 2.5 seconds
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],   // 0.1 threshold
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],       // 300ms
        'interactive': ['warn', { maxNumericValue: 3500 }],              // Time to Interactive < 3.5s
        'max-potential-fid': ['warn', { maxNumericValue: 100 }],         // Max Potential FID < 100ms
        
        // Performance optimizations
        'render-blocking-resources': ['warn', { maxLength: 0 }],          // No render blocking resources
        'unminified-css': ['error', { maxLength: 0 }],                   // All CSS should be minified
        'unminified-javascript': ['error', { maxLength: 0 }],             // All JS should be minified
        'unused-javascript': ['warn', { maxLength: 1 }],                  // Limit unused JS
        'uses-responsive-images': ['warn', { minScore: 0.9 }],           // Images should be responsive
        'uses-webp-images': ['warn', { minScore: 0.9 }],                 // Use WebP where possible
        
        // SEO specific assertions
        'meta-description': ['error', { minScore: 1 }],                  // Must have meta description
        'document-title': ['error', { minScore: 1 }],                    // Must have document title
        'html-has-lang': ['error', { minScore: 1 }],                     // Must specify lang attribute
        'hreflang': ['warn', { minScore: 1 }],                           // Should use hreflang
        'canonical': ['warn', { minScore: 1 }],                           // Should have canonical URLs
        'link-text': ['warn', { minScore: 0.9 }],                        // Link text should be descriptive
        'crawlable-anchors': ['error', { minScore: 1 }],                 // Links should be crawlable
        'structured-data': ['warn', { minScore: 0.9 }],                   // Should use structured data
        
        // A11Y assertions
        'aria-allowed-attr': ['error', { minScore: 1 }],                 // No invalid ARIA attributes
        'aria-required-attr': ['error', { minScore: 1 }],                // Required ARIA attributes
        'button-name': ['error', { minScore: 1 }],                       // Buttons must have accessible names
        'color-contrast': ['warn', { minScore: 0.9 }],                   // Text should have sufficient contrast
        'image-alt': ['error', { minScore: 1 }],                         // Images must have alt text
      },
      // Assertions specific to desktop (will be applied when using --preset=desktop)
      'preset:desktop': {
        'first-contentful-paint': ['warn', { maxNumericValue: 1500 }],   // 1.5 seconds (faster on desktop)
        'largest-contentful-paint': ['warn', { maxNumericValue: 2000 }],  // 2 seconds (faster on desktop)
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],    // Same threshold
        'total-blocking-time': ['warn', { maxNumericValue: 200 }],        // 200ms (stricter on desktop)
      },
      // Assertions specific to mobile (will be applied when using --preset=mobile)
      'preset:mobile': {
        'first-contentful-paint': ['warn', { maxNumericValue: 2500 }],   // 2.5 seconds (slower on mobile)
        'largest-contentful-paint': ['warn', { maxNumericValue: 3000 }],  // 3 seconds (slower on mobile)
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],    // Same threshold
        'total-blocking-time': ['warn', { maxNumericValue: 500 }],        // 500ms (more lenient on mobile)
        'uses-responsive-images': ['error', { minScore: 1 }],            // Images MUST be responsive on mobile
        'font-size': ['warn', { minScore: 0.9 }],                        // Font size should be legible on mobile
        'tap-targets': ['error', { minScore: 0.9 }],                     // Tap targets must be properly sized
      },
    },
  },
};
