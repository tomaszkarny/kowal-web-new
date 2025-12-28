import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { fadeInScale } from 'components/common/animations/animations'
import { THEME } from 'consts/theme'

export const GalleryFilterContainer = styled.div`
  margin-bottom: 2rem;
  animation: ${fadeInScale} 0.6s ease-out forwards;

  @media (max-width: ${THEME.breakpoints.tablet}px) {
    margin-bottom: 1.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const GalleryHeading = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: ${THEME.color.darkBlue};
`

export const FilterLabel = styled.p`
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: ${THEME.color.darkGray};
`

export const FilterButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${THEME.breakpoints.small}px) {
    gap: 0.3rem;
    margin-bottom: 1rem;
  }
`

export const FilterButton = styled.button`
  background: ${props => props.active ? THEME.color.primary : THEME.color.light};
  color: ${props => props.active ? THEME.color.white : THEME.color.darkGray};
  border: 1px solid ${props => props.active ? THEME.color.primary : THEME.color.silver};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: center;
  min-width: 100px;
  white-space: normal;
  hyphens: auto;

  transition: background-color 0.3s ease,
              color 0.2s ease,
              border-color 0.2s ease,
              box-shadow 0.3s ease,
              transform 0.2s ease;

  ${props => props.active && css`
    transform: scale(1.05);
    box-shadow: 0 2px 10px rgba(232, 92, 65, 0.3);
  `}

  &:hover, &:focus {
    background: ${props => props.active ? THEME.color.primary : THEME.color.lightGray};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    outline: none;
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${THEME.color.primary};
    outline-offset: 2px;
    box-shadow: 0 0 0 4px rgba(232, 92, 65, 0.2);
  }

  @media (max-width: ${THEME.breakpoints.tablet}px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
    min-width: 90px;
  }

  @media (max-width: ${THEME.breakpoints.small}px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.8rem;
    min-width: 80px;
  }

  @media (prefers-reduced-motion: reduce) {
    transform: none !important;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`

export const SubcategoryFilterGroup = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${THEME.color.lightGray};
`

export const SubcategoryLabel = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: ${THEME.color.darkGray};
  font-style: italic;
`

export const SubcategoryButton = styled(FilterButton)`
  font-size: 0.85rem;
  padding: 0.4rem 0.8rem;
  background: ${THEME.color.lightGray};
  border-color: ${THEME.color.silver};
  min-width: 90px;

  &:hover, &:focus {
    background: ${THEME.color.silver};
    color: ${THEME.color.darkBlue};
  }

  @media (max-width: ${THEME.breakpoints.tablet}px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.7rem;
    min-width: 80px;
  }

  @media (max-width: ${THEME.breakpoints.small}px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
    min-width: 70px;
  }
`

export const EmptyStateMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: ${THEME.color.light};
  border-radius: 4px;
  color: ${THEME.color.darkGray};
  font-size: 1.1rem;
`
