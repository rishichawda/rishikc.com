import React from 'react'
import styled from 'styled-components'
import { useSpring, config, animated } from 'react-spring'
import PropTypes from 'prop-types'
import { colors } from '../../../tailwind'

const Wrapper = styled.header`
  background: ${colors.bg};
  height: 560px;
  @media (max-width: 900px) {
    height: 600px;
  }
  @media (max-width: 600px) {
    height: 500px;
  }
  position: relative;
  overflow: hidden;
`

const Text = styled.div`
  color: #fff;
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

const Subtitle = styled(animated.p)`
  max-width: 650px;
  color: #a8b8e1;
`

const Header = ({ children, title, html }) => {
  const titleProps = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })
  const subProps = useSpring({ config: config.slow, delay: 400, from: { opacity: 0 }, to: { opacity: 1 } })
  return (
    <Wrapper>
      <Text>
        {title && (
          <animated.h1 data-testid="header-title" style={titleProps}>
            {title}
          </animated.h1>
        )}
        {children && <Subtitle style={subProps}>{children}</Subtitle>}
        {/* {html && <animated.div style={contentProps} dangerouslySetInnerHTML={{ __html: html }} />} */}
      </Text>
    </Wrapper>
  )
}

export default Header

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  html: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool]),
  big: PropTypes.bool,
}

Header.defaultProps = {
  big: false,
  title: false,
  children: false,
  html: false,
}
