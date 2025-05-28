/**
 * Test script to verify city distance calculations
 * Run with: node scripts/test-city-distances.js
 */

const { CITIES } = require('../src/data/cities')
const { processCityData, WORKSHOP_LOCATION } = require('../src/utils/cityDistanceCalculator')

console.log('🏭 Workshop Location (Hryniewicze):')
console.log(`   Coordinates: ${WORKSHOP_LOCATION.lat}, ${WORKSHOP_LOCATION.lng}`)
console.log(`   Address: ${WORKSHOP_LOCATION.address}`)
console.log('')

console.log('📍 City Distance Calculations:')
console.log('================================')

CITIES.forEach(city => {
  const processedCity = processCityData(city)
  
  console.log(`\n${city.name.pl} (${city.name.en})`)
  console.log(`   Coordinates: ${city.coordinates.lat}, ${city.coordinates.lng}`)
  console.log(`   Distance: ${processedCity.distance} km`)
  console.log(`   Travel Time: ${processedCity.travelTime}`)
  console.log(`   Free Delivery: ${processedCity.freeDelivery ? '✅ Yes' : '❌ No'}`)
  
  // Verify Białystok is close (should be ~10km from Hryniewicze)
  if (city.id === 'bialystok' && processedCity.distance > 15) {
    console.log(`   ⚠️  WARNING: Distance seems too high for Białystok!`)
  }
})

console.log('\n================================')
console.log('✅ Distance calculations complete!')