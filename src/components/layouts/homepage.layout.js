import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import tw from 'tailwind.macro'
import { colors } from '../../../tailwind'
import { UpDown, UpDownWide, rotateAnimation, tiltRotateAnimation } from '../animations'
import glasses from './assets/glasses.svg'
import analysis from './assets/analysis.svg'
import pencil from './assets/pencil.svg'
import smartphone from './assets/smartphone.svg'
import blog from './assets/blog.svg'
import creativity from './assets/creativity.svg'
import web from './assets/web.svg'
import code from './assets/code.svg'

const Icon = styled.img`
${tw`absolute`}
width: ${props => props.width || 'auto'};
height: ${props => props.height || 'auto'};
left: ${props => props.left};
top: ${props => props.top};
opacity: ${props => props.opacity || '1'};
`

const Wrapper = styled.div`
  ${tw`w-full xl:w-2/3`};
`
const Divider = styled(ParallaxLayer)`
  ${tw`absolute w-full`};
  background: ${props => props.bg};
`

const RotatingIcon = styled(Icon)`
  ${props => rotateAnimation(props.time || '4.3s')}
`

const MagIcon = styled(Icon)`
  ${tiltRotateAnimation('10.1s')}
`

const TiltedIcon = styled(Icon)`
  transform: rotate(${props => props.tilt || '30deg'});
`

const Content = styled(ParallaxLayer)`
  ${tw`p-2 md:p-4 lg:p-8 justify-center items-center flex z-50`};
`

const HomePageLayout = ({ children, offset, factor, speed }) => (
  <>
    <Divider bg={colors.bg} speed={0.2} offset={offset}>
      <UpDownWide>
        <MagIcon src={smartphone} opacity={0.7} width={34} left="14%" top="9%" />
        <RotatingIcon src={pencil} opacity={0.5} width={25} left="80%" top="25%" />
      </UpDownWide>
      <Icon src={glasses} opacity={0.43} width={25} left="20%" top="15%" />
      <MagIcon src={web} opacity={0.4} width={38} left="11%" top="115%" />
      <TiltedIcon tilt="-70deg" src={blog} opacity={0.7} width={37} left="82%" top="99%" />Î
      <TiltedIcon src={smartphone} opacity={0.88} width={37} left="54%" top="89%" />Î
      <RotatingIcon src={code} opacity={0.2} width={38} left="65%" top="110%" />
    </Divider>
    <Divider bg={colors.bg} factor={factor} speed={0.2} offset={offset}>
      <UpDown>
        <MagIcon src={web} opacity={0.7} width={38} left="79%" top="79%" />
        <MagIcon src={analysis} opacity={0.7} width={25} left="20%" top="79%" />
        <RotatingIcon src={pencil} time="66.4s" opacity={0.5} width={34} left="7%" top="47%" />
        <Icon src={glasses} opacity={0.43} width={29} left="11%" top="95%" />
        <MagIcon src={analysis} opacity={0.7} width={29} left="90%" top="47%" />
        <RotatingIcon src={code} opacity={0.2} width={29} left="40%" top="45%" />
      </UpDown>
      <UpDownWide>
        <MagIcon src={smartphone} opacity={0.7} width={34} left="29%" top="9%" />
        <RotatingIcon src={pencil} opacity={0.5} width={25} left="70%" top="25%" />
        <RotatingIcon src={creativity} opacity={0.7} width={43} left="29%" top="101%" />
      </UpDownWide>
      <Icon src={glasses} opacity={0.43} width={25} left="60%" top="15%" />
      <TiltedIcon src={smartphone} opacity={0.7} width={34} left="98.3%" top="89%" />
      <MagIcon src={creativity} opacity={0.43} width={43} left="89%" top="10%" />
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
