import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { Link } from 'components/common/Link/Link'
import { InteractiveSpecialties } from './InteractiveSpecialties'

import {
  SpecializationWrapper,
  SectionConnector,
  MainDescription,
  CtaButton
} from 'components/Home/Hero/SectionMain/SectionMain.styles'

export const SectionMain = ({ id }) => {
  const { t } = useTranslation('common')
  
  return (
    <SpecializationWrapper id={id}>
      <SectionTitle main>
        {t('specialties_title', 'Specjalizujemy się w wykonywaniu:')}
      </SectionTitle>
      
      <InteractiveSpecialties />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <MainDescription>
          <p>
            {t('specialties_description1', 'Oferta obejmuje szeroką gamę kolorów (na życzenie klienta np: stare złoto, srebro itp.) Wszystkie wyroby zabezpieczone są antykorozyjnie (malowanie, ocynk).')}
          </p>
          <p>
            {t('specialties_description2', 'Realizujemy prace według projektów własnych jak i powierzonych.')}
          </p>
          <p>
            {t('specialties_description3', 'Służymy fachowym doradztwem w zakresie projektowania, dekoracji.')}
          </p>
        </MainDescription>
        
        <CtaButton>
          <Link text={t('gallery')} to="/gallery/" />
        </CtaButton>
      </div>
    </SpecializationWrapper>
  )
}
