import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loading from '../Loading/loading';
import { colors } from '../../constants';

const StyledAvatar = styled.div`
  border-radius: 100%;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${(props) => props.url});
  background-color: ${colors.brand03};
`;
StyledAvatar.displayName = 'StyledAvatar';

const StyledLoading = styled.div`
  background-color: ${colors.ui02};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.size}px`};
  height: ${(props) => `${props.size}px`};
`;
StyledLoading.displayName = 'StyledLoading';

class Avatar extends Component {
  state = {
    loaded: false
  };

  componentDidMount() {
    const { url } = this.props;
    const loaded = () => {
      this.setState({ loaded: true });
    };

    url === '' ? loaded() : fetch(url).then(loaded);
  }

  render() {
    const { size, url } = this.props;

    return this.state.loaded ? (
      <StyledAvatar size={size} url={url} />
    ) : (
      <StyledLoading size={size}>
        <Loading size={16} />
      </StyledLoading>
    );
  }
}

Avatar.propTypes = {
  size: PropTypes.oneOf([24, 32, 48]),
  url: PropTypes.string.isRequired
};

Avatar.defaultProps = {
  size: 24
};

export default Avatar;
