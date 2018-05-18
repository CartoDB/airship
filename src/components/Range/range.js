import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as utils from './transformer';
import Slider from './slider';
import Track from './track';
import {
  capitalize,
  distanceTo,
  isDefined,
  isObject,
  length,
} from '../../utils';

const Wrapper = styled.div`
  position: relative;
  padding: 8px 0 24px;
`;

/**
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
class Range extends Component {
  static defaultProps = {
    disabled: false,
    draggable: false,
    maxValue: 10,
    minValue: 0,
    value: 0,
    step: 1,
  };

  static propTypes = {
    classNames: PropTypes.array,
    disabled: PropTypes.bool,
    draggable: PropTypes.bool,
    formatLabel: PropTypes.func,
    maxValue: PropTypes.number,
    minValue: PropTypes.number,
    name: PropTypes.string,
    onChangeStart: PropTypes.func,
    onChange: PropTypes.func,
    onChangeComplete: PropTypes.func,
    step: PropTypes.number,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  };

  state = {
    value: this.isMultiValue()
      ? this.props.value
      : {
        min: this.props.minValue,
        max: this.props.value || this.props.minValue,
      },
  };

  startValue = null;
  node = null;
  trackNode = null;
  isSliderDragging = false;
  lastKeyMoved = null;

  handleRef = node => {
    if (!node) return;

    this.node = node;

    this.node.addEventListener('mousedown', this.handleMouseDown);
    this.node.addEventListener('touchstart', this.handleTouchStart);
  }

  componentWillUnmount() {
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
  }

  componentWillReceiveProps(nextProps) {
    const { minValue, maxValue, value } = nextProps;

    if (this.state.value !== value && this.isWithinRange(value, minValue, maxValue)) {
      this.setState({ value });
    }
  }

  getTrackClientRect() {
    return this.trackNode.getClientRect();
  }

  getKeyByPosition(position) {
    const positions = utils.getPositionsFromValues(
      this.state.value,
      this.props.minValue,
      this.props.maxValue,
      this.getTrackClientRect()
    );

    if (this.isMultiValue()) {
      const distanceToMin = distanceTo(position, positions.min);
      const distanceToMax = distanceTo(position, positions.max);

      if (distanceToMin < distanceToMax) {
        return 'min';
      }
    }

    return 'max';
  }

  getKeys() {
    if (this.isMultiValue()) {
      return ['min', 'max'];
    }

    return ['max'];
  }

  hasStepDifference(values) {
    const currentValues = this.state.value;
    return (
      length(values.min, currentValues.min) >= this.props.step ||
      length(values.max, currentValues.max) >= this.props.step
    );
  }

  isMultiValue() {
    return isObject(this.props.value);
  }

  isWithinRange(values, minValue, maxValue) {
    if (this.isMultiValue()) {
      return (
        values.min >= minValue &&
        values.max <= maxValue &&
        values.min < values.max
      );
    }

    return (
      values.max >= minValue && values.max <= maxValue
    );
  }

  shouldUpdate(values) {
    const { minValue, maxValue } = this.props;
    return this.isWithinRange(values, minValue, maxValue) && this.hasStepDifference(values);
  }

  updatePosition(key, position) {
    const { minValue, maxValue } = this.props;
    const { value } = this.state;
    const positions = utils.getPositionsFromValues(value, minValue, maxValue, this.getTrackClientRect());

    positions[key] = position;
    this.lastKeyMoved = key;

    this.updatePositions(positions);
  }

  updatePositions(positions) {
    const { minValue, maxValue, step } = this.props;
    const values = {
      min: utils.getValueFromPosition(positions.min, minValue, maxValue, this.getTrackClientRect()),
      max: utils.getValueFromPosition(positions.max, minValue, maxValue, this.getTrackClientRect()),
    };

    this.updateValues({
      min: utils.getStepValueFromValue(values.min, step),
      max: utils.getStepValueFromValue(values.max, step),
    });
  }

  updateValue(key, value) {
    const values = this.state.value;
    values[key] = value;

    this.updateValues(values);
  }

  updateValues(values) {
    if (!this.shouldUpdate(values)) return;

    const { onChange } = this.props;

    this.setState(
      { value: values },
      () => onChange && onChange(this.isMultiValue() ? values : values.max),
    );
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
  }

  addDocumentTouchEndListener() {
    this.removeDocumentTouchEndListener();
    this.node.ownerDocument.addEventListener('touchend', this.handleTouchEnd);
  }

  removeDocumentMouseUpListener() {
    this.node.ownerDocument.removeEventListener('mouseup', this.handleMouseUp);
  }

  removeDocumentTouchEndListener() {
    this.node.ownerDocument.removeEventListener('touchend', this.handleTouchEnd);
  }

  handleSliderDrag = (event, key) => {
    if (this.props.disabled) {
      return;
    }

    const position = utils.getPositionFromEvent(
      event,
      this.getTrackClientRect()
    );
    this.isSliderDragging = true;
    requestAnimationFrame(() => this.updatePosition(key, position));
  };

  handleTrackDrag = (event, prevEvent) => {
    const { disabled, draggable, maxValue, minValue } = this.props;
    const { value: { max, min } } = this.state;

    if (disabled || !draggable || this.isSliderDragging) return;

    const position = utils.getPositionFromEvent(event, this.getTrackClientRect());
    const value = utils.getValueFromPosition(position, minValue, maxValue, this.getTrackClientRect());
    const stepValue = utils.getStepValueFromValue(value, this.props.step);

    const prevPosition = utils.getPositionFromEvent(prevEvent, this.getTrackClientRect());
    const prevValue = utils.getValueFromPosition(prevPosition, minValue, maxValue, this.getTrackClientRect());
    const prevStepValue = utils.getStepValueFromValue(prevValue, this.props.step);

    const offset = prevStepValue - stepValue;

    this.updateValues({
      min: min - offset,
      max: max - offset,
    });
  };

  handleTrackMouseDown = (event, position) => {
    if (this.props.disabled) {
      return;
    }

    const { maxValue, minValue } = this.props;
    const { value: { max, min } } = this.state;

    event.preventDefault();

    const value = utils.getValueFromPosition(
      position,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const stepValue = utils.getStepValueFromValue(
      value,
      this.props.step
    );

    if (!this.props.draggable || stepValue > max || stepValue < min) {
      this.updatePosition(this.getKeyByPosition(position), position);
    }
  };

  handleInteractionStart = () => {
    const { onChangeStart, onChangeComplete } = this.props;

    if (onChangeStart) onChangeStart(this.state.value);

    if (onChangeComplete && !isDefined(this.startValue)) {
      this.startValue = this.state.value;
    }
  };

  handleInteractionEnd = () => {
    const { onChangeComplete } = this.props;
    if (this.isSliderDragging) {
      this.isSliderDragging = false;
    }

    if (!onChangeComplete || !isDefined(this.startValue)) {
      return;
    }

    if (this.startValue !== this.state.value) {
      onChangeComplete(this.state.value);
    }

    this.startValue = null;
  };

  handleMouseDown = event => {
    this.handleInteractionStart(event);
    this.addDocumentMouseUpListener();
  };

  handleMouseUp = event => {
    this.handleInteractionEnd(event);
    this.removeDocumentMouseUpListener();
  };

  handleTouchStart = event => {
    this.handleInteractionStart(event);
    this.addDocumentTouchEndListener();
  };

  handleTouchEnd = event => {
    this.handleInteractionEnd(event);
    this.removeDocumentTouchEndListener();
  };

  renderSliders() {
    const values = this.state.value;
    const { minValue, maxValue, disabled, formatLabel } = this.props;
    const percentages = utils.getPercentagesFromValues(this.state.value, minValue, maxValue);

    return this.getKeys().map(key => {
      const value = values[key];
      const percentage = percentages[key];

      let { maxValue, minValue } = this.props;

      if (key === 'min') {
        maxValue = values.max;
      } else {
        minValue = values.min;
      }

      const slider = (
        <Slider
          disabled={disabled}
          formatLabel={formatLabel}
          key={key}
          maxValue={maxValue}
          minValue={minValue}
          onSliderDrag={this.handleSliderDrag}
          percentage={percentage}
          type={key}
          value={value}
        />
      );

      return slider;
    });
  }

  renderHiddenInputs() {
    if (!this.props.name) return [];

    return this.getKeys().map(key => {
      const name = this.isMultiValue()
        ? `${this.props.name}${capitalize(key)}`
        : this.props.name;

      return <input key={key} type="hidden" name={name} value={this.state.value[key]} />;
    });
  }

  render() {
    const { disabled, draggable, minValue, maxValue } = this.props;
    const percentages = utils.getPercentagesFromValues(this.state.value, minValue, maxValue);

    return (
      <Wrapper innerRef={this.handleRef}>
        <Track
          draggable={this.isMultiValue() ? draggable : false}
          ref={trackNode => { this.trackNode = trackNode; }}
          percentages={percentages}
          disabled={disabled}
          onTrackDrag={this.handleTrackDrag}
          onTrackMouseDown={this.handleTrackMouseDown}
        >
          {this.renderSliders()}
        </Track>
        {this.renderHiddenInputs()}
      </Wrapper>
    );
  }
}

export default Range;
