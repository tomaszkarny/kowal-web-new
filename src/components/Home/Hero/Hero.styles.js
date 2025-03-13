import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const Title = styled.h1`
  text-align: center;
  box-sizing: inherit;
  font-weight: 700;
  margin: 0 0 25px;

  color: #1d2d35;
  letter-spacing: -0.75px;
  line-height: 1.2;
  font-size: 36 px;
  font-family: 'Merriweather';
`

export const Description = styled.p`
  font-weight: 400;
  line-height: 1.5;
  color: #${({ theme }) => theme.color.bluewood};
  font-size: 1 rem;
  text-align: center;
  box-sizing: inherit;
  margin: 0 0 28px;
  padding: 0;
`

export const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5rem 0;

  display: flex;
  flex-direction: column;
  /* min-height: 600px; */

  ${mq('medium')} {
    flex-direction: row;
  }
`

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  justify-content: center;
  flex: 1;
  align-items: center;
`
