import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { theme } from '../../constants';
import AlertIcon from '../Icons/alert';

const Wrapper = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.span`
  font: 400 12px/20px 'Roboto';
  margin-bottom: 4px;
  color: ${props => props.theme.type01};
  display: block;
`;
Label.defaultProps = {
  theme,
};

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  & > span {
    font: 600 10px/12px 'Roboto';
    color: ${props => props.theme.support01};
    margin-left: 4px;
  }

  & > svg {
    fill: ${props => props.theme.support01};
  }
`;
ErrorMessage.defaultProps = {
  theme,
};

const inputError = css`
  box-shadow: inset 0 0 0 1px ${props => props.theme.support01};
  background: ${props => rgba(props.theme.support01, 0.12)};

  &:hover,
  &:focus,
  &:hover:focus {
    box-shadow: inset 0 0 0 1px ${props => props.theme.support01};
  }

  &::-webkit-input-placeholder {
    color: ${props => rgba(props.theme.type01, 0.40)};
  }

  &::-moz-placeholder {
    color: ${props => rgba(props.theme.type01, 0.40)};
  }

  &:-ms-input-placeholder {
    color: ${props => rgba(props.theme.type01, 0.40)};
  }
`;

const StyledInput = styled.input`
  font: 400 12px/20px 'Roboto';
  box-sizing: border-box;
  background: ${props => props.theme.white};
  border-radius: 4px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${props => props.theme.ui04};
  box-sizing: border-box;
  color: ${props => props.theme.type01};
  min-height: 32px;
  padding: 6px 8px;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${props => props.theme.ui03};
  }

  &::-moz-placeholder {
    color: ${props => props.theme.ui03};
  }

  &:-ms-input-placeholder {
    color: ${props => props.theme.ui03};
  }

  &:focus,
  &:hover:focus {
    box-shadow: inset 0 0 0 2px ${props => props.theme.brand01};
    outline: none;
  }

  &:hover {
    box-shadow: inset 0 0 0 1px ${props => props.theme.brand03};
  }

  &:invalid {
    ${inputError}
  }

  ${props => props.hasError && inputError}

  &:disabled {
    background: ${props => props.theme.ui02};
    color: ${props => rgba(props.theme.type02, 0.40)};

    &:hover,
    &:focus,
    &:hover:focus {
      box-shadow: inset 0 0 0 1px ${props => props.theme.ui04};
    }

    &::-webkit-input-placeholder {
      color: ${props => rgba(props.theme.type02, 0.40)};
    }

    &::-moz-placeholder {
      color: ${props => rgba(props.theme.type02, 0.40)};
    }

    &:-ms-input-placeholder {
      color: ${props => rgba(props.theme.type02, 0.40)};
    }
  }

  &:read-only {
    background: ${props => props.theme.ui02};
    color: ${props => props.theme.type02};

    &:hover,
    &:focus,
    &:hover:focus {
      box-shadow: inset 0 0 0 1px ${props => props.theme.ui04};
    }

    &::-webkit-input-placeholder {
      color: ${props => props.theme.type02};
    }

    &::-moz-placeholder {
      color: ${props => props.theme.type02};
    }

    &:-ms-input-placeholder {
      color: ${props => props.theme.type02};
    }
  }
`;
StyledInput.defaultProps = {
  theme,
};

const StyledTextArea = StyledInput.withComponent('textarea').extend`
  resize: none;
`;

class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    htmlFor: PropTypes.string.isRequired,
  }

  static defaultProps = {
    type: 'text',
    multiline: false,
  }

  render() {
    const { error, label, multiline, htmlFor, ...other } = this.props;
    const Field = multiline
      ? StyledTextArea
      : StyledInput;

    return (
      <Wrapper htmlFor={htmlFor}>
        {label && <Label>{label}</Label>}

        <Field
          id={htmlFor}
          hasError={!!error}
          {...other}
        />

        {error && (
          <ErrorMessage>
            <AlertIcon width={12} height={12} />
            <span>{error}</span>
          </ErrorMessage>
        )}
      </Wrapper>
    );
  }
}

export default Input;
