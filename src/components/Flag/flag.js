import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../Icons/close';
import { theme, shadows } from '../../constants';

const Wrapper = styled.div`
  background: ${props => props.theme.ui01};
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
Wrapper.displayName = 'Flag';
Wrapper.defaultProps = {
  theme,
};

const FlagIcon = styled.div`
  flex: 0 0 auto;
`;
Wrapper.displayName = 'Flag.Handle';

const FlagContent = styled.div`
  flex: 1;
  padding: 0 8px;
`;
FlagContent.displayName = 'Flag.Content';

const Flag = ({ children, onClick }) => (
  <Wrapper>
    {children}
    <FlagIcon key="flagButton">
      <button onClick={event => onClick(event)}>
        <CloseIcon width={12} height={12} />
      </button>
    </FlagIcon>
  </Wrapper>
);

Flag.Icon = FlagIcon;
Flag.Content = FlagContent;

Flag.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};

export default Flag;
