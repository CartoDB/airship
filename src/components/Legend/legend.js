import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { shadows, colors } from '../../constants';

/*
  <Legend>
    <Legend.Panel>
      ...
    </Legend.Panel>
  </Legend>
*/

const StyledLegend = styled.div`
  border-radius: 4px;
  background-color: ${colors.ui01};
  width: ${props => (props.small ? 160 : 260)}px;
  box-shadow: ${shadows.shadow8};
`;

const StyledPanel = styled.div`
  padding: ${props => (props.small ? '18px 10px' : '26px 20px')};
  position: relative;

  img {
    max-width: 100%;
  }

  &:before {
    content: '';
    height: 2px;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${colors.ui02};
    position: absolute;
  }

  &:first-child:before {
    display: none;
  }
`;

const Legend = ({ children, small, style }) => (
  <StyledLegend small={small} style={style}>
    {children}
  </StyledLegend>
);

Legend.Panel = StyledPanel;

Legend.defaultProps = {
  small: false,
};

Legend.propTypes = {
  children: PropTypes.node,
  small: PropTypes.bool,
  style: PropTypes.object,
};

export default Legend;
