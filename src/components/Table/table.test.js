import React from 'react';
import renderer from 'react-test-renderer';
import Table from './table';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with lined param', () => {
    const component = renderer.create(
      <Table lined>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Header</Table.HeaderCell>
            <Table.HeaderCell>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with colSpan and rowSpan params for cells', () => {
    const component = renderer.create(
      <Table lined>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Header</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell rowSpan={2}>Cell</Table.Cell>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Cell</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
