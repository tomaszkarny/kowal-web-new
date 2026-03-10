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
        title: 'Wrought Iron Gallery - 500+ Projects | Karny Blacksmith',
        description: 'Browse 500+ wrought iron projects: gates, railings, fences. Custom designs, traditional craftsmanship. Portfolio and inspiration.'
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
        title: 'Kowal Białystok - Ogrodzenia i Bramy na Zamówienie',
        description: 'Najlepszy kowal w Polsce ⭐ Ogrodzenia na zamówienie, bramy kute, balustrady. Kowalstwo artystyczne Białystok. 30 lat doświadczenia ☎604 253 145. Darmowa wycena!'
      },
      about: {
        title: 'O nas - Kowalstwo Artystyczne Tadeusz Karny',
        description: 'Pracownia kowalstwa artystycznego Białystok od 1995. Tradycyjne kucie: bramy, balustrady, ogrodzenia kute. Najlepszy kowal podlaskie ✓ Projekty własne'
      },
      gallery: {
        title: 'Galeria Bram Kutych i Balustrad - 500+ Realizacji | Karny',
        description: 'Zobacz ponad 500 realizacji bram kutych, balustrad i ogrodzeń. ✓ Bramy dwuskrzydłowe ✓ Balustrady schodowe ✓ Ogrodzenia kute. Inspiracje i portfolio.'
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