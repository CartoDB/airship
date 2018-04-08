import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../constants';

const StyledLabel = styled.span`
  color: ${colors.type01};
  font: 500 10px/12px 'Roboto';
  transform: translateZ(0) translateX(-50%);
  white-space: nowrap;
  position: absolute;
  top: 10px;

  .is-disabled & {
    color: ${colors.ui03};
  }
`;

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
