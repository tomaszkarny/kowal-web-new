import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faProjectDiagram, faHammer } from '@fortawesome/free-solid-svg-icons'

import { useScrollReveal } from 'utils/hooks/useScrollReveal'
import { useCountUp } from 'utils/hooks/useCountUp'

import {
  StatsWrapper,
  StatItem,
  StatIcon,
  StatNumber,
  StatSuffix,
  StatLabel,
} from './StatsCounter.styles'

function StatCounter({ icon, end, suffix, label, delay, isVisible }) {
  const count = useCountUp({ end, duration: 2000, start: isVisible })

  return (
    <StatItem delay={delay}>
      <StatIcon>
        <FontAwesomeIcon icon={icon} />
      </StatIcon>
      <StatNumber>
        {count}
        <StatSuffix>{suffix}</StatSuffix>
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatItem>
  )
}

export function StatsCounter() {
  const { t } = useTranslation('common')
  const { ref, isVisible } = useScrollReveal({ threshold: 0.3 })

  const stats = [
    {
      icon: faClock,
      end: 30,
      suffix: '+',
      label: t('stats_years'),
      delay: 0,
    },
    {
      icon: faProjectDiagram,
      end: 500,
      suffix: '+',
      label: t('stats_projects'),
      delay: 0.15,
    },
    {
      icon: faHammer,
      end: 100,
      suffix: '%',
      label: t('stats_handmade'),
      delay: 0.3,
    },
  ]

  return (
    <StatsWrapper ref={ref} isVisible={isVisible}>
      {stats.map((stat) => (
        <StatCounter
          key={stat.label}
          icon={stat.icon}
          end={stat.end}
          suffix={stat.suffix}
          label={stat.label}
          delay={stat.delay}
          isVisible={isVisible}
        />
      ))}
    </StatsWrapper>
  )
}
