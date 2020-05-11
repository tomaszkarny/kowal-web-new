import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { StyledListItem } from 'components/common/ListItem/ListItem.styles'

export const ListItem = ({ data }) => (
  <StyledListItem>
    <FontAwesomeIcon
      icon={data.icon}
      style={data.style}
      fixedWidth={data.fixedWidth}
    />
    {data.text}
  </StyledListItem>
)
