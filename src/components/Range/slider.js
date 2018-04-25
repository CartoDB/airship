import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Label from './label';
import { theme } from '../../constants';

const SliderContainer = styled.div`
  left: ${props => props.left * 100}%;
  align-items: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
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
  display: inline-block;
  height: 12px;
  outline: none;
  transition: transform 0.1s ease;
  width: 12px;
  user-select: none;

  &:hover {
    transform: scale(1.3);
  }

  ${props => props.disabled && css`
    background: ${props => props.theme.ui02};
    border: 1px solid ${props => props.theme.ui03};

    &:hover {
      transform: none;
    }
  `}
`;
SliderBullet.defaultProps = {
  theme,
};

class Slider extends Component {
  handleRef = node => {
    if (!node) return;

    this.node = node;

    this.node.addEventListener('mousedown', this.handleMouseDown);
    this.node.addEventListener('touchmove', this.handleTouchMove);
  }

  componentWillUnmount() {
    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
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

    this.props.onSliderDrag(event, this.props.type);
  };

  handleTouchMove = event => {
    event.preventDefault();

    this.props.onSliderDrag(event, this.props.type);
  };

  render() {
    const { disabled, draggable, formatLabel, percentage, value } = this.props;

    return (
      <SliderContainer
        innerRef={this.handleRef}
        left={percentage}
        draggable={draggable}
        disabled={disabled}
      >
        <SliderBullet tabIndex="0" disabled={disabled} />
        <Label formatLabel={formatLabel} type="value" disabled={disabled}>
          {value}
        </Label>
      </SliderContainer>
    );
  }
}

Slider.propTypes = {
  disabled: PropTypes.bool,
  draggable: PropTypes.bool,
  formatLabel: PropTypes.func,
  maxValue: PropTypes.number,
  minValue: PropTypes.number,
  onSliderDrag: PropTypes.func.isRequired,
  percentage: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

Slider.defaultProps = {
  percentage: 0,
};

export default Slider;
