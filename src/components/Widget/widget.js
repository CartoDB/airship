import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SubHeader from '../Typography/subheader';
import Text from '../Typography/text';
import { colors } from '../../constants';

const StyledWidget = styled.div`
  background: ${colors.white};
  padding: 16px;
  width: 260px;
`;
StyledWidget.displayName = 'Widget';

const Widget = props => {
  const { children, description, title } = props;

  return (
    <StyledWidget>
      {title && <SubHeader>{title}</SubHeader>}
      {description && <Text color={colors.type02}>{description}</Text>}
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

export default Widget;
