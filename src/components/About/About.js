import React from 'react'
import { Image } from 'components/common/Image/Image'

import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'

import { DataAbout } from 'components/About/DataAbout'
import { ListItem } from 'components/common/ListItem/ListItem'
import { StyledUl } from 'components/common/ListItem/ListItem.styles'
import { Wrapper } from 'components/About/About.styles'
import { Link } from 'components/common/Link/Link'

import { StyledSection } from 'components/common/StyledSection/StyledSection'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'

export const About = () => {
  const { image, imageSecond } = useStaticQuery(graphql`
    query AboutQuery {
      image: file(relativePath: { eq: "zjd24.png" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }

      imageSecond: file(relativePath: { eq: "anvil.jpg" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP])
        }
      }
    }
  `)
  
  // Create the image objects for Gatsby Image
  const mainImage = image?.childImageSharp ? getImage(image.childImageSharp) : null
  const secondImage = imageSecond?.childImageSharp ? getImage(imageSecond.childImageSharp) : null

  return (
    <StyledSection>
      <SectionTitle main>
        Pracownia Kowalstwa Artystycznego Tadeusza Karny
      </SectionTitle>
      <Wrapper>
        <Image image={mainImage} alt="old-person" small />
        <SectionDescription main>
          Pracownia Kowalstwa Artystycznego Tadeusza Karny powstała w 1993 roku.
          Właściciel pracowni zdobył bogate doświadczenie podczas zatrudnienia w
          Pracowni Konserwacji Zabytków w Białymstoku, dzięki temu posiada
          uprawnienia konserwatorskie, oraz wszechstronne kwalifikacje, które
          obecnie wykorzystuje prowadząc własną działalność. Nasze wyroby
          znajdują się między innymi w:
          <StyledUl>
            {DataAbout.map(data => (
              <ListItem data={data} key={data.id} />
            ))}
          </StyledUl>
        </SectionDescription>
      </Wrapper>

      <Image
        image={secondImage}
        alt="fire"
        style={{ width: '700px' }}
      />

      <Link to="/contact/" primary text="Skontaktuj się z nami" />
    </StyledSection>
  )
}
