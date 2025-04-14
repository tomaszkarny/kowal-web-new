import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Link } from 'components/common/Link/Link'
import { ButtonStyles } from 'components/Home/Hero/Hero.styles'

import {
  MainDescription,
  HighlightedText,
  CtaButton,
  ContentWrapper
} from '../../SectionMain.styles'

export const SectionContent = () => {
  const { t } = useTranslation('common')

  return (
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
  )
}