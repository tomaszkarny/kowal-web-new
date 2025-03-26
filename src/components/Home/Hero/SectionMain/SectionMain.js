import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'

import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { Link } from 'components/common/Link/Link'
import { InteractiveSpecialties } from './InteractiveSpecialties'
import { ButtonStyles } from 'components/Home/Hero/Hero.styles'

import {
  SpecializationWrapper,
  SectionConnector,
  MainDescription,
  HighlightedText,
  CtaButton,
  ContentWrapper
} from 'components/Home/Hero/SectionMain/SectionMain.styles'

export const SectionMain = ({ id }) => {
  const { t } = useTranslation('common')
  
  return (
    <SpecializationWrapper id={id}>
      <SectionTitle main>
        {t('specialties_title', 'Specjalizujemy się w wykonywaniu:')}
      </SectionTitle>
      
      <InteractiveSpecialties />

      <ContentWrapper>
        <MainDescription>
          <p>
            <HighlightedText>{t('color_palette')}</HighlightedText>
            {t('color_list')} 
            <HighlightedText>{t('protection')}</HighlightedText>.
          </p>
          <p>
            {t('project_intro')} <HighlightedText>{t('precision')}</HighlightedText>
            {t('project_types')}
          </p>
          <p>
            {t('consulting')}
          </p>
          <p>
            {t('experience_intro')} <HighlightedText>{t('experience_years')}</HighlightedText>
            {t('experience_guarantee')}
          </p>
        </MainDescription>
        
        <CtaButton>
          <Link 
            primary="primary"
            text={t('gallery', 'Zobacz nasze realizacje')} 
            to="/gallery/" 
            customStyles={ButtonStyles.primary}
          />
        </CtaButton>
      </ContentWrapper>
    </SpecializationWrapper>
  )
}
