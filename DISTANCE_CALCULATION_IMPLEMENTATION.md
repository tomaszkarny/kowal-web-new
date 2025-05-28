# Distance Calculation Implementation

## Overview
Implemented dynamic distance and travel time calculation for all cities based on the workshop location in Hryniewicze.

## Files Created/Modified

### 1. Created `/src/utils/cityDistanceCalculator.js`
- Haversine formula for accurate distance calculation
- Travel time estimation (70 km/h average speed)
- Free delivery determination (25 km radius)
- Workshop location constants

### 2. Updated `/src/data/cities.js`
- Removed hardcoded `distance` and `travelTime` fields
- Adjusted Białystok coordinates for accurate distance (~10 km from Hryniewicze)
- Kept all other city data intact

### 3. Updated `/gatsby-node.js`
- Imported `processCityData` function
- Process city data during build time
- Pass calculated values to page context

### 4. Updated `/src/templates/CityPage.js`
- Use calculated `travelTime` instead of `travelTime[language]`
- Use calculated `freeDelivery` boolean

### 5. Updated `/src/components/Cities/CitiesIndex/CitiesIndex.js`
- Import and use `processAllCities` function
- Display calculated distances and travel times
- Cities are automatically sorted by distance

### 6. Updated `/src/components/Cities/CityServices/CityServices.js`
- Use calculated `freeDelivery` property

## Calculated Distances
- **Białystok**: 9 km (✅ Free delivery)
- **Augustów**: 69 km
- **Łomża**: 96 km
- **Suwałki**: 99 km
- **Warszawa**: 203 km

## Key Features
1. **Automatic Distance Calculation**: No need to manually update distances
2. **Realistic Travel Times**: Based on 70 km/h average speed
3. **Free Delivery Zone**: Automatically determined for cities within 25 km
4. **Build-time Processing**: Calculations done during Gatsby build
5. **Sorted by Distance**: Cities automatically sorted from nearest to farthest

## Testing
Run `node scripts/test-city-distances.js` to verify calculations.

## Future Enhancements
- Consider road distance API integration for more accurate travel times
- Add traffic condition estimates
- Support for custom delivery zones per city