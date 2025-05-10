/**
 * Contact details and business information
 * Central repository for all business NAP (Name, Address, Phone) information
 * Used for LocalBusiness schema and consistent display across the site
 */

// Basic contact information
export const BUSINESS_NAME = 'Pracownia Kowalstwa Artystycznego Tadeusz Karny'
export const EMAIL_ADDRESS = 'tadeusz_karny@wp.pl'
export const PHONE_NUMBER = '+48 604 253 145'
export const PHONE_NUMBER_FORMATTED = '+48 604 253 145' // Formatted for display

// Address components for structured data
export const ADDRESS = 'Hryniewicze 31, 15 - 378 Białystok'
export const ADDRESS_STREET = 'Hryniewicze 31'
export const ADDRESS_CITY = 'Białystok'
export const ADDRESS_POSTAL_CODE = '15-378'
export const ADDRESS_REGION = 'Podlaskie'
export const ADDRESS_COUNTRY = 'Poland'
export const ADDRESS_COUNTRY_CODE = 'PL'

// Social media profiles
export const FACEBOOK_URL = 'www.facebook.com/kowalstwo.karny'
export const INSTAGRAM_URL = 'www.instagram.com/kowalstwokarny'

// Website information
export const WEBSITE_URL = 'https://kowalstwo-karny.pl'
export const LOGO_PATH = '/logo.png'

// Geo coordinates for map
export const GOOGLE_MAP_DIRECTIONS = { lat: 53.400344, lng: 22.805769 }

// Business details for LocalBusiness schema
export const BUSINESS_TYPE = 'BlacksmithShop'
export const BUSINESS_DESCRIPTION = 'Pracownia Kowalstwa Artystycznego Tadeusz Karny oferuje tradycyjne kowalstwo artystyczne, bramy, balustrady oraz elementy dekoracyjne wykonane z wysokiej jakości metalu.'
export const PRICE_RANGE = '$$'
export const YEAR_ESTABLISHED = '1995'
export const CURRENCIES_ACCEPTED = 'PLN'
export const PAYMENT_ACCEPTED = ['Cash', 'CreditCard', 'BankTransfer']
export const AREA_SERVED = ['Białystok', 'Podlaskie', 'Poland']

// Opening hours
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

// Images for schema
export const BUSINESS_IMAGES = [
  '/images/workshop/workshop-exterior.jpg',
  '/images/workshop/blacksmith-work.jpg'
]
