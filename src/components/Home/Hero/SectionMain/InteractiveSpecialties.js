import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { ListItemData } from './ListItemData'
import { StyledIcon } from 'components/common/Icon/Icon.styles'

import { 
  SpecialtyContainer,
  SpecialtyList,
  SpecialtyItem,
  SpecialtyImage,
  SpecialtyContent,
  ImageContainer
} from './InteractiveSpecialties.styles'

/**
 * Interactive specialties component that shows images on hover
 */
export const InteractiveSpecialties = () => {
  const [activeItem, setActiveItem] = useState(1) // Default to first item
  const { t } = useTranslation('common')

  // Using actual images from the gallery folder
  const data = useStaticQuery(graphql`
    query {
      gates: file(relativePath: { eq: "gallery/bramy1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      railings: file(relativePath: { eq: "gallery/balu1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      fences: file(relativePath: { eq: "gallery/ogrodz1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      gratings: file(relativePath: { eq: "gallery/elo5.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
      decorative: file(relativePath: { eq: "gallery/elo1.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 500, height: 400, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)

  // Map item IDs to images - replace placeholder.webp with actual images later
  const imageMap = {
    1: getImage(data.gates.childImageSharp),
    2: getImage(data.railings.childImageSharp),
    3: getImage(data.fences.childImageSharp),
    4: getImage(data.gratings.childImageSharp),
    5: getImage(data.decorative.childImageSharp),
  }

  // Custom label map for captions
  const labelMap = {
    1: t('specialties_items_gates', 'Gates (swing, sliding, wickets)'),
    2: t('specialties_items_railings', 'Railings (interior and exterior)'),
    3: t('specialties_items_fences', 'Fences'),
    4: t('specialties_items_gratings', 'Gratings'),
    5: t('specialties_items_decorative', 'Other decorative elements (candlesticks, furniture, etc.)'),
  }

  return (
    <SpecialtyContainer>
      <SpecialtyContent>
        <SpecialtyList>
          {ListItemData.map(item => (
            <SpecialtyItem 
              key={item.id}
              onMouseEnter={() => setActiveItem(item.id)}
              onClick={() => setActiveItem(item.id)}
              isActive={activeItem === item.id}
            >
              <StyledIcon
                icon={item.icon}
                fixedWidth={item.fixedWidth}
              />
              <span>{t(item.translationKey, item.text)}</span>
            </SpecialtyItem>
          ))}
        </SpecialtyList>
      </SpecialtyContent>
      
      <ImageContainer>
        <SpecialtyImage>
          <GatsbyImage 
            image={imageMap[activeItem]} 
            alt={labelMap[activeItem]} 
            className="specialty-image"
          />
          <div className="image-caption">{labelMap[activeItem]}</div>
        </SpecialtyImage>
      </ImageContainer>
    </SpecialtyContainer>
  )
}
