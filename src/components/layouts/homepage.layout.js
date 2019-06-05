import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import tw from 'tailwind.macro'
import { colors } from '../../../tailwind'
import { UpDown, UpDownWide, rotateAnimation, titleRotateAnimation } from '../animations'
import glasses from './assets/glasses.png'
import mag from './assets/magglass.png'
import pencil from './assets/pencil-smol.png'

const Icon = styled.img`
${tw`absolute`}
width: ${props => props.width || 'auto'};
height: ${props => props.height || 'auto'};
left: ${props => props.left};
top: ${props => props.top};
`

const Wrapper = styled.div`
  ${tw`w-full xl:w-2/3`};
`
const Divider = styled(ParallaxLayer)`
  ${tw`absolute w-full`};
  background: ${props => props.bg};
`

const RotatingIcon = styled(Icon)`
  ${rotateAnimation('4.3s')}
`

const MagIcon = styled(Icon)`
  ${titleRotateAnimation('10.1s')}
`

const Content = styled(ParallaxLayer)`
  ${tw`p-2 md:p-4 lg:p-8 justify-center items-center flex z-50`};
`

const HomePageLayout = ({ children, offset, factor, speed }) => (
  <>
    <Divider bg={colors.bg} factor={factor} speed={0.2} offset={offset}>
      <UpDown>
        <MagIcon src={mag} width={45} left="20%" top="79%" />
      </UpDown>
      <UpDownWide>
        <RotatingIcon src={pencil} width={25} left="70%" top="25%" />
      </UpDownWide>
      <Icon src={glasses} width={25} left="60%" top="15%" />
    </Divider>
    <Content factor={factor} speed={speed} offset={offset}>
      <Wrapper>{children}</Wrapper>
    </Content>
  </>
)

HomePageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  offset: PropTypes.number.isRequired,
}

export default HomePageLayout
