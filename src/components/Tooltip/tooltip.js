import React, { Component, Children } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import svgArrow from './svgArrow';
import { theme } from '../../constants';
import { offset, isComponentOfType } from '../../utils';

const StyledTooltip = styled.div`
  box-sizing: border-box;
  pointer-events: none;
  font: 400 12px 'Roboto';
  background: ${props => props.theme.black};
  border-radius: 4px;
  color: ${props => props.theme.white};
  padding: 0.5rem;
  position: absolute;
  white-space: nowrap;

  &:before {
    background: no-repeat url("${svgArrow}");
    background-size: 100% auto;
    width: 18px;
    height: 6px;
    pointer-events: none;
    content: '';
    position: absolute;
  }


  ${({ to, position }) => to === 'top' && css`
    top: ${position.top - 6}px;
    left: ${position.left + (position.width / 2)}px;
    transform: translate(-50%, -100%);

    &:before {
      bottom: 0;
      left: 50%;
      margin-bottom: 5px;
      transform: translate(-50%, 10px);
      transform-origin: top;
    }
  `}

  ${({ to, position }) => to === 'bottom' && css`
    top: ${position.top + (position.height + 6)}px;
    left: ${position.left + (position.width / 2)}px;
    transform: translate(-50%, 0);

    &:before {
      top: 0;
      left: 50%;
      transform: translate(-10px, 0) rotate(180deg);
      transform-origin: top;
    }
  `}

  ${({ to, position }) => to === 'right' && css`
    top: ${position.top + (position.height / 2)}px;
    left: ${position.left + (position.width + 10)}px;
    transform: translate(0, -50%);

    &:before {
      top: 50%;
      left: 0;
      transform: translate(-8px, 0) rotate(90deg);
      transform-origin: top;
    }
  `}

  ${({ to, position }) => to === 'left' && css`
    top: ${position.top + (position.height / 2)}px;
    left: ${position.left - 10}px;
    transform: translate(-100%, -50%);

    &:before {
      top: 50%;
      right: 0;
      transform: translate(8px, 0) rotate(-90deg);
      transform-origin: top;
    }
  `}
`;
StyledTooltip.defaultProps = {
  theme,
};

const Content = ({ children, node, ...props }) => {
  let domNode = document.getElementById('modals');

  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', 'modals');
    document.body.appendChild(domNode);
  }

  const position = offset(node.current);

  return ReactDOM.createPortal(
    <StyledTooltip position={position} {...props}>
      {children}
    </StyledTooltip>,
    domNode
  );
};

const Trigger = ({ children }) => children;

const Wrapper = styled.span`
  cursor: pointer;
`;

class Tooltip extends Component {
  static Content = Content;
  static Trigger = Trigger;

  state = {
    visible: false,
  };

  triggerRef = React.createRef();

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  onWindowClick = event => (
    event.target === this.triggerRef.current ? this.show() : this.show()
  )

  show = () => this.setState({ visible: true });

  hide = () => this.setState({ visible: false });

  render() {
    const { children, as, to } = this.props;
    const { visible } = this.state;
    const WrapperComponent = as !== 'span' ? Wrapper.withComponent(as) : Wrapper;

    return (
      <WrapperComponent
        onMouseEnter={() => this.show()}
        onMouseLeave={() => this.hide()}
      >
        {Children.map(children, child => {
          if (isComponentOfType(Tooltip.Trigger, child)) {
            return <span ref={this.triggerRef}>{child}</span>;
          }

          if (isComponentOfType(Tooltip.Content, child) && visible) {
            return React.cloneElement(child, { node: this.triggerRef, to });
          }

          return null;
        })}
      </WrapperComponent>
    );
  }
}

Tooltip.defaultProps = {
  as: 'span',
  to: 'top',
};

Tooltip.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  to: PropTypes.oneOf(['bottom', 'right', 'left', 'top']),
};

export default Tooltip;
