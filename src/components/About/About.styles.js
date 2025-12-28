import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { fadeIn } from 'components/common/animations/animations'

import { mq } from 'utils/mediaQueries'

export const HeroContainer = styled.section`
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  min-height: 440px;
  max-height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  animation: ${fadeIn} 1.1s cubic-bezier(0.4,0,0.2,1);

  @media (max-width: 600px) {
    min-height: 320px;
    max-height: 420px;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* overlay should never intercept clicks */
  /* Mobile‑first: vertical gradient for narrow screens */
  background: linear-gradient(180deg, rgba(30,30,40,0.85) 35%, rgba(60,60,90,0.78) 100%);
  z-index: 1;

  /* ≥576 px: restore original angled gradient */
  ${mq('small')} {
    background: linear-gradient(120deg, rgba(30,30,40,0.82) 60%, rgba(60,60,90,0.7) 100%);
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem 2rem 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: ${fadeIn} 1.5s cubic-bezier(0.4,0,0.2,1);

  @media (max-width: 600px) {
    padding: 2rem 1rem 1.5rem 1rem;
  }
`;

export const HeroTitle = styled.h2`
  color: #fff;
  text-shadow: 0 2px 16px rgba(0,0,0,0.25);
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
  line-height: 1.15;

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

export const HeroDescription = styled.p`
  color: #f3f3f3;
  font-weight: 500;
  text-shadow: 0 1px 8px rgba(0,0,0,0.18);
  font-size: 1.18rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  letter-spacing: 0.01em;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

export const HeroScrollIndicator = styled.div`
  width: 30px;
  height: 50px;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  position: relative;
  margin-top: 1rem;

  &:before {
    content: '';
    position: absolute;
    width: 6px;
    height: 6px;
    background: white;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    border-radius: 50%;
    animation: ${bounce} 2s infinite;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const IntroContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto 2rem auto;
  padding: 2rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  ${mq('medium')} {
    padding: 3rem 2rem 0 2rem;
    max-width: 1000px;
  }
`;

export const LocationsTitle = styled.h2`
  color: #e85c41;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  ${mq('medium')} {
    font-size: 2.2rem;
  }
`;

export const LocationsContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 2rem auto;
  padding: 1.5rem 1rem 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mq('medium')} {
    padding: 2rem 2rem 0 2rem;
    max-width: 900px;
  }
`;

export const SectionDivider = styled.hr`
  width: 80%;
  border: none;
  height: 2px;
  background: linear-gradient(to right, rgba(232, 92, 65, 0.1), rgba(232, 92, 65, 0.5), rgba(232, 92, 65, 0.1));
  margin: 3.5rem auto 3.5rem auto;
  opacity: 0.7;
  border-radius: 2px;
`;

export const SectionWave = styled.div`
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 60px;
  min-height: 40px;
  max-height: 80px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  background: none;
  filter: drop-shadow(0 -5px 5px rgba(60, 60, 90, 0.05));

  svg {
    display: block;
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }

  &:hover svg {
    transform: scale(1.02);
  }

  ${mq('medium')} {
    height: 80px;
    max-height: 100px;
  }
`;

export const ImagesTitle = styled.h2`
  color: #e85c41;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;

  ${mq('medium')} {
    font-size: 2.2rem;
  }
`;

export const ImagesDescription = styled.p`
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.6;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2rem auto;

  ${mq('medium')} {
    font-size: 1.2rem;
  }
`;

export const ImagesContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 2rem auto 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: linear-gradient(135deg, #f8fafc 60%, #e3e6f3 100%);
  border-radius: 18px;
  box-shadow: 0 4px 24px 0 rgba(60, 60, 90, 0.07);
  padding: 2.5rem 1.5rem;

  ${mq('medium')} {
    padding: 3rem 2rem;
  }
`;

export const ImageFrame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 90, 0.08);
  padding: 1.2rem 1rem 0.7rem 1rem;
  margin-bottom: 0.5rem;
  max-width: 700px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px 0 rgba(60, 60, 90, 0.12);
  }

  ${mq('medium')} {
    padding: 1.5rem 1.2rem 1rem 1.2rem;
  }
`;

export const ImageCaption = styled.div`
  margin-top: 0.7rem;
  font-size: 1.08rem;
  color: #e85c41;
  font-weight: 600;
  text-align: center;
  letter-spacing: 0.01em;
  opacity: 0.92;
`;

export const PlaceholderImage = styled.img`
  max-width: 700px;
  width: 100%;
  height: auto;
  border-radius: 14px;
  background: #e3e6f3;
  object-fit: cover;
`;

export const LocationsPanel = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 2rem auto 0;
  padding: 2rem 1.5rem;
  background: linear-gradient(135deg, #f8fafc 60%, #e3e6f3 100%);
  border-radius: 16px;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 90, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 32px 0 rgba(60, 60, 90, 0.13);
    transform: translateY(-5px);
  }

  ${mq('medium')} {
    padding: 2.5rem 2.5rem;
    max-width: 800px;
  }
`;

export const AboutCTAButton = styled.a`
  display: inline-block;
  margin: 2.5rem auto 0 auto;
  padding: 0.95rem 2.2rem;
  font-size: 1.18rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(100deg, #e85c41 0%, #ff6b4a 100%);
  border: none;
  border-radius: 32px;
  box-shadow: 0 2px 16px 0 rgba(232, 92, 65, 0.20);
  text-decoration: none;
  text-align: center;
  letter-spacing: 0.02em;
  transition: background 0.2s, box-shadow 0.2s, transform 0.13s;
  cursor: pointer;

  &:hover, &:focus {
    background: linear-gradient(100deg, #c94a33 0%, #e85c41 100%);
    box-shadow: 0 4px 32px 0 rgba(232, 92, 65, 0.30);
    transform: translateY(-2px) scale(1.03);
    color: #fff;
    outline: none;
  }
`;

