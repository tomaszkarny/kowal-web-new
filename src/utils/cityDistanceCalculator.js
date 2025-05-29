// Workshop location in Hryniewicze (not Białystok city center)
const WORKSHOP_LOCATION = {
  lat: 53.0805839,
  lng: 23.1371503,
  address: 'Hryniewicze 31, 15-378 Białystok'
}

// Configuration
const FREE_DELIVERY_RADIUS = 25 // km
const AVERAGE_SPEED = 70 // km/h for travel time estimation

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lng1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lng2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return Math.round(R * c)
}

/**
 * Calculate travel time based on distance
 * @param {number} distance - Distance in kilometers
 * @returns {object} Travel time in Polish and English
 */
const calculateTravelTime = (distance) => {
  const hours = distance / AVERAGE_SPEED
  const totalMinutes = Math.round(hours * 60)
  
  if (totalMinutes === 0) {
    return {
      pl: '0 minut',
      en: '0 minutes'
    }
  }
  
  if (totalMinutes < 60) {
    return {
      pl: `${totalMinutes} minut`,
      en: `${totalMinutes} minutes`
    }
  }
  
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  
  if (m === 0) {
    return {
      pl: h === 1 ? '1 godzina' : `${h} godziny`,
      en: h === 1 ? '1 hour' : `${h} hours`
    }
  }
  
  const plHour = h === 1 ? 'godzina' : (h < 5 ? 'godziny' : 'godzin')
  const enHour = h === 1 ? 'hour' : 'hours'
  const plMin = m === 1 ? 'minuta' : (m < 5 ? 'minuty' : 'minut')
  const enMin = m === 1 ? 'minute' : 'minutes'
  
  return {
    pl: `${h} ${plHour} ${m} ${plMin}`,
    en: `${h} ${enHour} ${m} ${enMin}`
  }
}

/**
 * Process city data with calculated distances and travel times
 * @param {object} city - City data object
 * @returns {object} City with calculated distance and travel time
 */
const processCityData = (city) => {
  const distance = calculateDistance(
    WORKSHOP_LOCATION.lat,
    WORKSHOP_LOCATION.lng,
    city.coordinates.lat,
    city.coordinates.lng
  )
  
  const travelTime = calculateTravelTime(distance)
  const freeDelivery = distance <= FREE_DELIVERY_RADIUS
  
  return {
    ...city,
    distance,
    travelTime,
    freeDelivery
  }
}

/**
 * Get cities sorted by distance from workshop
 * @param {array} cities - Array of city objects
 * @returns {array} Sorted cities with calculated data
 */
const getCitiesSortedByDistance = (cities) => {
  return cities
    .map(processCityData)
    .sort((a, b) => a.distance - b.distance)
}

/**
 * Check if delivery is free for a given distance
 * @param {number} distance - Distance in kilometers
 * @returns {boolean} True if delivery is free
 */
const isDeliveryFree = (distance) => {
  return distance <= FREE_DELIVERY_RADIUS
}

/**
 * Process all cities with calculated distances
 * @param {array} cities - Array of city objects
 * @returns {array} Cities with calculated data
 */
const processAllCities = (cities) => {
  return getCitiesSortedByDistance(cities)
}

module.exports = {
  WORKSHOP_LOCATION,
  FREE_DELIVERY_RADIUS,
  calculateDistance,
  processCityData,
  getCitiesSortedByDistance,
  isDeliveryFree,
  processAllCities
}