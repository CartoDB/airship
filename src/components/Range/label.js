import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

const StyledLabel = styled.span`
  color: ${props => props.theme.type01};
  font: 500 10px/12px 'Roboto';
  white-space: nowrap;
  user-select: none;
  display: inline-block;
  margin-top: 4px;

  .is-disabled & {
    color: ${props => props.theme.ui03};
  }
`;
StyledLabel.defaultProps = {
  theme,
};

const Label = props => {
  const labelValue = props.formatLabel
    ? props.formatLabel(props.children, props.type)
    : props.children;

  return <StyledLabel>{labelValue}</StyledLabel>;
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  formatLabel: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default Label;
