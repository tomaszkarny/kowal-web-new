# Lighthouse CI Integration

This document provides information about Lighthouse CI setup for the Kowalstwo Karny website project. Lighthouse CI is used to measure, monitor, and improve website performance, accessibility, SEO, and best practices.

## Setup Overview

- **Tool**: [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- **Version**: 0.14.0 
- **Configuration**: `lighthouserc.js` in project root

## Performance Budgets and Thresholds

We've established the following performance thresholds:

### Core Web Vitals

| Metric | Desktop Target | Mobile Target | 
|--------|---------------|---------------|
| Performance Score | > 80 | > 80 |
| SEO Score | > 90 | > 90 |
| Accessibility Score | > 90 | > 90 |
| Best Practices Score | > 90 | > 90 |
| First Contentful Paint (FCP) | < 1.5s | < 2.5s |
| Largest Contentful Paint (LCP) | < 2.0s | < 3.0s | 
| Cumulative Layout Shift (CLS) | < 0.1 | < 0.1 |
| Total Blocking Time (TBT) | < 200ms | < 500ms |
| Time to Interactive (TTI) | < 3.5s | < 5.0s |

### SEO Requirements

- All pages must have unique meta descriptions
- All pages must have unique and descriptive titles
- HTML must specify language attribute
- Canonical URLs must be implemented
- Hreflang tags must be present for multilingual content
- Structured data must be implemented and valid

## Running Lighthouse CI Locally

We've added several npm scripts to simplify running Lighthouse CI:

```bash
# Run Lighthouse CI with default settings
npm run lighthouse

# Run Lighthouse CI with desktop configuration
npm run lighthouse:desktop

# Run Lighthouse CI with mobile configuration
npm run lighthouse:mobile
```

For more detailed control, you can run the Lighthouse CI CLI directly:

```bash
# Run with custom options
npx lhci autorun --collect.preset=desktop --collect.url=https://kowalstwo-karny.pl/gallery

# Run against local development server
npx lhci autorun --collect.url=http://localhost:8000

# Run with custom number of runs for more reliable results
npx lhci autorun --collect.numberOfRuns=5
```

## Report Location

Lighthouse CI reports are stored in two locations:

1. Temporary public storage (default) - URL will be provided in console output
2. Local filesystem (when configured) - `.lighthouseci/reports/`

## CI/CD Integration

The following CI/CD steps are implemented:

1. Run Lighthouse CI on every pull request against staging environment
2. Run Lighthouse CI after every production deployment
3. Fail build if error-level assertions fail (critical SEO issues, accessibility issues)
4. Warn about performance issues that don't meet targets

### GitHub Actions Setup

Lighthouse CI is integrated with GitHub Actions workflow. The workflow is defined in `.github/workflows/lighthouse.yml`.

When integrated with CI/CD, the workflow will:

1. Build the site
2. Deploy to a preview URL
3. Run Lighthouse CI against the preview URL
4. Report results as PR comment
5. Fail the build if critical issues are found

## Baseline Metrics

Initial baseline metrics were recorded on May 6, 2025. These serve as a reference point for future improvements.

### Desktop (May 6, 2025)

| Metric | Value | Target |
|--------|-------|--------|
| Performance Score | TBD | > 80 |
| SEO Score | 85 | > 90 |
| Accessibility Score | TBD | > 90 |
| Best Practices Score | TBD | > 90 |
| First Contentful Paint (FCP) | TBD | < 1.5s |
| Largest Contentful Paint (LCP) | TBD | < 2.0s |
| Cumulative Layout Shift (CLS) | TBD | < 0.1 |
| Total Blocking Time (TBT) | TBD | < 200ms |

#### SEO Issues Identified

- Missing canonical URLs
- Links without descriptive text
- Missing structured data
- Images not properly sized

### Mobile (May 6, 2025)

| Metric | Value | Target |
|--------|-------|--------|
| Performance Score | TBD | > 80 |
| SEO Score | 85 | > 90 |
| Accessibility Score | TBD | > 90 |
| Best Practices Score | TBD | > 90 |
| First Contentful Paint (FCP) | TBD | < 2.5s |
| Largest Contentful Paint (LCP) | TBD | < 3.0s |
| Cumulative Layout Shift (CLS) | TBD | < 0.1 |
| Total Blocking Time (TBT) | TBD | < 500ms |

Full reports can be viewed at:
- [Desktop Report](https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1746565362556-96830.report.html)
- [Mobile Report](https://storage.googleapis.com/lighthouse-infrastructure.appspot.com/reports/1746565409647-90373.report.html)

## Troubleshooting

Common issues and solutions:

1. **Chrome launch fails** - Ensure proper Chrome flags are set in configuration
2. **CI/CD integration fails** - Check for proper environment variables and permissions
3. **Inconsistent results** - Increase `numberOfRuns` for more reliable results
4. **Failing assertions** - Check console output for specific issues to address

## Future Improvements

- Set up historical tracking of Lighthouse scores
- Add custom Slack/email notifications for performance regressions
- Create custom Lighthouse plugins for project-specific checks
- Include Web Vitals RUM data from real users

---

*Last updated: May 6, 2025*
