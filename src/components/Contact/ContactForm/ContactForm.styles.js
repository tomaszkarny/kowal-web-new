import styled from '@emotion/styled'

import { mq } from 'utils/mediaQueries'

export const FormWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color.main};
  ${mq('tablet')} {
    padding: 5rem;
  }
`

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const Label = styled.label`
  font-size: 16px;
  margin: 15px 0;
  font-weight: 700;

  ${mq('tablet')} {
    font-size: 20px;
  }
`

export const Input = styled.input`
  width: 100%;
  height: ${({ isTextarea }) => (isTextarea ? '150px' : '40px')};
  padding: 15px;
  border: 2px solid ${({ theme }) => theme.color.silver};
  border-radius: 10px;
  color: ${({ theme }) => theme.color.gray};
  background-color: ${({ theme }) => theme.color.white}};
  transition: all 0.3s ease-in-out;
  font-size: 14px;
  outline: none;
  border-color: ${({ theme }) => theme.color.silver};
  &:hover,
  &:focus {
    border-color: ${({ theme }) => theme.color.primary};
  }

  ${mq('large')} {
    font-size: 16px;
    height: ${({ isTextarea }) => (isTextarea ? '200px' : '50px')};
    padding: 20px;
    width: 100%;
  }
`

export const Button = styled.button`
  margin-top: 3rem;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  overflow: visible;
  -webkit-appearance: button;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  border: 0;
  box-shadow: 0 7px 16px 0 rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.color.white};
  cursor: pointer;
  font-weight: 700;
  letter-spacing: 2px;
  line-height: 1;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: normal;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 10px;
  display: inline-block;
  font-size: 1em;
  width: auto;
  padding: 22px 36px 20px;
  margin-left: 0px;
  margin-right: 0px;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    outline-offset: '3px';
    box-shadow: none;
  }
  ${mq('tablet')} {
    align-self: center;
    width: 200px;
    font-size: 14px;
  }
`
