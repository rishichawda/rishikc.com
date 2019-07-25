import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import niceImage from 'assets/1456505540091.png'
import nicelyCompressedImage from 'assets/1456505540091.webp'

const AboutSection = styled.div`
  ${tw`flex flex-col justify-between items-center`}
`
const NiceImage = styled.img`
  ${tw`rounded-full w-auto mb-8`}
  height: 20rem;
`

const AboutText = styled.div`
  ${tw`flex flex-col xs:w-full lg:w-5/12 mx-8 text-left`}
  color: rgb(61, 61, 61);
  a {
    position: relative;
    ${tw`cursor-pointer`}
    font-size: 1.1rem;
    text-decoration: none;
    color: rgb(61, 61, 61);
    &::after {
      content: '';
      display: block;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20%;
      position: absolute;
      background: rgba(62, 78, 136, 0.25);
      transition: height 0.25s ease;
    }
    &:hover {
      &::after {
        height: 100%;
      }
    }
  }
`

const Header = styled.header`
  ${tw`text-left xs:text-center lg:text-left`}
  font-family: 'Open Sans', sans-serif;
  font-size: 1.73em;
  font-weight: 400;
  margin: auto;
  margin-bottom: 2em;
`

const ContentText = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 1.1em;
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 1.6em;
`

const Wrapper = styled.section`
  ${tw`w-screen`}
  min-height: fit-content;
  background-color: rgb(250, 250, 250);
`

const Container = styled.div`
  ${tw`w-full mx-auto pt-32 px-4 pb-16`}
  max-width: 920px;
`

export default function About() {
  return (
    <Wrapper role="main" aria-labelledby="about">
      <Container>
        <Header id="about">Hi! I'm Rishi 👋🏻</Header>
        <AboutSection>
          <picture>
            <source srcSet={nicelyCompressedImage} type="image/webp" />
            <source srcSet={niceImage} type="image/png" />
            <NiceImage alt="rishikumarchawda" src={niceImage} />
          </picture>
          <AboutText>
            <ContentText>
              I'm a web and mobile applications developer. I was born in the 90s' - when tech had
              started becoming popular among young people, I spent most of my childhood playing
              video games. After graduating high school, I enrolled for a Bachelors' in Computer
              Science and fell in love with programming during that time. Since then, I've been
              programming in different languages.
            </ContentText>
            <ContentText>
              I design and develop websites, progressive web applications and hybrid mobile
              applications for Android and iOS. I also like working on search engine optimisation,
              analytics and online marketing. Most of my time is spent on exploring open source,
              reading articles and programming.
            </ContentText>
            <ContentText>
              Currently I'm working with the team at{' '}
              <a href="https://github.com/codebrahma" target="_newtab" rel="nofollow">
                Codebrahma
              </a>
              , where I develop Single page applications, Progressive web apps and hybrid mobile
              applications for iOS and Android - and enjoy playing table tennis with the folks!
            </ContentText>
            <ContentText>
              Apart from enjoying good food, traveling, music and art - I also write articles, read
              books, stalk nature with my camera and occasionally sketch weird things.
            </ContentText>
          </AboutText>
        </AboutSection>
      </Container>
    </Wrapper>
  )
}
