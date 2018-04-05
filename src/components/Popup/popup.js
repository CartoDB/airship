import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../constants';

const Wrapper = styled.div`
  position: relative;
  width: 260px;
  min-height: 40px;
  border-radius: 4px 4px 4px 0;
  box-shadow: 0 2px 8px 0 rgba(44, 44, 44, 0.16);
  background: ${props => props.background};
  color: ${props => props.background};
`;

const Image = styled.img`
  width: 260px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const Content = styled.div`
  padding: 16px;
  color: black;
  font: 400 12px/20px 'Roboto';
`;

const Hook = styled.div`
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 10;
  background: currentColor;
  color: currentColor;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-top: 12px solid currentColor;
    border-right: 18px solid transparent;
    content: '';
    z-index: 3;
  }

  &::after {
    position: absolute;
    top: 3px;
    left: 0;
    width: 0;
    height: 0;
    border-top: 12px solid rgba(44, 44, 44, 0.16);
    border-right: 18px solid transparent;
    filter: blur(2px);
    content: '';
    z-index: 2;
  }
`;

const Media = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 4px 4px 4px 0;
  height: ${props => props.offset}px;

  & > img {
    width: 260px;
  }
`;

const ImageHook = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 10;

  &::after {
    position: absolute;
    top: 3px;
    left: 0;
    width: 0;
    height: 0;
    border-top: 12px solid rgba(44, 44, 44, 0.16);
    border-right: 18px solid transparent;
    filter: blur(2px);
    content: '';
    z-index: 1;
  }
`;

const ImageHookInner = styled.div`
  position: absolute;
  height: 12px;
  width: 18px;
  overflow: hidden;
  clip-path: polygon(0 0, 0% 100%, 100% 0);
  z-index: 3;

  & > img {
    margin-top: -${props => props.offset}px;
    width: 260px;
  }
`;

class Popup extends Component {
  state = {
    offset: 0,
  }

  onImageLoad() {
    const imageHeight = this.imageNode.offsetHeight;
    const offset = imageHeight - 18; // Hook height

    this.setState({ offset })
  }

  renderWithContent() {
    const { background, children, image } = this.props;

    return (
      <Wrapper background={background}>
        {image && <Image src={image} />}
        <Content>{children}</Content>
        <Hook />
      </Wrapper>
    );
  }

  renderOnlyImage() {
    const { offset } = this.state;
    const image = <img
      src={this.props.image}
      onLoad={() => this.onImageLoad()}
      ref={(node) => { this.imageNode = node; }}
    />;

    return (
      <Wrapper>
        <Media offset={offset}>{image}</Media>
        <ImageHook>
          <ImageHookInner offset={offset}>{image}</ImageHookInner>
        </ImageHook>
      </Wrapper>
    )
  }

  render() {
    const { children, image } = this.props;

    return !children && image
      ? this.renderOnlyImage()
      : this.renderWithContent();
  }
}

Popup.defaultProps = {
  background: colors.white,
};

Popup.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  image: PropTypes.string,
};

export default Popup;
