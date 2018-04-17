import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import { theme } from '../../constants';

const Header = ({ children }) => <thead>{children}</thead>;

Header.propTypes = {
  children: PropTypes.node,
};

const HeaderCell = ({ children, ...props }) => <th {...props}>{children}</th>;

HeaderCell.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
};

const Body = ({ children }) => <tbody>{children}</tbody>;

Body.propTypes = {
  children: PropTypes.node,
};

const Row = ({ children }) => <tr>{children}</tr>;

Row.propTypes = {
  children: PropTypes.node,
};

const Cell = ({ children, ...props }) => <td {...props}>{children}</td>;

Cell.propTypes = {
  children: PropTypes.node,
  colSpan: PropTypes.number,
  rowSpan: PropTypes.number,
};

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid ${props => props.theme.ui04};
  width: 100%;
  font: 400 12px/20px 'Roboto';
  color: ${props => props.theme.type01};

  th {
    font-weight: 600;
    text-align: left;
    background: ${props => props.theme.ui03};
  }

  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid ${props => props.theme.ui04};
    border-right: ${props => (props.lined ? `1px solid ${props.theme.ui04}` : null)};
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tr:hover,
  td:hover {
    background: ${props => rgba(props.theme.brand03, 0.16)};
  }

  th:last-child,
  td:last-child {
    border-right: ${props => (props.lined ? 0 : null)};
  }
`;

Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

Table.propTypes = {
  children: PropTypes.node,
  lined: PropTypes.bool,
};

Table.defaultProps = {
  theme,
};

export default Table;
