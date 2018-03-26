import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SubHeader from '../Typography/subheader';
import Base from '../Typography/base';
import { colors } from '../../constants';

const StyledWidget = styled.div`
  background: ${colors.white};
  padding: 16px;
  width: 260px;
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

const Widget = props => {
  const { children, description, title } = props;

  return (
    <StyledWidget>
      {children}
    </StyledWidget>
  )
};

Widget.defaultProps = {
  title: '',
  description: '',
};

Widget.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

Widget.Title = Title;
Widget.Description = Description;

export default Widget;
