import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../constants';
import CloseIcon from '../Icons/close';

const StyledBadge = styled.li`
  background: ${props => props.color || props.theme.ui03};
  border-radius: 100px;
  font: 400 12px/20px 'Roboto';
  color: ${props => props.theme.type01};
  letter-spacing: 0;
  list-style: none;
  display: inline-flex;
  align-items: center;
  padding: 0 8px;

  button {
    cursor: pointer;
    margin: 0 0 0 8px;
    border: 0;
    box-shadow: 0;
    background: transparent;
    padding: 0;
    line-height: 1;
    outline: none;
  }
`;

StyledBadge.defaultProps = {
  theme,
};

const Badge = ({ color, closeColor, children, onClose, as }) => {
  const Wrapper = as ? StyledBadge.withComponent(as) : StyledBadge;

  return (
    <Wrapper color={color}>
      {children}
      {onClose ? (
        <button onClick={event => onClose(event)}>
          <CloseIcon width={12} height={12} color={closeColor} />
        </button>
      ) : null}
    </Wrapper>
  );
};

Badge.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  closeColor: PropTypes.string,
  color: PropTypes.string,
  onClose: PropTypes.func,
};


Badge.defaultProps = {
  as: 'li',
  closeColor: theme.ui01,
};

export default Badge;
