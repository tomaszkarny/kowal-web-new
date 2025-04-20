import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { CraftSection, CraftContent, CraftFeatures, CraftFeatureItem, CraftFeatureIcon, CraftFeatureText, CraftVideo, CraftMediaContainer, CenteredTitle } from './About.styles'
import heatVideo from 'src/assets/video/RedToWhiteHeat.mp4'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { css } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHammer, faFire, faGem, faHistory } from '@fortawesome/free-solid-svg-icons'

export const AboutCraft = () => {
    const { t } = useTranslation('about')

    const features = [
        { icon: faHammer, text: 'Ręczne wykuwanie każdego elementu', translationKey: 'craft_handForged' },
        { icon: faFire, text: 'Tradycyjne techniki kowalskie', translationKey: 'craft_traditional' },
        { icon: faGem, text: 'Dbałość o każdy detal', translationKey: 'craft_detail' },
        { icon: faHistory, text: 'Wieloletnie doświadczenie', translationKey: 'craft_experience' }
    ];

    return (
        <CraftSection
            css={css`
                animation: ${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1);
            `}
        >
            <CenteredTitle>
                <SectionTitle>{t('craftTitle', 'Nasze Rzemiosło')}</SectionTitle>
            </CenteredTitle>
            <CraftContent>
                <SectionDescription>
                    {t('craftDescription', 'Kowalstwo artystyczne to połączenie tradycji, siły i kreatywności. Każdy element jest ręcznie kuty, formowany w ogniu i wykańczany z dbałością o detale. Używamy sprawdzonych technik, aby tworzyć unikalne bramy, balustrady i elementy dekoracyjne, które przetrwają próbę czasu.')}
                </SectionDescription>
            </CraftContent>

            <CraftMediaContainer>
                <CraftVideo
                    src={heatVideo}
                    alt={t('craftImageAlt', 'Artistic blacksmithing process')}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
            </CraftMediaContainer>
            
            <CraftFeatures>
                {features.map((feature, index) => (
                    <CraftFeatureItem key={index}>
                        <CraftFeatureIcon>
                            <FontAwesomeIcon icon={feature.icon} />
                        </CraftFeatureIcon>
                        <CraftFeatureText>{t(feature.translationKey, feature.text)}</CraftFeatureText>
                    </CraftFeatureItem>
                ))}
            </CraftFeatures>
        </CraftSection>
    );
}
