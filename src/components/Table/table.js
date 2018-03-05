import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

/*
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
        <Table.HeaderCell>Header</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
        <Table.Cell>Cell</Table.Cell>
      </Table.Row>
    </Table.Body>
  <Table>
*/

const StyledTable = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #d1d5d7;
  width: 100%;
  font: 400 12px/20px 'Roboto';
  color: #2c2c2c;

  th {
    font-weight: 600;
    text-align: left;
    background: #e2e6e3;
  }

  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid #d1d5d7;
    border-right: ${(props) => (props.lined ? '1px solid #d1d5d7' : null)};
  }

  tr:last-child td {
    border-bottom: 0;
  }

  tr:hover,
  td:hover {
    background: rgba(71, 219, 153, 0.16);
  }

  th:last-child,
  td:last-child {
    border-right: ${(props) => (props.lined ? 0 : null)};
  }
`;

const Header = ({ children }) => {
  return <thead>{children}</thead>;
};

const HeaderCell = ({ children }) => {
  return <th>{children}</th>;
};

const Body = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const Row = ({ children }) => {
  return <tr>{children}</tr>;
};

const Cell = ({ children }) => {
  return <td>{children}</td>;
};

const Table = ({ children, lined }) => {
  return (
    <React.Fragment>
      <StyledTable lined={lined}>{children}</StyledTable>
    </React.Fragment>
  );
};

Table.Header = Header;
Table.HeaderCell = HeaderCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

Table.propTypes = {
  lined: PropTypes.bool
};

export default Table;
