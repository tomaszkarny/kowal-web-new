import styled from '@emotion/styled'
import { mq } from 'utils/mediaQueries'

export const SuccessMessageWrapper = styled.div`
  padding: 2rem;
  background-color: ${({ theme }) => theme.color.main};
  text-align: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  ${mq('tablet')} {
    padding: 5rem;
  }
`

export const SuccessBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #4CAF50;
`

export const SuccessIconContainer = styled.div`
  width: 50px;
  height: 50px;
  background: #f0f9f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px auto;

  ${mq('tablet')} {
    width: 60px;
    height: 60px;
    margin: 20px auto;
  }
`

export const SuccessIcon = styled.div`
  font-size: 30px;
  color: #4CAF50;

  ${mq('tablet')} {
    font-size: 40px;
  }
`

export const SuccessTitle = styled.h2`
  color: ${({ theme }) => theme.color.gray};
  margin-top: 10px;
  font-size: 20px;
  font-weight: 700;

  ${mq('tablet')} {
    font-size: 24px;
  }
`

export const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.color.darkGray};
  font-size: 14px;
  line-height: 1.6;
  margin: 15px 0 25px 0;

  ${mq('tablet')} {
    font-size: 16px;
  }
`

export const SuccessButton = styled.button`
  margin-top: 3rem;
  padding: 15px 25px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  transition: all 0.2s ease-in-out;
  border: 0;
  box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:hover {
    color: ${({ theme }) => theme.color.white};
    box-shadow: none;
  }

  ${mq('tablet')} {
    width: 200px;
    font-size: 14px;
    padding: 22px 36px 20px;
  }
`
