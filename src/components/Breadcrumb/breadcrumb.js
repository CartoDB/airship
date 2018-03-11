import React, { Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
StyledItem.displayName = 'StyledItem';

const Item = ({ children, path, last, ...other }) => {
  return (
    <StyledItem>{last ? children : <a href={path}>{children}</a>}</StyledItem>
  );
};

Item.propTypes = {
  path: PropTypes.string,
  last: PropTypes.bool
};

const Breadcrumb = ({ children, ...other }) => {
  const number = Children.count(children);
  return (
    <StyledList>
      {Children.map(children, (child, i) => {
        return React.cloneElement(child, {
          last: i === number - 1,
          key: i
        });
      })}
    </StyledList>
  );
};

Breadcrumb.Item = Item;

export default Breadcrumb;
