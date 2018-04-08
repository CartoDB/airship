import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants';

const StyledList = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 24px 0;
`;
StyledList.displayName = 'StyledList';

const StyledItem = styled.li`
  color: #2e3c43;
  font: 400 12px/16px 'Roboto';

  &:after {
    content: '›';
    font-size: 12px;
    margin: 0 6px;
  }

  &:last-child:after {
    display: none;
  }

  a {
    color: ${colors.brand01};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
StyledItem.displayName = 'StyledItem';

const Item = ({
  children,
  path,
  last,
  ...other, // eslint-disable-line
}) => (
  <StyledItem>{last ? children : <a href={path}>{children}</a>}</StyledItem>
);

Item.propTypes = {
  children: PropTypes.node,
  last: PropTypes.bool,
  path: PropTypes.string,
};

const Breadcrumb = ({ children }) => {
  const number = Children.count(children);
  return (
    <StyledList>
      {Children.map(children, (child, index) => React.cloneElement(child, {
          last: index === number - 1,
          key: index,
        }))}
    </StyledList>
  );
};

Breadcrumb.propTypes = {
  children: PropTypes.node,
};

Breadcrumb.Item = Item;

export default Breadcrumb;
