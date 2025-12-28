import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { SectionTitle } from 'components/common/SectionTitle/SectionTitle'
import { SectionDescription } from 'components/common/SectionDescription/SectionDescription'
import { css } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalfAlt, faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import {
  TestimonialsContainer,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialCompany,
  TestimonialRating
} from './About.styles'

// Sample testimonial data - this would ideally come from a CMS or translation file
const testimonials = [
  {
    quote: 'Pracownia Kowalstwa Artystycznego Tadeusza Karny wykonała dla nas piękną bramę wjazdową. Jakość wykonania przewyższyła nasze oczekiwania.',
    author: 'Adam Kołodziej',
    company: 'Właściciel posesji w Białymstoku',
    rating: 5,
    translationKey: 'testimonials_adamKolodziej'
  },
  {
    quote: 'Współpraca z Panem Tadeuszem to czysta przyjemność. Profesjonalne podejście i dbałość o każdy detal. Polecam!',
    author: 'Maja Kowalczyk',
    company: 'Architekt wnętrz',
    rating: 4.5,
    translationKey: 'testimonials_majaKowalczyk'
  },
  {
    quote: 'Zamówiliśmy balustrady do naszego biura. Efekt jest zachwycający, a realizacja przebiegła sprawnie i terminowo.',
    author: 'Tomasz Borkowski',
    company: 'Kierownik Działu Technicznego, Przedsiębiorstwo Budowlane Podlasie',
    rating: 5,
    translationKey: 'testimonials_tomaszBorkowski'
  }
]

export function AboutTestimonials() {
  const { t } = useTranslation('about')

  return (
    <TestimonialsContainer
      css={css`
        animation: ${fadeIn} 1.2s cubic-bezier(0.4,0,0.2,1);
      `}
    >
      <SectionTitle>
        {t('testimonialsTitle', 'Opinie Klientów')}
      </SectionTitle>
      <SectionDescription>
        {t('testimonialsDescription', 'Poznaj opinie naszych klientów na temat współpracy z nami i jakości naszych usług.')}
      </SectionDescription>

      <TestimonialsGrid>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index}>
            <FontAwesomeIcon
              icon={faQuoteLeft}
              size="2x"
              style={{
                color: 'rgba(232, 92, 65, 0.2)',
                position: 'absolute',
                top: '20px',
                left: '20px'
              }}
            />
            <TestimonialQuote>
              {t(testimonial.translationKey, testimonial.quote)}
            </TestimonialQuote>
            <TestimonialRating>
              {Array.from({ length: Math.floor(testimonial.rating) }).map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
              {testimonial.rating % 1 !== 0 && (
                <FontAwesomeIcon icon={faStarHalfAlt} />
              )}
            </TestimonialRating>
            <TestimonialAuthor>
              {t(`${testimonial.translationKey}_author`, testimonial.author)}
            </TestimonialAuthor>
            <TestimonialCompany>
              {t(`${testimonial.translationKey}_company`, testimonial.company)}
            </TestimonialCompany>
          </TestimonialCard>
        ))}
      </TestimonialsGrid>
    </TestimonialsContainer>
  )
}
