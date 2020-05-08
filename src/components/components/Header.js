import React from 'react'
import PropTypes from 'prop-types'

const Header = ({ children, title, small }) => null
// <Wrapper small={small}>
//   <TextWrapper>
//     {title && (
//       <Text className="title" data-testid="header-title">
//         {title}
//       </Text>
//     )}
//     {children && <Subtitle className="subtitle">{children}</Subtitle>}
//   </TextWrapper>
// </Wrapper>

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
