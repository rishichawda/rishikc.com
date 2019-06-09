import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import niceImage from 'assets/1456505540091.png'
import nicelyCompressedImage from 'assets/1456505540091.webp'

const AboutSection = styled.div`
  ${tw`flex xs:flex-col md:flex-col lg:flex-row justify-between items-center`}
`
const NiceImage = styled.img`
  ${tw`rounded-full h-48 w-auto`}
`

const AboutText = styled.div`
  ${tw`flex flex-col xs:w-full lg:w-5/12 mx-8 text-left`}
`

const Header = styled.h4`
  ${tw`text-left xs:text-center lg:text-left`}
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 2.5em;
  font-weight: 400;
  margin: auto;
  margin-bottom: 2em;
  text-transform: uppercase;
`

const ContentText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  color: #fff;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.5em;
`

const BottomText = styled(ContentText)`
  ${tw`mt-8`}
`

const Wrapper = styled.section`
  ${tw`w-5/6 mx-auto py-32`}
  min-height: fit-content;
  margin-top: 10em;
`

export default function About() {
  return (
    <Wrapper>
      <Header id="about-me">About me</Header>
      <AboutSection>
        <picture>
          <source srcSet={nicelyCompressedImage} type="image/webp" />
          <source srcSet={niceImage} type="image/png" />
          <NiceImage alt="rishikumarchawda" src={niceImage} />
        </picture>
        <AboutText role="main" aria-labelledby="about-me about-me">
          <ContentText>
            I'm a web and mobile apps developer. Born in the 90s', when tech had started becoming popular among young
            people, I spent most of my childhood playing video games. After graduating high school, I enrolled for a
            Bachelors' in Computer Science. Fell in love with programming during that time. Since then, I've been
            programming in different languages.
          </ContentText>
          <ContentText>
            I design and develop websites, progressive web applications and hybrid mobile applications for Android and
            iOS. I also like working on search engine optimisation, analytics and online marketing.
          </ContentText>
        </AboutText>
      </AboutSection>
      <BottomText>
        Apart from enjoying good food, traveling, music and art - I also write articles, stalk nature with my camera and
        occasionally sketch weird things.
      </BottomText>
    </Wrapper>
  )
}
