/**
 * Contact details and business information
 * Central repository for all business NAP (Name, Address, Phone) information
 * Used for LocalBusiness schema and consistent display across the site
 * 
 * This file provides a single source of truth for all business contact information
 * to ensure consistency across the entire site and proper structured data for SEO
 */

/**
 * Multi-language business name
 * @type {{pl: string, en: string}}
 */
export const BUSINESS_NAME_ML = {
  pl: 'Pracownia Kowalstwa Artystycznego Tadeusz Karny',
  en: 'Artistic Blacksmithing Workshop Tadeusz Karny'
}

// Basic contact information - backward compatibility
export const BUSINESS_NAME = BUSINESS_NAME_ML.pl // For backward compatibility
export const EMAIL_ADDRESS = 'tadeusz_karny@wp.pl'
export const PHONE_NUMBER = '+48 604 253 145' // Keep the original format with spaces
export const PHONE_NUMBER_FORMATTED = '+48 604 253 145' // Formatted for display

/**
 * Formatted phone number for each language
 * @type {{pl: string, en: string}}
 */
export const PHONE_NUMBER_DISPLAY = {
  pl: '+48 604 253 145',
  en: '+48 604 253 145'
}

/**
 * Address information - multilingual
 * @type {{pl: object, en: object}}
 */
export const ADDRESS_ML = {
  pl: {
    full: 'Hryniewicze 31, 15-378 Białystok, Polska',
    street: 'Hryniewicze 31',
    city: 'Białystok',
    postalCode: '15-378',
    region: 'Podlaskie',
    country: 'Polska',
    countryCode: 'PL'
  },
  en: {
    full: 'Hryniewicze 31, 15-378 Białystok, Poland',
    street: 'Hryniewicze 31',
    city: 'Białystok',
    postalCode: '15-378',
    region: 'Podlaskie',
    country: 'Poland',
    countryCode: 'PL'
  }
}

// Address components for structured data - backward compatibility
export const ADDRESS = 'Hryniewicze 31, 15 - 378 Białystok'  // Keep the exact original format
export const ADDRESS_STREET = ADDRESS_ML.pl.street
export const ADDRESS_CITY = ADDRESS_ML.pl.city
export const ADDRESS_POSTAL_CODE = ADDRESS_ML.pl.postalCode
export const ADDRESS_REGION = ADDRESS_ML.pl.region
export const ADDRESS_COUNTRY = ADDRESS_ML.pl.country
export const ADDRESS_COUNTRY_CODE = ADDRESS_ML.pl.countryCode

// Social media profiles
export const FACEBOOK_URL = 'www.facebook.com/kowalstwo.karny'
export const INSTAGRAM_URL = 'www.instagram.com/kowalstwokarny'

// Website information
export const WEBSITE_URL = 'https://kowalstwo-karny.pl'
export const LOGO_PATH = '/logo.png'

// Google Maps information
export const GOOGLE_MAP_DIRECTIONS = { lat: 53.0805839, lng: 23.1371503 } // Updated coordinates
export const GOOGLE_MAPS_URL = 'https://www.google.com/maps/place/Pracownia+Kowalstwa+Artystycznego+-+Tadeusz+Karny/@53.0812043,23.1342586,17z/data=!4m15!1m8!3m7!1s0x471ff978a337baf5:0x86342f5404acd36b!2sHryniewicze+31,+15-378+Hryniewicze!3b1!8m2!3d53.0812043!4d23.1368335!16s%2Fg%2F11fq0k72hs!3m5!1s0x471ff978bd2b0fa3:0xe1a3131fbae4b7cd!8m2!3d53.0805839!4d23.1371503!16s%2Fg%2F1td1_01m?entry=ttu'

// Business details for LocalBusiness schema
export const BUSINESS_TYPE = 'BlacksmithShop'
/**
 * Business description - multilingual
 * @type {{pl: string, en: string}}
 */
