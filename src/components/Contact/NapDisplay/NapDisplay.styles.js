import styled from '@emotion/styled'

/**
 * Styled container for NAP display component
 */
export const StyledNapDisplay = styled.div`
  margin: 1.5rem 0;
  line-height: 1.6;
  
  a {
    color: ${({theme}) => theme.color?.primary || '#0066cc'};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({theme}) => theme.color?.secondary || '#333333'};
      text-decoration: underline;
    }
  }
`

/**
 * Styled header for business name
 */
export const BusinessName = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

/**
 * Styled container for the address information
 */
export const AddressContainer = styled.div`
  margin-bottom: 1rem;
`

/**
 * Styled container for contact information
 */
export const ContactInfoContainer = styled.div`
  margin-bottom: 1rem;
  
  strong {
    font-weight: 600;
  }
`

/**
 * Styled container for the business hours
 */
export const HoursContainer = styled.div`
  margin-top: 1.5rem;
`

/**
 * Styled list for displaying hours
 */
export const HoursList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0;
`

/**
 * Styled list item for hours
 */
export const HoursItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({theme}) => theme.color?.border || '#eeeeee'};
  }
`

/**
 * Styled day label
 */
export const DayLabel = styled.span`
  font-weight: 500;
  margin-right: 1.5rem;
`

/**
 * Styled hours label
 */
export const HoursLabel = styled.span`
  
`

/**
 * Styled section header
 */
export const SectionHeader = styled.h4`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`

/**
 * Styled social media links container
 */
export const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1.5rem;
`
