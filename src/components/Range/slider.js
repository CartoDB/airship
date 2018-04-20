import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from './label';
import { theme } from '../../constants';

const SliderContainer = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: column;
  position: absolute;
  transition: left 0.1s ease;
  top: -6px;
  transform: translate3d(-50%, 0, 0);
  padding: 0 0.5rem;
  user-select: none;
`;

const SliderBullet = styled.span`
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  background: ${props => props.theme.white};
  border-radius: 100%;
  border: 1px solid ${props => props.theme.brand01};
  cursor: pointer;
  display: inline-block;
  height: 12px;
  outline: none;
  transition: transform 0.1s ease;
  width: 12px;
  user-select: none;

  &:hover {
    transform: scale(1.3);
  }

  .is-disabled & {
    background: ${props => props.theme.ui02};
    border: 1px solid ${props => props.theme.ui03};
    cursor: not-allowed;
  }

  .is-disabled &:hover {
    transform: none;
  }
`;
SliderBullet.defaultProps = {
  theme,
};

class Slider extends Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  }

  getStyle() {
    const perc = (this.props.percentage || 0) * 100;
    const style = {
      left: `${perc}%`,
    };

    return style;
  }

  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove, { pasive: false });
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp, { pasive: false });
  }

  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener('mousemove', this.handleMouseMove);
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown = event => {
    event.preventDefault();

    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  };

  handleMouseUp = event => {
    event.preventDefault();

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  };

  handleMouseMove = event => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onSliderDrag(event, this.props.type);
  };

  handleTouchMove = event => {
    event.preventDefault();
    event.stopPropagation();

    this.props.onSliderDrag(event, this.props.type);
  };

  render() {
    const style = this.getStyle();

    return (
      <SliderContainer
        innerRef={node => { this.node = node; }}
        style={style}
        draggable={this.props.draggable}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleTouchMove}
      >
        <SliderBullet tabIndex="0" />
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value"
        >
          {this.props.value}
        </Label>
      </SliderContainer>
    );
  }
}

Slider.propTypes = {
  classNames: PropTypes.array,
  draggable: PropTypes.bool,
  formatLabel: PropTypes.func,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onSliderDrag: PropTypes.func.isRequired,
  percentage: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Slider;
