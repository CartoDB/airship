import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

/*
<Tooltip to={bottom|top|left|right}>
  <Tooltip.Content>
    {children}
  </Tooltip.Content>
  <Tooltip.Trigger>
    {children}
  <Tooltip.Trigger>
</Tooltip>
*/

const StyledTooltip = styled.div`
  opacity: 0;
  pointer-events: none;
  font: 400 12px/20px 'Roboto';
  background: rgba(17, 17, 17, 0.9);
  border-radius: 4px;
  color: #fff;
  padding: 0.5em 1em;
  position: absolute;
  white-space: nowrap;
  z-index: 10;

  &:before {
    background: no-repeat
      url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22%20width%3D%2236px%22%20height%3D%2212px%22%3E%3Cpath%20fill%3D%22rgba(17, 17, 17, 0.9)%22%20transform%3D%22rotate(0)%22%20d%3D%22M2.658,0.000%20C-13.615,0.000%2050.938,0.000%2034.662,0.000%20C28.662,0.000%2023.035,12.002%2018.660,12.002%20C14.285,12.002%208.594,0.000%202.658,0.000%20Z%22/%3E%3C/svg%3E');
    background-size: 100% auto;
    width: 18px;
    height: 6px;
    pointer-events: none;
    content: '';
    position: absolute;
    z-index: 10;
  }

  [data-pos='top'] & {
    opacity: 1;
    bottom: calc(100% + 5px);
    left: 50%;
    margin-bottom: 11px;
    transform: translate(-50%, 10px);
    transform-origin: top;
  }

  [data-pos='top'] &:before {
    bottom: 0;
    left: 50%;
    margin-bottom: 5px;
    transform: translate(-50%, 10px);
    transform-origin: top;
  }

  [data-pos='bottom'] & {
    opacity: 1;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 10px);
    transform-origin: top;
  }

  [data-pos='bottom'] &:before {
    top: 0;
    left: 50%;
    transform: translate(-10px, 0) rotate(180deg);
    transform-origin: top;
  }

  [data-pos='right'] & {
    opacity: 1;
    top: 50%;
    left: 100%;
    transform: translate(10px, -50%);
    transform-origin: top;
  }

  [data-pos='right'] &:before {
    top: 50%;
    left: 0;
    transform: translate(-8px, 0) rotate(90deg);
    transform-origin: top;
  }

  [data-pos='left'] & {
    opacity: 1;
    top: 50%;
    right: 100%;
    transform: translate(-10px, -50%);
    transform-origin: top;
  }

  [data-pos='left'] &:before {
    top: 50%;
    right: 0;
    transform: translate(8px, 0) rotate(-90deg);
    transform-origin: top;
  }
`;
StyledTooltip.displayName = 'Tooltip.Content';

const Trigger = ({ children }) => {
  return children;
};
Trigger.displayName = 'Tooltip.Trigger';

const Wrapper = styled.span`
  position: relative;
`;

class Tooltip extends Component {
  static Content = StyledTooltip;
  static Trigger = Trigger;

  state = {
    visible: false
  };

  componentDidMount() {
    this.timer = null;
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  onWindowClick = (event) => {
    const tooltipElement = findDOMNode(this);
    const { visible } = this.state;

    if (
      event.target !== tooltipElement &&
      tooltipElement !== event.target.closest('[data-component=Tooltip]') &&
      visible
    ) {
      this.hide();
    }
  };

  toggle = (visible) => {
    this.setState((state) => {
      return { ...state, visible: visible };
    });
  };

  show = () => {
    this.toggle(true);
  };

  hide = () => {
    this.toggle(false);
  };

  render() {
    const { children, as, to } = this.props;
    const { visible } = this.state;
    const Node = as !== 'span' ? Wrapper.withComponent(as) : Wrapper;

    return (
      <Node
        data-component="Tooltip"
        onMouseEnter={(e) => this.show()}
        onMouseLeave={(e) => this.hide()}
        data-pos={to}
      >
        {Children.map(children, (child) => {
          let element = null;
          if (child.type.displayName === 'Tooltip.Trigger') {
            element = child;
          } else if (child.type.displayName === 'Tooltip.Content' && visible) {
            element = child;
          }
          return element;
        })}
      </Node>
    );
  }
}

Tooltip.defaultProps = {
  as: 'span',
  to: 'top'
};

Tooltip.propTypes = {
  as: PropTypes.string,
  to: PropTypes.oneOf(['bottom', 'right', 'left', 'top'])
};

export default Tooltip;
