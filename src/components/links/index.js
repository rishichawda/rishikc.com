import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import { Link } from 'gatsby'

const Wrapper = styled.section`
  ${tw`w-5/6 mx-auto py-20`}
  min-height: fit-content;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  margin-bottom: 11rem;
  max-width: 1028px;
  p,
  a {
    ${tw`text-white`}
  }
`

const Section = styled.div`
  ${tw`flex xs:flex-col md:flex-col lg:flex-row justify-between items-center`}
`

const Title = styled.h1`
  ${tw`text-white`}
  font-size: 1.24em;
  font-weight: 300;
  margin: auto;
  margin-bottom: 2em;
`

const List = styled.ul`
  ${tw`text-white`}
  font-size: 1.1em;
`

const ListItem = styled.li`
  ${tw`my-4 cursor-pointer text-white`}
  a {
    ${tw`cursor-pointer text-white`}
    text-decoration: none;
    letter-spacing: 0.02em;
    line-height: 1.5em;
  }
  &:hover {
    text-shadow: rgba(255, 255, 255, 0.47) 0px 0px 4.7px;
  }
`

export default function Links() {
  return (
    <Wrapper>
      <Title>Want to know more about me? Here's some links to get started with</Title>
      <Section>
        <List>
          <ListItem>
            <Link to="projects">Stuff that I'm working on or have worked on. 👨🏻‍💻</Link>
          </ListItem>
          <ListItem>
            <Link to="faq">Common questions regarding stack, tools and other things. ❔❕</Link>
          </ListItem>
          <ListItem>
            <Link to="articles">I write blogs! ✍🏻</Link>
          </ListItem>
          <ListItem>
            <Link to="reads">A bunch of quotes and snippets that I read and liked. 📚</Link>
          </ListItem>
        </List>
      </Section>
      <p>
        You can reach out to me through my <Link to="/">social media profiles</Link> too!
      </p>
    </Wrapper>
  )
}
