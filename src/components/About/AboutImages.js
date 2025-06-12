import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { Image } from 'components/common/Image/Image'
import { css } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { ImagesContainer, ImageFrame, ImageCaption, PlaceholderImage, ImagesTitle, ImagesDescription } from './About.styles'

export function AboutImages() {
    const { t } = useTranslation('about')
    const { image, imageSecond } = useStaticQuery(graphql`
        query AboutImagesQuery {
            image: file(relativePath: { eq: "zjd24.png" }) {
                childImageSharp {
                    gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
            }
            imageSecond: file(relativePath: { eq: "anvil_2.webp" }) {
                childImageSharp {
                    gatsbyImageData(width: 1920, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
            }
        }
    `)

    const mainImage = image?.childImageSharp ? getImage(image.childImageSharp) : null
    const secondImage = imageSecond?.childImageSharp ? getImage(imageSecond.childImageSharp) : null

    return (
        <ImagesContainer
            css={css`
                animation: ${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1);
            `}
        >
            <ImagesTitle>
                {t('galleryTitle', 'Nasza Pracownia')}
            </ImagesTitle>
            <ImagesDescription>
                {t('galleryDescription', 'Poznaj miejsce, w którym powstają nasze wyjątkowe wyroby kowalstwa artystycznego.')}
            </ImagesDescription>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', alignItems: 'center' }}>
                <ImageFrame>
                    <Image image={mainImage} alt={t('mainImageAlt', 'Workshop owner')} small />
                    <ImageCaption>{t('ownerCaption', 'Owner: Tadeusz Karny')}</ImageCaption>
                </ImageFrame>
                <ImageFrame>
                    {secondImage ? (
                        <Image
                            image={secondImage}
                            alt={t('secondImageAlt', 'Blacksmith anvil')}
                            style={{
                                maxWidth: '700px',
                                width: '100%',
                                height: 'auto',
                                borderRadius: '14px',
                                transition: 'transform 0.3s ease-in-out',
                            }}
                        />
                    ) : (
                        <PlaceholderImage
                            src="https://placehold.co/700x400/cccccc/222?text=Workshop+Photo"
                            alt="Workshop placeholder"
                        />
                    )}
                    <ImageCaption>{t('workshopCaption', 'Workshop & Tools')}</ImageCaption>
                </ImageFrame>
            </div>
        </ImagesContainer>
    )
}
