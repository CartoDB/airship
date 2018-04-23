import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../constants';

const Avatar = styled.div`
  border-radius: 100%;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size}px`};
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.url});
  background-color: ${props => props.theme.ui02};
`;

Avatar.propTypes = {
  size: PropTypes.oneOf([24, 32, 48]),
  url: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
  size: 24,
  theme,
};

export default Avatar;
