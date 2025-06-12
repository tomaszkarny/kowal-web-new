import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { ListItem } from 'components/common/ListItem/ListItem'
import { StyledUl } from 'components/common/ListItem/ListItem.styles'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { css } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'
import { LocationsContainer, LocationsPanel, LocationsTitle } from './About.styles'
import { DataAbout } from './DataAbout'

export function AboutLocations() {
    const { t } = useTranslation('about')
    return (
        <LocationsContainer>
            <LocationsTitle>
                {t('locationsTitle', 'Nasze Realizacje')}
            </LocationsTitle>
            <SectionDescription>
                {t('locationsDescription', 'Nasze prace można podziwiać w wielu prestiżowych miejscach w całej Polsce.')}
            </SectionDescription>

            <LocationsPanel
                css={css`
                    animation: ${fadeIn} 1.3s cubic-bezier(0.4,0,0.2,1);
                `}
            >
                <SectionDescription main>
                    {t('ourWorks', 'Nasze wyroby znajdują się między innymi w:')}
                </SectionDescription>
                <StyledUl>
                    {DataAbout.map(data => (
                        <ListItem data={data} key={data.id} />
                    ))}
                </StyledUl>
            </LocationsPanel>
        </LocationsContainer>
    )
}
