import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { ListItemData } from 'components/Home/Hero/SectionMain/ListItemData'
import { ListItem } from 'components/common/ListItem/ListItem'

import { StyledUl } from 'components/common/ListItem/ListItem.styles'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { StyledSection } from 'components/common/StyledSection/StyledSection'

import { Link } from 'components/common/Link/Link'

export const SectionMain = ({ id }) => {
  const { t } = useTranslation('common')
  
  return (
  <StyledSection id={id}>
    <SectionTitle main>{t('specialties_title', 'Specjalizujemy się w wykonywaniu:')}</SectionTitle>
    <StyledUl>
      {ListItemData.map(data => (
        <ListItem data={data} key={data.id} />
      ))}
    </StyledUl>

    <SectionDescription main>
      {t('specialties_description1', 'Oferta obejmuje szeroką gamę kolorów (na życzenie klienta np: stare złoto, srebro itp.) Wszystkie wyroby zabezpieczone są antykorozyjnie (malowanie, ocynk).')}
      <br />
      {t('specialties_description2', 'Realizujemy prace według projektów własnych jak i powierzonych.')}
      <br />
      {t('specialties_description3', 'Służymy fachowym doradztwem w zakresie projektowania, dekoracji.')}
    </SectionDescription>
    <Link text={t('gallery')} to="/gallery/" main />
  </StyledSection>
  )
}
