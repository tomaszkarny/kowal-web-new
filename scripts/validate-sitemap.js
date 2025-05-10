const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { DOMParser } = require('xmldom');

// Define simple color functions instead of using chalk
const colors = {
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`
};

// Configuration
const PUBLIC_DIR = path.join(__dirname, '../public');
const SITEMAP_DIR = path.join(PUBLIC_DIR, 'sitemap');
const SITE_URL = 'https://www.kowalstwo-karny.pl';

/**
 * Validates the XML sitemap structure and contents
 */
async function validateSitemap() {
  console.log(colors.blue('🔍 Validating sitemap files...'));
  
  // Check if sitemap index exists
  const sitemapIndexPath = path.join(SITEMAP_DIR, 'sitemap-index.xml');
  if (!fs.existsSync(sitemapIndexPath)) {
    console.error(colors.red('❌ Sitemap index file not found at: ' + sitemapIndexPath));
    process.exit(1);
  }
  
  console.log(colors.green('✅ Found sitemap index file'));
  
  // Parse sitemap index to find individual sitemaps
  const sitemapIndexContent = fs.readFileSync(sitemapIndexPath, 'utf8');
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(sitemapIndexContent, 'text/xml');
  
  const sitemapNodes = xmlDoc.getElementsByTagName('sitemap');
  if (sitemapNodes.length === 0) {
    console.error(colors.red('❌ No sitemaps found in sitemap index'));
    process.exit(1);
  }
  
  console.log(colors.blue(`Found ${sitemapNodes.length} sitemap(s) in index`));
  
  // Check each sitemap
  for (let i = 0; i < sitemapNodes.length; i++) {
    const sitemapLoc = sitemapNodes[i].getElementsByTagName('loc')[0].textContent;
    const sitemapFileName = sitemapLoc.replace(`${SITE_URL}/sitemap/`, '');
    const sitemapPath = path.join(SITEMAP_DIR, sitemapFileName);
    
    if (!fs.existsSync(sitemapPath)) {
      console.error(colors.red(`❌ Sitemap file not found at: ${sitemapPath}`));
      continue;
    }
    
    // Parse individual sitemap
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    const sitemapDoc = parser.parseFromString(sitemapContent, 'text/xml');
    const urlNodes = sitemapDoc.getElementsByTagName('url');
    
    console.log(colors.green(`✅ ${sitemapFileName} - Found ${urlNodes.length} URLs`));
    
    // Sample validation of URLs
    let hasAlternates = false;
    let hasPriority = false;
    let hasChangefreq = false;
    
    // Check first 5 URLs for essential elements
    for (let j = 0; j < Math.min(5, urlNodes.length); j++) {
      const url = urlNodes[j];
      if (url.getElementsByTagName('priority').length > 0) hasPriority = true;
      if (url.getElementsByTagName('changefreq').length > 0) hasChangefreq = true;
      
      // Check for xhtml:link alternates
      const links = url.getElementsByTagNameNS('http://www.w3.org/1999/xhtml', 'link');
      if (links && links.length > 0) hasAlternates = true;
    }
    
    console.log(`  ${hasPriority ? colors.green('✅') : colors.yellow('⚠️')} Priority values: ${hasPriority ? 'Present' : 'Missing'}`);
    console.log(`  ${hasChangefreq ? colors.green('✅') : colors.yellow('⚠️')} Change frequency: ${hasChangefreq ? 'Present' : 'Missing'}`);
    console.log(`  ${hasAlternates ? colors.green('✅') : colors.yellow('⚠️')} Language alternates: ${hasAlternates ? 'Present' : 'Missing'}`);
  }
  
  console.log(colors.green('\n✅ Sitemap validation complete'));
}

validateSitemap().catch(err => {
  console.error(colors.red('Error validating sitemap:'), err);
  process.exit(1);
});
