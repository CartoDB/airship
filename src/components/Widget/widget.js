import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Base from '../Typography/base';
import { colors } from '../../constants';

const StyledWidget = styled.div`
  background: ${colors.white};
  padding: 16px;
  width: 280px;
  box-sizing: border-box;
  text-align: left;
`;
StyledWidget.displayName = 'Widget';

const Title = Base.withComponent('h1').extend`
  font-size: 16px;
  line-height: 24px;
`;

const Description = Base.withComponent('p').extend`
  font-size: 12px;
  line-height: 16px;
  color: ${colors.type02};
  margin-bottom: 12px;
`;

const Widget = props => <StyledWidget>{props.children}</StyledWidget>;

Widget.propTypes = {
  children: PropTypes.node,
};

Widget.Title = Title;
Widget.Description = Description;

export default Widget;
