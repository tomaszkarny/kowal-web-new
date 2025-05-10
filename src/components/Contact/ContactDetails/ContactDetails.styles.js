import styled from '@emotion/styled'

/**
 * Styled container for the NAP display component on the contact page
 */
export const ContactNapContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
  max-width: 600px;
  
  /* Styled differently than the footer NAP display for better visibility on light background */
  a {
    color: ${({ theme }) => theme.color.primary || '#0066cc'};
    font-weight: 500;
  }
  
  /* Add some space between sections */
  > div > div {
    margin-bottom: 1.5rem;
  }
  
  /* Style hours list for better readability */
  ul {
    margin-top: 0.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  /* Enhance business name display */
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.color.secondary || '#333333'};
  }
  
  /* Better icon visibility */
  svg {
    color: ${({ theme }) => theme.color.primary || '#0066cc'};
  }
`
