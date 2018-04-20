import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const TrackBack = styled.div`
  background: ${props => props.theme.ui03};
  border-radius: 3px;
  cursor: pointer;
  height: 2px;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  .is-disabled & {
    background: ${props => props.theme.ui03};
    cursor: not-allowed;
  }
`;
TrackBack.defaultProps = {
  theme,
};

const TrackFront = TrackBack.extend`
  background: ${props => props.theme.brand01};
  transition: left 0.1s ease, width 0.1s ease;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  .is-disabled & {
    background: ${props => props.theme.ui03};
  }
`;
TrackFront.defaultProps = {
  theme,
};

class Track extends Component {
  constructor(props) {
    super(props);

    this.node = null;
    this.trackDragEvent = null;
  }

  getClientRect = () => this.node.getBoundingClientRect();

  getActiveTrackStyle = () => {
    const { percentages } = this.props;
    const { min, max } = percentages;
    const width = `${(max - min) * 100}%`;
    const left = `${min * 100}%`;
    return { left, width };
  };

  addDocumentMouseMoveListener() {
    this.removeDocumentMouseMoveListener();
    this.node.ownerDocument.addEventListener('mousemove', this.handleMouseMove, { pasive: false });
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

  handleMouseMove = event => {
    event.preventDefault();

    const { draggable, onTrackDrag } = this.props;
    if (!draggable) {
      return;
    }

    if (this.trackDragEvent !== null) {
      onTrackDrag(event, this.trackDragEvent);
    }

    this.trackDragEvent = event;
  };

  handleMouseUp = () => {
    if (!this.props.draggable) {
      return;
    }

    this.removeDocumentMouseMoveListener();
    this.removeDocumentMouseUpListener();
    this.trackDragEvent = null;
  };

  handleMouseDown = event => {
    const { draggable, onTrackMouseDown } = this.props;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const trackClientRect = this.getClientRect();
    const position = {
      x: clientX - trackClientRect.left,
      y: 0,
    };

    onTrackMouseDown(event, position);

    if (draggable) {
      this.addDocumentMouseMoveListener();
      this.addDocumentMouseUpListener();
    }
  };

  handleTouchStart = event => {
    event.preventDefault();

    this.handleMouseDown(event);
  };

  render() {
    const activeTrackStyle = this.getActiveTrackStyle();

    return (
      <TrackBack
        onMouseDown={this.handleMouseDown}
        onTouchStart={this.handleTouchStart}
        innerRef={node => {
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
  children: PropTypes.node,
  draggable: PropTypes.bool,
  onTrackDrag: PropTypes.func,
  onTrackMouseDown: PropTypes.func.isRequired,
  percentages: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Track;
