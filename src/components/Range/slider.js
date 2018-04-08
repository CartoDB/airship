import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Label from './label';
import { colors } from '../../constants';

const SliderContainer = styled.span`
  position: absolute;
  transition: left 0.1s ease;
`;

const SliderBullet = styled.div`
  appearance: none;
  background: ${colors.white};
  border: 1px solid ${colors.brand01};
  border-radius: 100%;
  cursor: pointer;
  display: block;
  height: 12px;
  margin-left: -6px;
  margin-top: -7px;
  outline: none;
  position: absolute;
  top: 50%;
  transition: transform 0.1s ease;
  width: 12px;

  &:hover {
    transform: scale(1.3);
  }

  .is-disabled & {
    background: ${colors.ui02};
    border: 1px solid ${colors.ui03};
    cursor: not-allowed;
  }

  .is-disabled &:hover {
    transform: none;
  }
`;

class Slider extends Component {
  constructor(props) {
    super(props);

    this.node = null;
  }

  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
    this.removeDocumentTouchMoveListener();
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
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  addDocumentTouchMoveListener() {
    this.removeDocumentTouchMoveListener();
    this.node.ownerDocument.addEventListener('touchmove', this.handleTouchMove);
  }

  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  removeDocumentMouseMoveListener() {
    this.node.ownerDocument.removeEventListener(
      'mousemove',
      this.handleMouseMove
    );
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  removeDocumentTouchMoveListener() {
    this.node.ownerDocument.removeEventListener(
      'touchmove',
      this.handleTouchMove
    );
  }

  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener(
      'touchend',
      this.handleTouchEnd
    );
  }

  handleMouseDown = () => {
    this.addDocumentMouseMoveListener();
    this.addDocumentMouseUpListener();
  };

  handleMouseUp = () => {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
  };

  handleMouseMove = event => {
    this.props.onSliderDrag(event, this.props.type);
  };

  handleTouchStart = () => {
    this.addDocumentTouchEndListener();
    this.addDocumentTouchMoveListener();
  };

  handleTouchMove = event => {
    this.props.onSliderDrag(event, this.props.type);
  };

  handleTouchEnd = () => {
    this.removeDocumentTouchMoveListener();
    this.removeDocumentTouchEndListener();
  };

  render() {
    const style = this.getStyle();

    return (
      <SliderContainer
        innerRef={node => {
          this.node = node;
        }}
        style={style}
      >
        <Label
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
          type="value"
        >
          {this.props.value}
        </Label>

        <SliderBullet
          draggable={this.props.draggable}
          onMouseDown={this.handleMouseDown}
          onTouchStart={this.handleTouchStart}
          tabIndex="0"
        />
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
