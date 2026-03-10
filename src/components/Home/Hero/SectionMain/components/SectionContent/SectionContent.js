import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPalette,
  faDraftingCompass,
  faComments,
  faAward,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'components/common/Link/Link'
import { ButtonStyles } from 'components/Home/Hero/Hero.styles'
import { ScrollReveal } from 'components/common/animations/ScrollReveal'

import {
  HighlightedText,
  CtaButton,
  ContentWrapper
} from '../../SectionMain.styles'

import {
  CardGrid,
  Card,
  CardIcon,
  CardTitle,
  CardText,
} from './SectionContent.styles'

const CARDS = [
  { icon: faPalette, titleKey: 'card_title_colors' },
  { icon: faDraftingCompass, titleKey: 'card_title_precision' },
  { icon: faComments, titleKey: 'card_title_consulting' },
  { icon: faAward, titleKey: 'card_title_experience' },
]

const CARD_CONTENT_KEYS = [
  { textParts: [{ key: 'color_palette', highlighted: true }, { key: 'color_list' }, { key: 'protection', highlighted: true }] },
  { textParts: [{ key: 'project_intro' }, { key: 'precision', highlighted: true }, { key: 'project_types' }] },
  { textParts: [{ key: 'consulting' }] },
  { textParts: [{ key: 'experience_intro' }, { key: 'experience_years', highlighted: true }, { key: 'experience_guarantee' }] },
]

export function SectionContent() {
  const { t } = useTranslation('common')

  return (
    <ContentWrapper>
      <CardGrid>
        {CARDS.map((card, index) => (
          <ScrollReveal
            key={card.titleKey}
            variant="fadeUp"
            delay={index * 0.1}
          >
            <Card>
              <CardIcon>
                <FontAwesomeIcon icon={card.icon} />
              </CardIcon>
              <CardTitle>{t(card.titleKey)}</CardTitle>
              <CardText>
                {CARD_CONTENT_KEYS[index].textParts.map((part) =>
                  part.highlighted ? (
                    <HighlightedText key={part.key}>{t(part.key)}</HighlightedText>
                  ) : (
                    <React.Fragment key={part.key}>{t(part.key)}</React.Fragment>
                  )
                )}
              </CardText>
            </Card>
          </ScrollReveal>
        ))}
      </CardGrid>

      <ScrollReveal variant="fadeUp" delay={0.3}>
        <CtaButton>
          <Link
            primary="primary"
            text={t('gallery', 'Zobacz nasze realizacje')}
            to="/gallery/"
            customStyles={ButtonStyles.primary}
          />
        </CtaButton>
      </ScrollReveal>
    </ContentWrapper>
  )
}
