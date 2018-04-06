import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as valueTransformer from './transformer';
import Slider from './slider';
import Track from './track';
import {
  capitalize,
  distanceTo,
  isDefined,
  isObject,
  length
} from '../../utils';
import styled from 'styled-components';

const StyledRange = styled.div`
  position: relative;
  width: ${(props) => `${props.width}px`};
`;

/**
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
class Range extends Component {
  state = {
    value: this.isMultiValue()
      ? this.props.value
      : {
          min: this.props.minValue,
          max: this.props.value || this.props.minValue
        }
  };

  constructor(props) {
    super(props);

    this.startValue = null;
    this.node = null;
    this.trackNode = null;
    this.isSliderDragging = false;
    this.lastKeyMoved = null;
  }

  componentWillUnmount() {
    this.removeDocumentMouseUpListener();
    this.removeDocumentTouchEndListener();
  }

  getTrackClientRect() {
    return this.trackNode.getClientRect();
  }

  getKeyByPosition(position) {
    const positions = valueTransformer.getPositionsFromValues(
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

  isWithinRange(values) {
    if (this.isMultiValue()) {
      return (
        values.min >= this.props.minValue &&
        values.max <= this.props.maxValue &&
        values.min < values.max
      );
    }

    return (
      values.max >= this.props.minValue && values.max <= this.props.maxValue
    );
  }

  shouldUpdate(values) {
    return this.isWithinRange(values) && this.hasStepDifference(values);
  }

  updatePosition(key, position) {
    const positions = valueTransformer.getPositionsFromValues(
      this.state.value,
      this.props.minValue,
      this.props.maxValue,
      this.getTrackClientRect()
    );

    positions[key] = position;
    this.lastKeyMoved = key;

    this.updatePositions(positions);
  }

  updatePositions(positions) {
    const values = {
      min: valueTransformer.getValueFromPosition(
        positions.min,
        this.props.minValue,
        this.props.maxValue,
        this.getTrackClientRect()
      ),
      max: valueTransformer.getValueFromPosition(
        positions.max,
        this.props.minValue,
        this.props.maxValue,
        this.getTrackClientRect()
      )
    };

    const transformedValues = {
      min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
      max: valueTransformer.getStepValueFromValue(values.max, this.props.step)
    };

    this.updateValues(transformedValues);
  }

  updateValue(key, value) {
    const values = this.state.value;
    values[key] = value;

    this.updateValues(values);
  }

  updateValues(values) {
    if (!this.shouldUpdate(values)) {
      return;
    }
    const { onChange } = this.props;

    this.setState(
      (state) => {
        return { value: values };
      },
      () => {
        onChange && onChange(this.isMultiValue() ? values : values.max);
      }
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
    this.node.ownerDocument.removeEventListener(
      'touchend',
      this.handleTouchEnd
    );
  }

  handleSliderDrag = (event, key) => {
    if (this.props.disabled) {
      return;
    }

    const position = valueTransformer.getPositionFromEvent(
      event,
      this.getTrackClientRect()
    );
    this.isSliderDragging = true;
    requestAnimationFrame(() => this.updatePosition(key, position));
  };

  handleTrackDrag = (event, prevEvent) => {
    if (this.props.disabled || !this.props.draggable || this.isSliderDragging) {
      return;
    }

    const { maxValue, minValue } = this.props;
    const { value: { max, min } } = this.state;

    const position = valueTransformer.getPositionFromEvent(
      event,
      this.getTrackClientRect()
    );
    const value = valueTransformer.getValueFromPosition(
      position,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const stepValue = valueTransformer.getStepValueFromValue(
      value,
      this.props.step
    );

    const prevPosition = valueTransformer.getPositionFromEvent(
      prevEvent,
      this.getTrackClientRect()
    );
    const prevValue = valueTransformer.getValueFromPosition(
      prevPosition,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const prevStepValue = valueTransformer.getStepValueFromValue(
      prevValue,
      this.props.step
    );

    const offset = prevStepValue - stepValue;

    const transformedValues = {
      min: min - offset,
      max: max - offset
    };

    this.updateValues(transformedValues);
  };

  handleTrackMouseDown = (event, position) => {
    if (this.props.disabled) {
      return;
    }

    const { maxValue, minValue } = this.props;
    const { value: { max, min } } = this.state;

    event.preventDefault();

    const value = valueTransformer.getValueFromPosition(
      position,
      minValue,
      maxValue,
      this.getTrackClientRect()
    );
    const stepValue = valueTransformer.getStepValueFromValue(
      value,
      this.props.step
    );

    if (!this.props.draggable || stepValue > max || stepValue < min) {
      this.updatePosition(this.getKeyByPosition(position), position);
    }
  };

  handleInteractionStart = () => {
    const { onChangeStart, onChangeComplete } = this.props;
    onChangeStart && onChangeStart(this.state.value);

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

  handleMouseDown = (event) => {
    this.handleInteractionStart(event);
    this.addDocumentMouseUpListener();
  };

  handleMouseUp = (event) => {
    this.handleInteractionEnd(event);
    this.removeDocumentMouseUpListener();
  };

  handleTouchStart = (event) => {
    this.handleInteractionStart(event);
    this.addDocumentTouchEndListener();
  };

  handleTouchEnd = (event) => {
    this.handleInteractionEnd(event);
    this.removeDocumentTouchEndListener();
  };

  renderSliders() {
    const values = this.state.value;
    const percentages = valueTransformer.getPercentagesFromValues(
      this.state.value,
      this.props.minValue,
      this.props.maxValue
    );
    const keys = this.getKeys();

    return keys.map((key) => {
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
          classNames={this.props.classNames}
          formatLabel={this.props.formatLabel}
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
    if (!this.props.name) {
      return [];
    }

    const isMultiValue = this.isMultiValue();
    const values = this.state.value;

    return this.getKeys().map((key) => {
      const value = values[key];
      const name = isMultiValue
        ? `${this.props.name}${capitalize(key)}`
        : this.props.name;

      return <input key={key} type="hidden" name={name} value={value} />;
    });
  }

  render() {
    const { width, disabled, draggable } = this.props;
    const isMultiValue = this.isMultiValue();
    const percentages = valueTransformer.getPercentagesFromValues(
      this.state.value,
      this.props.minValue,
      this.props.maxValue
    );

    return (
      <StyledRange
        className={disabled ? 'is-disabled' : null}
        width={width}
        innerRef={(node) => {
          this.node = node;
        }}
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
      >
        <Track
          draggable={isMultiValue ? draggable : false}
          ref={(trackNode) => {
            this.trackNode = trackNode;
          }}
          percentages={percentages}
          onTrackDrag={this.handleTrackDrag}
          onTrackMouseDown={this.handleTrackMouseDown}
        >
          {this.renderSliders()}
        </Track>
        {this.renderHiddenInputs()}
      </StyledRange>
    );
  }
}

Range.defaultProps = {
  disabled: false,
  maxValue: 10,
  minValue: 0,
  value: 0,
  step: 1,
  width: 200
};

Range.propTypes = {
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
  width: PropTypes.number
};

export default Range;
