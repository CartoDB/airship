import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../constants';

const TrackBack = styled.div`
  background: ${colors.ui03};
  border-radius: 3px;
  cursor: pointer;
  height: 2px;
  position: relative;

  .is-disabled & {
    background: ${colors.ui03};
    cursor: not-allowed;
  }
`;

const TrackFront = TrackBack.extend`
  background: ${colors.brand01};
  transition: left 0.1s ease, width 0.1s ease;

  .is-disabled & {
    background: ${colors.ui03};
  }
`;

class Track extends Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.trackDragEvent = null;
  }

  getClientRect = () => {
    return this.node.getBoundingClientRect();
  };

  getActiveTrackStyle = () => {
    const { percentages } = this.props;
    const { min, max } = percentages;
    const width = `${(max - min) * 100}%`;
    const left = `${min * 100}%`;
    return { left, width };
  };

  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove);
  }

  addDocumentMouseUpListener() {
    this.removeDocumentMouseUpListener();
    this.node.ownerDocument.addEventListener('mouseup', this.handleMouseUp);
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

  handleMouseMove = (e) => {
    const { draggable, onTrackDrag } = this.props;
    if (!draggable) {
      return;
    }

    if (this.trackDragEvent !== null) {
      onTrackDrag(e, this.trackDragEvent);
    }

    this.trackDragEvent = e;
  };

  handleMouseUp = () => {
    if (!this.props.draggable) {
      return;
    }

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.trackDragEvent = null;
  };

  handleMouseDown = (e) => {
    const { draggable, onTrackMouseDown } = this.props;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0
    };

    onTrackMouseDown(e, position);

    if (draggable) {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }
  };

  handleTouchStart = (e) => {
    e.preventDefault();

    this.handleMouseDown(e);
  };

  render() {
    const activeTrackStyle = this.getActiveTrackStyle();

    return (
      <TrackBack
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        innerRef={(node) => {
          this.node = node;
        }}
      >
        <TrackFront style={activeTrackStyle} />
        {this.props.children}
      </TrackBack>
    );
  }
}

Track.propTypes = {
  draggable: PropTypes.bool,
  onTrackDrag: PropTypes.func,
  onTrackMouseDown: PropTypes.func.isRequired,
  percentages: PropTypes.objectOf(PropTypes.number).isRequired
};

export default Track;
