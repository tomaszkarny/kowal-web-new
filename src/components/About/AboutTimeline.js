import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { css, keyframes } from '@emotion/react'
import { TimelineContainer, TimelineWrapper, TimelineItem, TimelineYear, TimelineContent, TimelineDot, TimelineLine } from './About.styles'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px);}
  to { opacity: 1; transform: none;}
`

// Timeline data - this would ideally come from a CMS or translation file
const timelineData = [
  {
    year: '1993',
    content: 'Założenie Pracowni Kowalstwa Artystycznego Tadeusza Karny',
    translationKey: 'timeline_founding'
  },
  {
    year: '1995',
    content: 'Pierwsze duże zlecenie - bramy do Pałacyku Hasbacha',
    translationKey: 'timeline_firstProject'
  },
  {
    year: '2000',
    content: 'Rozszerzenie działalności o konserwację zabytków',
    translationKey: 'timeline_expansion'
  },
  {
    year: '2010',
    content: 'Otwarcie nowej, większej pracowni',
    translationKey: 'timeline_newWorkshop'
  },
  {
    year: '2020',
    content: 'Wprowadzenie nowoczesnych technik przy zachowaniu tradycyjnego rzemiosła',
    translationKey: 'timeline_modernTechniques'
  }
]

export const AboutTimeline = () => {
  const { t } = useTranslation('about')

  return (
    <TimelineContainer
      css={css`
        animation: ${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1);
      `}
    >
      <SectionTitle>
        {t('timelineTitle', 'Nasza Historia')}
      </SectionTitle>
      <SectionDescription>
        {t('timelineDescription', 'Poznaj historię naszej pracowni i najważniejsze momenty w jej rozwoju.')}
      </SectionDescription>

      <TimelineWrapper>
        {timelineData.map((item, index) => (
          <TimelineItem key={item.year} isLast={index === timelineData.length - 1}>
            <TimelineYear>{item.year}</TimelineYear>
            <TimelineDot />
            {index !== timelineData.length - 1 && <TimelineLine />}
            <TimelineContent>
              {t(item.translationKey, item.content)}
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  )
}
