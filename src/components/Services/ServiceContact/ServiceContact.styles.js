/**
 * ServiceContact Styles
 * Contact section for service pages
 */

import styled from '@emotion/styled'
import {
  FORGE_COLORS,
  FORGE_MEDIA,
  FORGE_SPACING,
  FORGE_TYPOGRAPHY,
} from '../../Cities/styles/forgedIronTheme'

export const ContactContent = styled.div`
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`

export const ContactText = styled.p`
  font-size: 1.15rem;
  color: ${FORGE_COLORS.textSecondary};
  line-height: 1.7;
  margin-bottom: ${FORGE_SPACING.md};

  ${FORGE_MEDIA.tablet} {
    font-size: 1rem;
  }
`

export const PhoneNumber = styled.p`
  font-size: 2rem;
  color: ${FORGE_COLORS.ember};
  font-weight: bold;
  margin: ${FORGE_SPACING.xl} 0;
  font-family: ${FORGE_TYPOGRAPHY.heading};

  ${FORGE_MEDIA.tablet} {
    font-size: 1.6rem;
  }
`

export const PhoneIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${FORGE_SPACING.sm};
  color: ${FORGE_COLORS.ember};

  svg {
    width: 28px;
    height: 28px;
  }
`

export const ContactActions = styled.div`
  margin-top: ${FORGE_SPACING.xl};
`
