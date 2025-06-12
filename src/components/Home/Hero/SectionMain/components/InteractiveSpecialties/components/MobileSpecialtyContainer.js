import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';
import { StyledIcon } from 'components/common/Icon/Icon.styles';
import { MobileSpecialtyContainer as Container } from '../styles/mobile.styles';
import { SectionHeading } from '../../../SectionMain.styles';
import { MobileSpecialtyItems } from './MobileSpecialtyItems';
import { MobileSpecialtyImageDisplay } from './MobileSpecialtyImageDisplay';
import { MobileProgressDots } from './MobileProgressDots';

export function MobileSpecialtyContainer({
  t,
  ListItemData,
  activeItem,
  handleItemChange,
  fadeOut,
  imageMap,
  labelMap,
  openLightbox
}) {
  return (
    <Container>
      <SectionHeading>
        <StyledIcon icon={faHammer} />
        {t('specialties_section_title', 'We specialize in making')}
      </SectionHeading>

      <MobileSpecialtyItems
        items={ListItemData}
        activeItem={activeItem}
        handleItemChange={handleItemChange}
        t={t}
      />

      <MobileSpecialtyImageDisplay
        fadeOut={fadeOut}
        activeItem={activeItem}
        imageMap={imageMap}
        labelMap={labelMap}
        openLightbox={openLightbox}
        handleItemChange={handleItemChange}
        t={t}
      />

      <MobileProgressDots
        items={ListItemData}
        activeItem={activeItem}
        handleItemChange={handleItemChange}
        t={t}
      />
    </Container>
  );
}
