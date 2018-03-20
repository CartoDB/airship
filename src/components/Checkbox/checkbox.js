import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { colors } from '../../constants';
import { rgba } from 'polished';

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const StyleCheck = styled.div`
  display: flex;
  align-items: center;

  .Checkbox {
    position: relative;
  }

  .Checkbox-decoration {
    pointer-events: none;
    width: 16px;
    height: 16px;
    overflow: hidden;
    border: 1px solid ${rgba(colors.type01, 0.16)};
    border-radius: 3px;
    position: relative;
    display: block;
  }

  .Checkbox-check {
    stroke-width: 2;
    stroke: ${colors.brand01};
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
  }

  .Checkbox-tip {
    display: flex;
    position: relative;
    transform: translateX(1px) translateY(3px);
  }

  .Checkbox-input {
    appearance: none;
    background: none;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border-radius: 3px;
    border: 1px solid ${rgba(colors.type01, 0.16)};
  }

  .Checkbox-input:focus {
    outline: none;
  }

  .Checkbox-input:focus {
    border: 2px solid ${colors.brand01};
  }

  .Checkbox-input:hover {
    border: 1px solid ${colors.brand03};
  }

  .Checkbox-input:checked {
    border: 1px solid ${colors.brand01};
  }

  .Checkbox-input:checked + .Checkbox-decoration .Checkbox-check {
    animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 300ms forwards;
  }

  .Checkbox-label {
    margin-left: 4px;
  }
`;

class Checkbox extends Component {
  state = {
    checked: !!this.props.checked
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  clickHandler = (e) => {
    const { onChange, disabled } = this.props;
    !disabled &&
      this.setState(
        (state) => {
          return {
            ...state,
            checked: !state.checked
          };
        },
        () => {
          onChange && onChange(this.state);
        }
      );
  };

  render() {
    const { children, name, as, value, disabled } = this.props;

    const { checked } = this.state;
    const Wrapper = as !== 'div' ? StyleCheck.withComponent(as) : StyleCheck;
    return (
      <Wrapper>
        <div className="Checkbox">
          <input
            className="Checkbox-input"
            type="checkbox"
            name={name}
            value={value}
            onChange={this.clickHandler}
            disabled={disabled}
            checked={checked}
          />
          <span className="Checkbox-decoration">
            <svg width="12px" height="12px" className="Checkbox-tip">
              <g fill="none">
                <polyline
                  className="Checkbox-check"
                  points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"
                />
              </g>
            </svg>
          </span>
        </div>
        {children && <div className="Checkbox-label">{children}</div>}
      </Wrapper>
    );
  }
}

Checkbox.defaultProps = {
  name: '',
  as: 'div',
  onChange: (e) => {},
  disabled: false,
  checked: false
};

Checkbox.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  as: PropTypes.oneOf(['div', 'li', 'span']),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
};

export default Checkbox;
