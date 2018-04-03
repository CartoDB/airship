import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { darken, lighten, rgba } from 'polished';
import { colors } from '../../constants';
import AlertIcon from '../Icons/alert';
import Text from '../Typography/text';

const Wrapper = styled.label`
  display: block;
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.span`
  font: 400 12px/20px 'Roboto';
  margin-bottom: 4px;
  color: ${colors.type01};
  display: block;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;

  & > span {
    font: 600 10px/12px 'Roboto';
    color: ${colors.support01};
    margin-left: 8px;
  }
`;

const inputError = css`
  box-shadow: inset 0 0 0 1px ${colors.support01};
  background: ${rgba(colors.support01, 0.12)};

  &:hover,
  &:focus,
  &:hover:focus {
    box-shadow: inset 0 0 0 1px ${colors.support01};
  }

  &::-webkit-input-placeholder {
    color: ${rgba(colors.type01, 0.40)};
  }

  &::-moz-placeholder {
    color: ${rgba(colors.type01, 0.40)};
  }

  &:-ms-input-placeholder {
    color: ${rgba(colors.type01, 0.40)};
  }
`;

const StyledInput = styled.input`
  font: 400 12px/20px 'Roboto';
  box-sizing: border-box;
  background: ${colors.white};
  border-radius: 4px;
  border: 0;
  box-shadow: inset 0 0 0 1px ${colors.ui04};
  box-sizing: border-box;
  color: ${colors.type01};
  min-height: 32px;
  padding: 6px 8px;
  width: 100%;

  &::-webkit-input-placeholder {
    color: ${colors.ui03};
  }

  &::-moz-placeholder {
    color: ${colors.ui03};
  }

  &:-ms-input-placeholder {
    color: ${colors.ui03};
  }

  &:focus,
  &:hover:focus {
    box-shadow: inset 0 0 0 2px ${colors.brand01};
    outline: none;
  }

  &:hover {
    box-shadow: inset 0 0 0 1px ${colors.brand03};
  }

  &:invalid {
    ${inputError}
  }

  ${props => props.hasError && inputError}

  &:disabled {
    background: ${colors.ui02};
    color: ${rgba(colors.type02, 0.40)};

    &:hover,
    &:focus,
    &:hover:focus {
      box-shadow: inset 0 0 0 1px ${colors.ui04};
    }

    &::-webkit-input-placeholder {
      color: ${rgba(colors.type02, 0.40)};
    }

    &::-moz-placeholder {
      color: ${rgba(colors.type02, 0.40)};
    }

    &:-ms-input-placeholder {
      color: ${rgba(colors.type02, 0.40)};
    }
  }

  &:read-only {
    background: ${colors.ui02};
    color: ${colors.type02};

    &:hover,
    &:focus,
    &:hover:focus {
      box-shadow: inset 0 0 0 1px ${colors.ui04};
    }

    &::-webkit-input-placeholder {
      color: ${colors.type02};
    }

    &::-moz-placeholder {
      color: ${colors.type02};
    }

    &:-ms-input-placeholder {
      color: ${colors.type02};
    }
  }
`;

class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    multiline: PropTypes.bool,
    rows: PropTypes.number,
    htmlFor: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
    multiline: false,
  }

  render() {
    const { error, label, multiline, htmlFor, ...other } = this.props;
    const Field = multiline
      ? StyledInput.withComponent('textarea').extend`resize: none;`
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
            <AlertIcon width={12} height={12} color={colors.support01} />
            <span>{error}</span>
          </ErrorMessage>
        )}
      </Wrapper>
    );
  }
}

export default Input;
