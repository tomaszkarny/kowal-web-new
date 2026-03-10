import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { THEME } from 'consts/theme'

export const CategoryPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    padding: 3rem 2rem;
  }
`

export const CategoryHeading = styled.h1`
  font-size: 1.8rem;
  color: ${THEME.color.darkBlue};
  margin-bottom: 1.25rem;
  text-align: center;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    font-size: 2.25rem;
  }
`

export const CategoryIntro = styled.p`
  max-width: 850px;
  margin: 0 auto 1.5rem;
  line-height: 1.8;
  font-family: 'PT Sans', 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  color: #333;
  font-size: 1.05rem;
  padding: 0 0.5rem;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    font-size: 1.2rem;
  }
`

export const ImageCountBadge = styled.span`
  display: inline-block;
  background: ${THEME.color.primary};
  color: ${THEME.color.white};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`

export const ImageCountWrapper = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

export const CTASection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;
  margin-bottom: 2rem;
`

export const CTALink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:first-of-type {
    background: ${THEME.color.primary};
    color: ${THEME.color.white};

    &:hover {
      background: ${THEME.color.primaryHover};
    }
  }

  &:last-of-type {
    background: transparent;
    color: ${THEME.color.primary};
    border: 2px solid ${THEME.color.primary};

    &:hover {
      background: ${THEME.color.primary};
      color: ${THEME.color.white};
    }
  }
`

export const FAQSection = styled.section`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${THEME.color.lightGray};
`

export const FAQHeading = styled.h2`
  font-size: 1.5rem;
  color: ${THEME.color.darkBlue};
  margin-bottom: 1.5rem;
  text-align: center;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    font-size: 1.75rem;
  }
`

export const FAQItem = styled.div`
  margin-bottom: 1.25rem;
  padding: 1rem 1.25rem;
  background: ${THEME.color.light};
  border-radius: 4px;
  border-left: 4px solid ${THEME.color.primary};
`

export const FAQQuestion = styled.h3`
  font-size: 1rem;
  color: ${THEME.color.darkBlue};
  margin-bottom: 0.5rem;

  @media (min-width: ${THEME.breakpoints.tablet}px) {
    font-size: 1.1rem;
  }
`

export const FAQAnswer = styled.p`
  font-size: 0.95rem;
  color: ${THEME.color.darkGray};
  line-height: 1.7;
  margin: 0;
`
