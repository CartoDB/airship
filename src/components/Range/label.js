import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const StyledLabel = styled.span`
  color: ${props => (props.disabled ? props.theme.ui03 : props.theme.type01)};
  font: 500 10px/12px 'Roboto';
  white-space: nowrap;
  user-select: none;
  display: inline-block;
  margin-top: 4px;
`;
StyledLabel.defaultProps = {
  theme,
};

const Label = ({ children, disabled, formatLabel, type }) => {
  const labelValue = formatLabel ? formatLabel(children, type) : children;

  return <StyledLabel disabled={disabled}>{labelValue}</StyledLabel>;
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  formatLabel: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default Label;
