import React from 'react'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { css } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'
import { TeamSection, TeamGrid, TeamCard, TeamPhoto, TeamName, TeamRole } from './About.styles'

const team = [
    {
        name: 'Tadeusz Karny',
        role: 'Owner & Master Blacksmith',
        photo: 'https://placehold.co/160x160/3a4b7c/fff?text=TK'
    },
    {
        name: 'Anna Nowak',
        role: 'Designer',
        photo: 'https://placehold.co/160x160/6b8fd6/fff?text=AN'
    },
    {
        name: 'Jan Kowalski',
        role: 'Apprentice',
        photo: 'https://placehold.co/160x160/4e6bb3/fff?text=JK'
    }
]

export function AboutTeam() {
  return <TeamSection
        css={css`
      animation: ${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1);
    `}
    >
        <SectionTitle>Our Team</SectionTitle>
        <SectionDescription>
            Meet the people behind our craft. We combine tradition, creativity, and skill to deliver unique works of art in metal.
        </SectionDescription>
        <TeamGrid>
            {team.map(member => (
                <TeamCard key={member.name}>
                    <TeamPhoto src={member.photo} alt={member.name} />
                    <TeamName>{member.name}</TeamName>
                    <TeamRole>{member.role}</TeamRole>
                </TeamCard>
            ))}
        </TeamGrid>
    </TeamSection>
}