export const TeamSection = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 3.5rem auto 3.5rem auto;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  background: linear-gradient(120deg, #f7fafd 60%, #e3e6f3 100%);
  border-radius: 22px;
  box-shadow: 0 4px 32px 0 rgba(60, 60, 90, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TeamGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.2rem;
  margin-top: 2.5rem;

  ${mq('medium')} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
`;

export const TeamCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 90, 0.10);
  padding: 2rem 1.2rem 1.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.18s, transform 0.13s;

  &:hover {
    box-shadow: 0 6px 32px 0 rgba(60, 60, 90, 0.16);
    transform: translateY(-4px) scale(1.04);
  }
`;

export const TeamPhoto = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.1rem;
  border: 4px solid #e3e6f3;
  background: #f8fafc;
`;

export const TeamName = styled.div`
  font-size: 1.18rem;
  font-weight: 700;
  color: #2d2d44;
  margin-bottom: 0.3rem;
`;

export const TeamRole = styled.div`
  font-size: 1rem;
  color: #ff6b4a;
  font-weight: 500;
  letter-spacing: 0.01em;
`;

export const CraftSection = styled.section`
  width: 100%;
  max-width: 1050px;
  margin: 3rem auto 3rem auto;
  padding: 2.5rem 1.5rem 2.5rem 1.5rem;
  background: linear-gradient(120deg, #f5f7fa 60%, #e3e6f3 100%);
  border-radius: 20px;
  box-shadow: 0 4px 32px 0 rgba(60, 60, 90, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;                /* air between text & image */

  ${mq('medium')} {
    padding: 2.5rem;
  }
  ${mq('large')} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 3rem;
  }
`;

export const CraftContent = styled.div`
  flex: 1 1 300px;           /* can grow/shrink – basis 300px */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-bottom: 2rem;

  ${mq('medium')} {
    align-items: center;
    text-align: center;
  }
  ${mq('large')} {
    max-width: 520px;
    margin-bottom: 0;
    align-items: center;
    text-align: center;
  }
`;

export const CraftFeatures = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin-top: 3rem;
  width: 100%;
  max-width: 1000px;

  ${mq('xsmall')} {
    grid-template-columns: 1fr;
  }

  ${mq('small')} {
    grid-template-columns: repeat(2, 1fr);
  }
  
  ${mq('medium')} {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

export const CraftFeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(60, 60, 90, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(60, 60, 90, 0.1);
  }
`;

export const CraftFeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e85c41 0%, #ff6b4a 100%);
  color: white;
  border-radius: 50%;
  font-size: 1.2rem;
`;

export const CraftFeatureText = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
`;

export const CraftVideo = styled.video`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 90, 0.10);
  object-fit: cover;
  background: #e3e6f3;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px 0 rgba(60, 60, 90, 0.15);
  }
`;

export const CraftMediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1 1 260px;
  min-width: 260px;
  max-width: 450px;
`;

export const CenteredTitle = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const CraftImage = styled.img`
  flex: 1 1 260px;   /* participates in flexbox math */
  min-width: 260px;  /* never smaller than this       */
  max-width: 450px;  /* cap at desktop                */

  width: 100%;       /* keep the img responsive       */
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 90, 0.10);
  object-fit: cover;
  background: #e3e6f3;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 8px 30px 0 rgba(60, 60, 90, 0.15);
  }

  ${mq('medium')} {
    max-width: 450px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding-top: 20px; */
  width: 100%;
  justify-content: center;
  // ${mq('medium')} {
  //   flex-direction: row;
  // }
`

export const LinkWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 450px;
  align-items: center;
  align-self: center;
  margin: 0 auto 2rem auto;

  ${mq('small')} {
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
  }

  ${mq('tablet')} {
    gap: 2rem;
  }

  a {
    min-width: 160px;
    justify-content: center;
  }
`

// Testimonials component styles
export const TestimonialsContainer = styled.section`
  width: 100%;
  max-width: 1100px;
  margin: 3rem auto 3rem auto;
  padding: 2.5rem 1.5rem;
  background: linear-gradient(120deg, #f7fafd 60%, #e3e6f3 100%);
  border-radius: 22px;
  box-shadow: 0 4px 32px 0 rgba(60, 60, 90, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TestimonialsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2.5rem;

  ${mq('medium')} {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`

export const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px 0 rgba(60, 60, 90, 0.10);
  padding: 2.5rem 1.5rem 1.8rem 1.5rem;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: box-shadow 0.18s, transform 0.13s;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #e85c41 0%, #ff6b4a 100%);
  }

  &:hover {
    box-shadow: 0 6px 32px 0 rgba(60, 60, 90, 0.16);
    transform: translateY(-4px);
  }
`

export const TestimonialQuote = styled.div`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;
  z-index: 1;
`

export const TestimonialRating = styled.div`
  margin-top: auto;
  margin-bottom: 1rem;
  color: #f0b041;
  font-size: 1.1rem;
  display: flex;
  gap: 0.3rem;
`

export const TestimonialAuthor = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: #e85c41;
  margin-bottom: 0.2rem;
`

export const TestimonialCompany = styled.div`
  font-size: 0.9rem;
  color: #ff6b4a;
  font-weight: 500;
`


