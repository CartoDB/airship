import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CloseIcon from '../Icons/close';
import { shadows } from '../../constants';

const Banner = styled.div`
  display: flex;
  padding: 12px;
  border-radius: 0;
  width: 100%;
  background-color: ${(props) => props.color};
`;

const StyledHandle = styled.div`
  flex: 0 0 auto;
`;
StyledHandle.displayName = 'Banner.Handle';

const StyledContent = styled.div`
  flex: 1;
  padding: 0 8px;
`;
StyledContent.displayName = 'Banner.Content';

Banner.Icon = StyledHandle;
Banner.Content = StyledContent;

Banner.propTypes = {
  color: PropTypes.string
};

export default Banner;
