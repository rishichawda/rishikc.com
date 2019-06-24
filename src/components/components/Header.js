import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors } from '../../../tailwind'
import './header.scss'

const Wrapper = styled.header`
  background: ${colors.bg};
  height: ${props => (props.small ? '430px' : '560px')};
  @media (max-width: 900px) {
    height: 600px;
  }
  @media (max-width: 600px) {
    height: 500px;
  }
  position: relative;
  overflow: hidden;
`

const TextWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  max-width: 70rem;
  padding: 0 2rem;
  margin-bottom: 7rem;
  align-items: center;
`

const Text = styled.h1`
  color: #fff;
  font-size: 2rem;
  line-height: 2.9rem;
  font-weight: 400;
`

const Subtitle = styled.p`
  max-width: 650px;
  color: #a8b8e1;
  font-size: 1.33em;
  line-height: 2rem;
  margin-top: 1.51rem;
  font-weight: 300;
`

const Header = ({ children, title, small }) => (
  <Wrapper small={small}>
    <TextWrapper>
      {title && (
        <Text className="title" data-testid="header-title">
          {title}
        </Text>
      )}
      {children && <Subtitle className="subtitle">{children}</Subtitle>}
    </TextWrapper>
  </Wrapper>
)

Header.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  small: PropTypes.bool,
}

Header.defaultProps = {
  children: null,
  title: '',
  small: false,
}

export default Header
