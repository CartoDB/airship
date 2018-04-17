import styled from 'styled-components';
import PropTypes from 'prop-types';
import { theme } from '../../constants';

const BreadcrumbItem = styled.li`
  color: ${props => props.theme.type01};
  font: 400 12px/16px 'Roboto';
  cursor: default;

  &:after {
    content: '›';
    color: ${props => props.theme.brand01};
    font-size: 12px;
    margin: 0 6px;
  }

  &:last-child:after {
    display: none;
  }

  a {
    color: ${props => props.theme.brand01};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
BreadcrumbItem.displayName = 'BreadcrumbItem';

BreadcrumbItem.defaultProps = {
  theme,
};

const Breadcrumb = styled.ul`
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
Breadcrumb.displayName = 'Breadcrumb';

Breadcrumb.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

Breadcrumb.defaultProps = {
  theme,
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
