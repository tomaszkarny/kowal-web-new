import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const ContainerWrapper = styled.div`
  height: 700px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.main};

  ${mq('tablet')} {
    padding: 5rem;
  }
`

export const StyledMapElement = styled.div`
  height: 100%;
`

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 40px;
`

export const InfoTitle = styled.h5`
  margin: 0 0 10px 0;
  font-weight: bold;
  color: #333;
`

export const InfoText = styled.p`
  margin-bottom: 8px;
  font-size: 14px;
  color: #555;
`

// Style object for the GoogleMap component itself
export const mapContainerStyle = {
  width: '100%',
  height: '100%'
}