export const BUSINESS_DESCRIPTION_ML = {
  pl: 'Pracownia Kowalstwa Artystycznego Tadeusz Karny oferuje tradycyjne kowalstwo artystyczne, bramy, balustrady oraz elementy dekoracyjne wykonane z wysokiej jakości metalu.',
  en: 'Artistic Blacksmithing Workshop Tadeusz Karny offers traditional artistic blacksmithing, gates, railings, and decorative elements crafted from high-quality metal.'
}

// Default business description - backward compatibility
export const BUSINESS_DESCRIPTION = BUSINESS_DESCRIPTION_ML.pl
export const PRICE_RANGE = '$$'
export const YEAR_ESTABLISHED = '1995'
export const CURRENCIES_ACCEPTED = 'PLN'
export const PAYMENT_ACCEPTED = ['Cash', 'CreditCard', 'BankTransfer']
export const AREA_SERVED = ['Białystok', 'Podlaskie', 'Poland']

/**
 * Opening hours - English version (used for schema.org)
 */
export const OPENING_HOURS = [
  {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:00',
    closes: '16:00'
  },
  {
    days: ['Saturday'],
    opens: '09:00',
    closes: '13:00'
  }
]

/**
 * Opening hours - multilingual for display
 * @type {{pl: object, en: object}}
 */
export const OPENING_HOURS_ML = {
  pl: [
    {
      days: 'Poniedziałek - Piątek',
      hours: '8:00 - 16:00'
    },
    {
      days: 'Sobota',
      hours: '9:00 - 13:00'
    },
    {
      days: 'Niedziela',
      hours: 'Zamknięte'
    }
  ],
  en: [
    {
      days: 'Monday - Friday',
      hours: '8:00 AM - 4:00 PM'
    },
    {
      days: 'Saturday',
      hours: '9:00 AM - 1:00 PM'
    },
    {
      days: 'Sunday',
      hours: 'Closed'
    }
  ]
}

// Images for schema
export const BUSINESS_IMAGES = [
  '/images/workshop/workshop-exterior.jpg',
  '/images/workshop/blacksmith-work.jpg'
]

/**
 * Services offered - multilingual
 * @type {{pl: string[], en: string[]}}
 */
export const SERVICES_OFFERED = {
  pl: [
    'Bramy kute (przesuwne, dwuskrzydłowe, furtki)',
    'Balustrady (wewnętrzne i zewnętrzne)',
    'Ogrodzenia',
    'Kraty ozdobne i zabezpieczające',
    'Elementy dekoracyjne (świeczniki, meble, konstrukcje stalowe, itp.)'
  ],
  en: [
    'Wrought iron gates (sliding, double-leaf, wickets)',
    'Railings (interior and exterior)',
    'Fences',
    'Decorative and security gratings',
    'Decorative elements (candlesticks, furniture, steel structures, etc.)'
  ]
}

/**
 * Helper function to get NAP information in the current language
 * @param {string} language - Current language code ('pl' or 'en')
 * @returns {object} NAP information in the specified language
 */
export const getNapInfo = (language = 'pl') => {
  const lang = language === 'en' ? 'en' : 'pl';
  
  return {
    businessName: BUSINESS_NAME_ML[lang],
    description: BUSINESS_DESCRIPTION_ML[lang],
    email: EMAIL_ADDRESS,
    phone: PHONE_NUMBER,
    phoneFormatted: PHONE_NUMBER_DISPLAY[lang],
    address: ADDRESS_ML[lang],
    openingHours: OPENING_HOURS_ML[lang],
    services: SERVICES_OFFERED[lang],
    social: {
      facebook: FACEBOOK_URL,
      instagram: INSTAGRAM_URL
    },
    mapsUrl: GOOGLE_MAPS_URL,
    geoCoordinates: GOOGLE_MAP_DIRECTIONS,
    website: WEBSITE_URL
  };
}
