import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledListItem } from 'components/common/ListItem/ListItem.styles'

export const ListItem = ({ data }) => {
  // If translationKey starts with 'locations.', use the 'about' namespace and format key correctly
  let namespace = 'common';
  let translationKey = data.translationKey;
  
  if (data.translationKey && data.translationKey.startsWith('locations.')) {
    namespace = 'about';
    // Convert 'locations.hasbach' to 'locations_hasbach' for the flattened structure
    translationKey = data.translationKey.replace('.', '_');
  }
  
  const { t } = useTranslation(namespace);
  
  return (
  <StyledListItem>
    <FontAwesomeIcon
      icon={data.icon}
      style={data.style}
      fixedWidth={data.fixedWidth}
    />
    {translationKey ? t(translationKey, data.text) : data.text}
  </StyledListItem>
  )
}
