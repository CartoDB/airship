import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';
import { theme } from '../../constants';
import RadioGroup from './radiogroup';

const radioIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
    transform-origin: 50% 50%;
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const Label = styled.div`
  margin-left: 4px;
  font: 400 12px/20px 'Roboto';
`;

const StyledRadio = styled.div`
  position: relative;
`;

const Decoration = styled.span`
  pointer-events: none;
  width: 16px;
  height: 16px;
  border: 1px solid ${props => rgba(props.theme.type01, 0.16)};
  border-radius: 50%;
  position: relative;
  display: block;

  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    width: 6px;
    height: 6px;
  }
`;
Decoration.defaultProps = {
  theme,
};

const Wrapper = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
`;

const RadioInput = styled.input`
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
  border-radius: 50%;

  &:focus {
    outline: none;
  }

  &:hover + ${Decoration} {
    border: 1px solid ${props => props.theme.brand03};
  }

  &:checked + ${Decoration} {
    border: 1px solid ${props => props.theme.brand01};
  }

  &:checked:disabled + ${Decoration} {
    border: 1px solid ${props => rgba(props.theme.type01, 0.16)};
  }

  &:checked + ${Decoration} {
    &::after {
      opacity: 1;
      background: ${props => props.theme.brand01};
      animation: ${radioIn} 300ms;
      animation-fill-mode: forwards;
    }
  }

  &:checked:disabled + ${Decoration}::after {
    background: ${props => rgba(props.theme.type01, 0.16)};
  }

  &:disabled:hover {
    cursor: not-allowed;
  }

  &:disabled + ${Decoration} {
    background-color: ${props => props.theme.ui03};
  }

  &:disabled:hover + ${Decoration} {
    border: 1px solid ${props => rgba(props.theme.type01, 0.16)};
  }
`;
RadioInput.defaultProps = {
  theme,
};

const RadioButton = ({ children, name, value, disabled, checked, onChange }) => (
  <Wrapper>
    <StyledRadio>
      <RadioInput
        type="radio"
        name={name}
        value={value}
        onChange={event => onChange(event)}
        disabled={disabled}
        checked={checked}
      />
      <Decoration />
    </StyledRadio>

    {children && <Label>{children}</Label>}
  </Wrapper>
);

RadioButton.Group = RadioGroup;

RadioButton.defaultProps = {
  disabled: false,
  name: '',
  onChange: () => {},
  checked: false,
};

RadioButton.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  value: PropTypes.string.isRequired,
};

export default RadioButton;
