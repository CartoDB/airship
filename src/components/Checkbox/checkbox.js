import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { rgba, darken } from 'polished';
import { theme } from '../../constants';

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
`;

const StyledCheckbox = styled.div`
  position: relative;
`;

const Label = styled.div`
  margin-left: 4px;
  font: 400 12px/20px 'Roboto';
`;

const Svg = styled.svg`
  pointer-events: none;
  width: 16px;
  height: 16px;
  overflow: hidden;
  border-radius: 3px;
  position: relative;
  display: block;
  box-sizing: border-box;
`;

const Check = styled.polyline`
  fill: none;
  stroke-width: 2;
  stroke: ${props => props.theme.brand01};
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  transform: translate(2px, 4px);
`;
Check.defaultProps = {
  theme,
};

const CheckboxInput = styled.input`
  appearance: none;
  background: none;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.ui04};
  cursor: pointer;
  height: 16px;
  left: 0;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  transition: border 0.2s ease;
  width: 16px;

  &:focus {
    outline: none;
    border: 2px solid ${props => props.theme.brand01};
  }

  &:hover {
    border-color: ${props => props.theme.brand03};
  }

  &:checked {
    border-color: ${props => props.theme.brand01};

    & + ${Svg} ${Check} {
      animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 300ms forwards;
    }
  }

  ${props => props.error && css`
    background: ${props => rgba(props.theme.support01, 0.12)};
    border-color: ${props => props.theme.support01};

    &:focus {
      border-color: ${props => props.theme.support01};
    }

    &:hover {
      border-color: ${props => darken(0.16, props.theme.support01)};
    }

    &:checked {
      border-color: ${props => props.theme.support01};

      & + ${Svg} ${Check} {
       stroke: ${props => props.theme.support01};
      }
    }
  `};

  &:disabled {
    background-color: ${props => props.theme.ui02};
    cursor: not-allowed;
    border-color: ${props => props.theme.ui04};

    &:checked + ${Svg} ${Check} {
      stroke: ${props => props.theme.ui04};
    }
  }
`;
CheckboxInput.defaultProps = {
  theme,
};

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
    const { as, children, disabled, error, htmlFor, name } = this.props;
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
            error={error}
          />
          <Svg>
            <Check points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191" />
          </Svg>
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
  error: false,
  name: '',
  onChange: () => {},
};

Checkbox.propTypes = {
  as: PropTypes.string,
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  htmlFor: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default Checkbox;
