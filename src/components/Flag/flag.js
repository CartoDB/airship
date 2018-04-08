import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../Icons/close';
import { shadows } from '../../constants';

const StyledFlag = styled.div`
  display: flex;
  padding: 16px;
  border-radius: 4px;
  box-shadow: ${shadows.shadow16};
  max-width: 260px;

  button {
    border: 0;
    background: transparent;
    box-shadow: 0;
    outline: none;
    padding: 0;
  }
`;
StyledFlag.displayName = 'StyledFlag';

const StyledHandle = styled.div`
  flex: 0 0 auto;
`;
StyledFlag.displayName = 'Flag.Handle';

const StyledContent = styled.div`
  flex: 1;
  padding: 0 8px;
`;
StyledContent.displayName = 'Flag.Content';

const Flag = ({ children, onClick }) => {
  const childrenWithControl = Children.map(children, (child, index) => React.cloneElement(child, { key: `flag${index}` })).concat([
    <StyledHandle key="flagButton">
      <button onClick={() => onClick()}>
        <CloseIcon width={12} height={12} />
      </button>
    </StyledHandle>,
  ]);

  return <StyledFlag>{childrenWithControl}</StyledFlag>;
};

Flag.Icon = StyledHandle;
Flag.Content = StyledContent;

Flag.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default Flag;
