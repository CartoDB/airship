import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';
import { colors } from '../../constants';

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const Wrapper = styled.label`
  display: flex;
  align-items: center;
`;

const StyledCheckbox = styled.div`
  position: relative;
`;

const Label = styled.div`
  margin-left: 4px;
  font: 400 12px/20px 'Roboto';
`;

const Decoration = styled.span`
  pointer-events: none;
  width: 16px;
  height: 16px;
  overflow: hidden;
  border: 1px solid ${rgba(colors.type01, 0.16)};
  border-radius: 3px;
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const Tip = styled.svg`
  display: flex;
  position: relative;
  transform: translateX(1px) translateY(3px);
`;

const Check = styled.polyline`
  stroke-width: 2;
  stroke: ${colors.brand01};
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
`;

const CheckboxInput = styled.input`
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

  &:focus {
    outline: none;
  }

  &:focus {
    border: 2px solid ${colors.brand01};
  }

  &:hover {
    border: 1px solid ${colors.brand03};
  }

  &:disabled + ${Decoration} {
    background-color: ${colors.ui03};
  }

  &:disabled:hover {
    cursor: not-allowed;
    border: 1px solid ${rgba(colors.type01, 0.16)};
  }

  &:checked {
    border: 1px solid ${colors.brand01};
  }

  &:checked + ${Decoration} ${Check} {
    animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 300ms forwards;
  }

  &:disabled:checked + ${Decoration} ${Check} {
    stroke: ${rgba(colors.type01, 0.16)};
  }
`;

class Checkbox extends Component {
  state = {
    checked: !!this.props.checked,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  clickHandler = () => {
    const { onChange, disabled } = this.props;

    if (disabled) return;

    this.setState(
      state => ({ ...state, checked: !state.checked }),
      () => onChange && onChange(this.state)
    );
  };

  render() {
    const { children, name, as, disabled, htmlFor } = this.props;
    const { checked } = this.state;
    const WrapperComponent = as !== 'div' ? Wrapper.withComponent(as) : Wrapper;

    return (
      <WrapperComponent htmlFor={htmlFor}>
        <StyledCheckbox>
          <CheckboxInput
            id={htmlFor}
            type="checkbox"
            name={name}
            onChange={this.clickHandler}
            disabled={disabled}
            checked={checked}
          />
          <Decoration>
            <Tip width="12px" height="12px">
              <g fill="none">
                <Check points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191" />
              </g>
            </Tip>
          </Decoration>
        </StyledCheckbox>

        {children && <Label>{children}</Label>}
      </WrapperComponent>
    );
  }
}

Checkbox.defaultProps = {
  as: 'div',
  checked: false,
  disabled: false,
  name: '',
  onChange: () => {},
};

Checkbox.propTypes = {
  as: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
