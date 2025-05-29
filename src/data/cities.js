/**
 * Dane miast obsługiwanych przez warsztat kowalski
 * Używane do generowania lokalnych stron SEO
 */

const CITIES = [
  {
    id: 'bialystok',
    slug: {
      pl: 'bialystok',
      en: 'bialystok'
    },
    name: {
      pl: 'Białystok',
      en: 'Białystok'
    },
    region: {
      pl: 'województwo podlaskie',
      en: 'Podlaskie Voivodeship'
    },
    population: 297554,
    priority: 1, // dla SEO - im wyższy tym ważniejszy
    coordinates: {
      lat: 53.1325,  // Białystok city center
      lng: 23.1688
    },
    serviceArea: {
      radius: 50, // km - promień obsługi dla Białegostoku
      neighborhoods: {
        pl: ['Centrum', 'Białostoczek', 'Wysoki Stoczek', 'Dziesięciny', 'Bacieczki'],
        en: ['City Center', 'Białostoczek', 'Wysoki Stoczek', 'Dziesięciny', 'Bacieczki']
      }
    },
    description: {
      pl: 'Białystok to stolica województwa podlaskiego i główne miasto naszej działalności. Oferujemy pełen zakres usług kowalskich z bezpłatnym transportem i montażem.',
      en: 'Białystok is the capital of Podlaskie Voivodeship and the main city of our operations. We offer a full range of blacksmithing services with free transport and installation.'
    },
    featured: true // czy pokazywać na stronie głównej
  },
  {
    id: 'warszawa',
    slug: {
      pl: 'warszawa',
      en: 'warsaw'
    },
    name: {
      pl: 'Warszawa',
      en: 'Warsaw'
    },
    region: {
      pl: 'województwo mazowieckie',
      en: 'Masovian Voivodeship'
    },
    population: 1794166,
    priority: 2,
    coordinates: {
      lat: 52.2297,
      lng: 21.0122
    },
    serviceArea: {
      radius: 150, // km - promień obsługi dla Warszawy
      neighborhoods: {
        pl: ['Śródmieście', 'Mokotów', 'Żoliborz', 'Wola', 'Ochota', 'Praga Północ', 'Praga Południe'],
        en: ['City Center', 'Mokotów', 'Żoliborz', 'Wola', 'Ochota', 'Praga North', 'Praga South']
      }
    },
    description: {
      pl: 'Warszawa - stolica Polski. Realizujemy projekty kowalskie na terenie całej Warszawy i aglomeracji. Transport w ramach opłaty za montaż.',
      en: 'Warsaw - the capital of Poland. We implement blacksmithing projects throughout Warsaw and the metropolitan area. Transport included in installation fee.'
    },
    featured: true
  },
  {
    id: 'suwalki',
    slug: {
      pl: 'suwalki',
      en: 'suwalki'
    },
    name: {
      pl: 'Suwałki',
      en: 'Suwałki'
    },
    region: {
      pl: 'województwo podlaskie',
      en: 'Podlaskie Voivodeship'
    },
    population: 69827,
    priority: 3,
    coordinates: {
      lat: 54.1020,
      lng: 22.9308
    },
    serviceArea: {
      radius: 100, // km - promień obsługi dla Suwałk
      neighborhoods: {
        pl: ['Centrum', 'Północ', 'Południe', 'Zachód'],
        en: ['Center', 'North', 'South', 'West']
      }
    },
    description: {
      pl: 'Suwałki - miasto na północy Podlasia. Regularnie realizujemy zlecenia kowalskie w Suwałkach i okolicach. Bezpłatny transport do 25 km.',
      en: 'Suwałki - a city in northern Podlaskie. We regularly complete blacksmithing orders in Suwałki and surrounding areas. Free transport up to 25 km.'
    },
    featured: true
  },
  {
    id: 'augustow',
    slug: {
      pl: 'augustow',
      en: 'augustow'
    },
    name: {
      pl: 'Augustów',
      en: 'Augustów'
    },
    region: {
      pl: 'województwo podlaskie',
      en: 'Podlaskie Voivodeship'
    },
    population: 30709,
    priority: 4,
    coordinates: {
      lat: 53.8433,
      lng: 23.0181
    },
    serviceArea: {
      radius: 80, // km - promień obsługi dla Augustowa
      neighborhoods: {
        pl: ['Centrum', 'Nadjeziorna', 'Sosnowa', 'Wojska Polskiego'],
        en: ['Center', 'Lakeside', 'Sosnowa', 'Wojska Polskiego']
      }
    },
    description: {
      pl: 'Augustów - malownicze miasto nad jeziorami. Specjalizujemy się w bramach i balustradach do domów letniskowych i pensjonatów.',
      en: 'Augustów - a picturesque city by the lakes. We specialize in gates and railings for holiday homes and guesthouses.'
    },
    featured: false
  },
  {
    id: 'lomza',
    slug: {
      pl: 'lomza',
      en: 'lomza'
    },
    name: {
      pl: 'Łomża',
      en: 'Łomża'
    },
    region: {
      pl: 'województwo podlaskie',
      en: 'Podlaskie Voivodeship'
    },
    population: 62918,
    priority: 5,
    coordinates: {
      lat: 53.1781,
      lng: 22.0585
    },
    serviceArea: {
      radius: 100, // km - promień obsługi dla Łomży
      neighborhoods: {
        pl: ['Centrum', 'Tatary', 'Starosielce', 'Podgórze'],
        en: ['Center', 'Tatary', 'Starosielce', 'Podgórze']
      }
    },
    description: {
      pl: 'Łomża - historyczne miasto nad Narwią. Oferujemy kompleksowe usługi kowalskie z uwzględnieniem lokalnych tradycji architektonicznych.',
      en: 'Łomża - a historic city on the Narew River. We offer comprehensive blacksmithing services considering local architectural traditions.'
    },
    featured: false
  }
]

/**
 * Pomocnicze funkcje do pracy z danymi miast
 */

// Zwraca miasto po ID
const getCityById = (id) => {
  return CITIES.find(city => city.id === id)
}

// Zwraca miasta według priorytetu
const getCitiesByPriority = () => {
  return [...CITIES].sort((a, b) => a.priority - b.priority)
}

// Zwraca tylko miasta wyróżnione
const getFeaturedCities = () => {
  return CITIES.filter(city => city.featured)
}

// Zwraca miasto po slugu
const getCityBySlug = (slug, language = 'pl') => {
  return CITIES.find(city => city.slug[language] === slug)
}

// Zwraca wszystkie slugi dla sitemap
const getAllCitySlugs = () => {
  const slugs = []
  CITIES.forEach(city => {
    slugs.push({
      pl: city.slug.pl,
      en: city.slug.en,
      id: city.id,
      priority: city.priority
    })
  })
  return slugs
}

// Zwraca miasta w promieniu od punktu
const getCitiesInRadius = (lat, lng, radiusKm) => {
  const toRad = (value) => (value * Math.PI) / 180
  
  return CITIES.filter(city => {
    const R = 6371 // promień Ziemi w km
    const dLat = toRad(city.coordinates.lat - lat)
    const dLng = toRad(city.coordinates.lng - lng)
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat)) * Math.cos(toRad(city.coordinates.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2)
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    
    return distance <= radiusKm
  })
}

// CommonJS exports for compatibility with gatsby-node.js
module.exports = {
  CITIES,
  getCityById,
  getCitiesByPriority,
  getFeaturedCities,
  getCityBySlug,
  getAllCitySlugs,
  getCitiesInRadius,
  default: CITIES
}