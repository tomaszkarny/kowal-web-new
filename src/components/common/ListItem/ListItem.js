import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { StyledListItem } from 'components/common/ListItem/ListItem.styles'
import { StyledIcon } from 'components/common/Icon/Icon.styles'

export function ListItem({ data }) {
  // If translationKey starts with 'locations.', use the 'about' namespace and format key correctly
  let namespace = 'common';
  let {translationKey} = data;
  
  if (data.translationKey && data.translationKey.startsWith('locations.')) {
    namespace = 'about';
    // Convert 'locations.hasbach' to 'locations_hasbach' for the flattened structure
    translationKey = data.translationKey.replace('.', '_');
  }
  
  const { t } = useTranslation(namespace);
  
  return (
  <StyledListItem>
    <StyledIcon
      icon={data.icon}
      fixedWidth={data.fixedWidth}
    />
    {translationKey ? t(translationKey, data.text) : data.text}
  </StyledListItem>
  )
}
