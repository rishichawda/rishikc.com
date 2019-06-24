import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import { colors } from '../../../tailwind'

const Wrapper = styled.footer`
${tw`flex flex-row items-center justify-center`}
  background: ${colors.bg};
  width: 100vw;
  position: relative;
  overflow: hidden;
`

const Content = styled.div`
  ${tw`flex flex-row justify-center items-center text-center text-white`}
  width: 100%;
  max-width: 1028px;
  padding: 1.6em 1em;
  font-weight: 300;
  font-size: 0.83rem;
  font-family: Open Sans, sans-serif;
`

export default function Footer() {
  return (
    <Wrapper>
      <Content>Copyright © 2019 Rishi Kumar Chawda. All Rights Reserved.</Content>
    </Wrapper>
  )
}
