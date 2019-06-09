import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, config, animated } from 'react-spring'

import { colors } from '../../../tailwind'

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

const Text = styled(animated.h1)`
  color: #fff;
  font-size: 2em;
  font-weight: 400;
`

const Subtitle = styled(animated.p)`
  max-width: 650px;
  color: #a8b8e1;
  font-size: 1.33em;
  font-weight: 300;
`

const Header = ({ children, title, small }) => {
  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const subProps = useSpring({
    config: config.slow,
    delay: 400,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  return (
    <Wrapper small={small}>
      <TextWrapper>
        {title && (
          <Text data-testid="header-title" style={titleProps}>
            {title}
          </Text>
        )}
        {children && <Subtitle style={subProps}>{children}</Subtitle>}
      </TextWrapper>
    </Wrapper>
  )
}

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
