import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants';
import CloseIcon from '../Icons/close';

const StyledBadge = styled.li`
  background: ${(props) => props.color};
  border-radius: 100px;
  font: 400 12px/20px 'Roboto';
  color: ${colors.type01};
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

const noOp = (e) => {};

const Badge = ({
  color = colors.ui03,
  closeColor = colors.ui01,
  children,
  closable = false,
  onClose = noOp,
  as = 'li'
}) => {
  const Wrapper = as ? StyledBadge.withComponent(as) : StyledBadge;
  return (
    <Wrapper color={color}>
      {children}
      {closable ? (
        <button onClick={onClose}>
          <CloseIcon width={12} height={12} color={closeColor} />
        </button>
      ) : null}
    </Wrapper>
  );
};

Badge.propTypes = {
  as: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  color: PropTypes.string,
  closeColor: PropTypes.string
};

export default Badge;
