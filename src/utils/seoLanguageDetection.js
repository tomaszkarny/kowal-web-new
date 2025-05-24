/**
 * Utility function to detect language in Gatsby Head API context
 * This ensures consistent language detection across all pages
 */
export const detectLanguageForSEO = (pageContext, location) => {
  // During build time, pageContext is properly populated by gatsby-plugin-react-i18next
  // The plugin passes the language in pageContext.language
  
  // Priority 1: Use language from gatsby-plugin-react-i18next pageContext
  if (pageContext?.language) {
    console.log(`[SEO] Language detected from pageContext.language: ${pageContext.language}`);
    return pageContext.language;
  }
  
  // Priority 2: Check i18n object in pageContext (alternative structure)
  if (pageContext?.i18n?.language) {
    console.log(`[SEO] Language detected from pageContext.i18n.language: ${pageContext.i18n.language}`);
    return pageContext.i18n.language;
  }
  
  // Priority 3: Check originalPath in pageContext (gatsby-plugin-react-i18next specific)
  if (pageContext?.i18n?.originalPath) {
    const lang = pageContext.i18n.originalPath.startsWith('/en') ? 'en' : 'pl';
    console.log(`[SEO] Language detected from pageContext.i18n.originalPath: ${lang}`);
    return lang;
  }
  
  // Priority 4: Detect from pathname
  const pathname = location?.pathname || '';
  if (pathname.startsWith('/en/') || pathname === '/en') {
    console.log(`[SEO] Language detected from pathname: en`);
    return 'en';
  }
  
  // Default to Polish
  console.log(`[SEO] Defaulting to Polish language`);
  return 'pl';
};

/**
 * Get SEO translations directly without using hooks
 * This is safer for Head API context
 */
export const getSEOTranslations = (language, pageType) => {
  const seoTranslations = {
    en: {
      siteTitle: 'Tadeusz Karny Artistic Blacksmith',
      siteDescription: 'Artistic blacksmithing – bespoke gates, railings, fences and decorative ironwork.',
      home: {
        title: 'Artistic Blacksmith Białystok | Custom gates, railings & fences – Tadeusz Karny',
        description: 'Looking for a blacksmith in Białystok, Poland? Tadeusz Karny crafts bespoke gates, railings and fences – traditional artistic blacksmithing for 30+ years.'
      },
      about: {
        title: 'About Us',
        description: 'Learn about our artistic blacksmithing workshop specializing in high-quality custom metalwork with over 20 years of experience.'
      },
      gallery: {
        title: 'Gallery',
        description: 'Browse our portfolio of gates, railings and fences.'
      },
      contact: {
        title: 'Contact',
        description: 'Contact us to discuss your custom gate, fence or railing – by phone, email or an on-site visit to our workshop.'
      }
    },
    pl: {
      siteTitle: 'Pracownia Kowalstwa Artystycznego - Tadeusz Karny',
      siteDescription: 'Kowalstwo artystyczne – bramy, balustrady i ogrodzenia na zamówienie.',
      home: {
        title: 'Kowalstwo artystyczne Białystok – bramy, balustrady, ogrodzenia | Tadeusz Karny',
        description: 'Kowal Tadeusz Karny: bramy na zamówienie, balustrady i ogrodzenia. Najlepsze kowalstwo artystyczne w Białymstoku i w Polsce – 30 lat doświadczenia.'
      },
      about: {
        title: 'O nas',
        description: 'Poznaj naszą pracownię kowalstwa artystycznego specjalizującą się w wysokiej jakości wyrobach metalowych z ponad 20-letnim doświadczeniem.'
      },
      gallery: {
        title: 'Galeria',
        description: 'Zobacz nasze portfolio bram, balustrad, ogrodzeń i innych dekoracyjnych elementów metalowych wykonanych z precyzją i dbałością o szczegóły.'
      },
      contact: {
        title: 'Kontakt',
        description: 'Skontaktuj się z nami, aby omówić projekt bramy, ogrodzenia lub balustrady – odpowiadamy telefonicznie, mailowo i w pracowni.'
      }
    }
  };

  const translations = seoTranslations[language] || seoTranslations.pl;
  const pageTranslations = translations[pageType] || {};
  
  return {
    siteTitle: translations.siteTitle,
    siteDescription: translations.siteDescription,
    pageTitle: pageTranslations.title || '',
    pageDescription: pageTranslations.description || translations.siteDescription
  };
};