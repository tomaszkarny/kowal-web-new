import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'

export const SectionHeader = () => {
  const { t } = useTranslation('common')
  
  return (
    <SectionTitle main>
      {t('specialties_title', 'Specjalizujemy się w wykonywaniu:')}
    </SectionTitle>
  )
}