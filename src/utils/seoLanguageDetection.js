/**
 * Utility function to detect language in Gatsby Head API context
 * This ensures consistent language detection across all pages
 */
export const detectLanguageForSEO = (pageContext, location) => {
  // During build time, pageContext is properly populated by gatsby-plugin-react-i18next
  // The plugin passes the language in pageContext.language
  
  // Priority 1: Use language from gatsby-plugin-react-i18next pageContext
  if (pageContext?.language) {
    return pageContext.language;
  }
  
  // Priority 2: Check i18n object in pageContext (alternative structure)
  if (pageContext?.i18n?.language) {
    return pageContext.i18n.language;
  }
  
  // Priority 3: Check originalPath in pageContext (gatsby-plugin-react-i18next specific)
  if (pageContext?.i18n?.originalPath) {
    const lang = pageContext.i18n.originalPath.startsWith('/en') ? 'en' : 'pl';
    return lang;
  }
  
  // Priority 4: Detect from pathname
  const pathname = location?.pathname || '';
  if (pathname.startsWith('/en/') || pathname === '/en') {
    return 'en';
  }
  
  // Default to Polish
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
        title: 'Artistic Blacksmith Poland | Iron Gates - T. Karny',
        description: 'Best artistic blacksmith in Poland ⭐ Custom wrought iron gates, railings, fences. Traditional blacksmithing Białystok. 30+ years experience ☎+48 604 253 145'
      },
      about: {
        title: 'About Us - Artistic Blacksmithing Workshop',
        description: 'Artistic blacksmithing workshop Białystok since 1995. Traditional forging: wrought iron gates, railings, fences. Best blacksmith in Podlaskie ✓ Custom designs'
      },
      gallery: {
        title: 'Gallery - Wrought Iron Gates, Railings, Fences',
        description: 'Gallery: 100+ wrought iron gates, railings, fences projects in Białystok & Poland. Artistic blacksmith portfolio. Get inspired ✓ Free quote ☎604 253 145'
      },
      contact: {
        title: 'Contact - Blacksmith Białystok',
        description: 'Blacksmith Białystok contact ☎+48 604 253 145. Order custom wrought iron gate, railing, fence. Free quote ✓ Consultation ✓ Installation across Poland'
      },
      faq: {
        title: 'FAQ - Artistic Blacksmithing Questions',
        description: 'Frequently asked questions about artistic blacksmithing, wrought iron gates, railings and fences. Pricing, lead times, installation across Poland.'
      }
    },
    pl: {
      siteTitle: 'Pracownia Kowalstwa Artystycznego - Tadeusz Karny',
      siteDescription: 'Kowalstwo artystyczne – bramy, balustrady i ogrodzenia na zamówienie.',
      home: {
        title: 'Kowal Białystok - Bramy Kute | Tadeusz Karny',
        description: 'Najlepszy kowal w Polsce ⭐ Bramy kute, balustrady, ogrodzenia na zamówienie. Kowalstwo artystyczne Białystok i cała Polska. 30 lat tradycji ☎604 253 145'
      },
      about: {
        title: 'O nas - Kowalstwo Artystyczne Tadeusz Karny',
        description: 'Pracownia kowalstwa artystycznego Białystok od 1995. Tradycyjne kucie: bramy, balustrady, ogrodzenia kute. Najlepszy kowal podlaskie ✓ Projekty własne'
      },
      gallery: {
        title: 'Galeria - Bramy Kute, Balustrady, Ogrodzenia',
        description: 'Galeria realizacji: bramy kute, balustrady, ogrodzenia Białystok. Zobacz 100+ projektów kowalstwa artystycznego. Inspiracje ✓ Pomysły ✓ Darmowa wycena'
      },
      contact: {
        title: 'Kontakt - Kowal Białystok',
        description: 'Kowal Białystok kontakt ☎604 253 145. Zamów bramę kutą, balustradę, ogrodzenie. Darmowa wycena ✓ Doradztwo ✓ Montaż w całej Polsce. Zadzwoń teraz!'
      },
      faq: {
        title: 'FAQ - Pytania o Kowalstwo Artystyczne',
        description: 'Najczęściej zadawane pytania o kowalstwo artystyczne, bramy kute, balustrady i ogrodzenia. Cennik, terminy realizacji, montaż w całej Polsce.'
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