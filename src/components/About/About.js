import React from 'react'
import { Image } from 'components/common/Image/Image'

import { graphql, useStaticQuery } from 'gatsby'

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
      image: file(relativePath: { eq: "zjd23.png" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      imageSecond: file(relativePath: { eq: "anvil.jpg" }) {
        sharp: childImageSharp {
          fluid(maxWidth: 1920) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <StyledSection>
      <SectionTitle main>
        Pracownia Kowalstwa Artystycznego Tadeusza Karny
      </SectionTitle>
      <Wrapper>
        <Image fluid={image.sharp.fluid} alt="old-person" small />
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
        fluid={imageSecond.sharp.fluid}
        alt="fire"
        style={{ width: '700px' }}
      />

      <Link to="/contact/" primary text="Skontaktuj się z nami" />
    </StyledSection>
  )
}
