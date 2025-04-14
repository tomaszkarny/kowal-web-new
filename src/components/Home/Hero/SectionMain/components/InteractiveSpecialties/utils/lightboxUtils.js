import { getSrc } from 'gatsby-plugin-image';

/**
 * Generates an array of slide objects for the lightbox from the imageMap and labelMap.
 */
export const generateLightboxSlides = (imageMap, labelMap) => {
  return Object.keys(imageMap)
    .sort((a, b) => a - b)
    .map(key => ({
      src: getSrc(imageMap[key]),
      alt: '',
      title: labelMap[key]
    }));
};

/**
 * Creates the imageMap and labelMap from query data and translations
 */
export const createImageAndLabelMaps = (data, t) => {
  // Build an object with data for each ID, including original
  const imageMap = {
    1: data.gates.childImageSharp,
    2: data.railings.childImageSharp,
    3: data.fences.childImageSharp,
    4: data.gratings.childImageSharp,
    5: data.decorative.childImageSharp,
  };

  // Custom label map for captions
  const labelMap = {
    1: t('specialties_items_gates', 'Gates (wing, sliding, wickets)'),
    2: t('specialties_items_railings', 'Railings (interior and exterior)'),
    3: t('specialties_items_fences', 'Fences'),
    4: t('specialties_items_gratings', 'Gratings'),
    5: t('specialties_items_decorative', 'Other decorative elements (candlesticks, furniture, etc.)'),
  };

  return { imageMap, labelMap };
};

/**
 * Creates lightbox photos array with original image dimensions
 */
export const createLightboxPhotos = (imageMap, labelMap) => {
  return Object.keys(imageMap)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(key => {
      const originalData = imageMap[key].original;
      return {
        src: originalData.src,
        width: originalData.width,
        height: originalData.height,
        title: labelMap[key] || '',
        alt: ''
      };
    });
};
