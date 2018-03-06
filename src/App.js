import React, { Component } from 'react';
import {
  Grid,
  Jumbo,
  Display,
  Title,
  Subheader,
  Text,
  Caption,
  Button,
  ButtonGroup,
  PlusIcon,
  SearchIcon,
  PointIcon,
  LeftArrowIcon,
  RightArrowIcon,
  TopArrowIcon,
  BottomArrowIcon,
  ChevronIcon,
  Tabs,
  Dropdown,
  Table,
  Toggle,
  Dropshadow
} from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Grid width={300} gap={20} align="center">
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
        </Grid>

        <Jumbo margin="0 0 20px">
          I'm thinking two circus clowns dancing. You?
        </Jumbo>
        <Jumbo as="h2">I'm a Jumbo h2</Jumbo>
        <Jumbo as="h2" font="mono">
          I'm a Jumbo h2 mono
        </Jumbo>
        <Jumbo as="h2" weight="medium">
          I'm a Jumbo h2 medium
        </Jumbo>
        <Jumbo as="h3" color="#ff9900">
          I'm a Jumbo h3
        </Jumbo>

        <Display margin="0 0 20px">
          I'm thinking two circus clowns dancing. You?
        </Display>
        <Display as="h2">I'm a Display h2</Display>
        <Display as="h3" color="#ff9900">
          I'm a Display h3
        </Display>

        <Title>I'm thinking two circus clowns dancing. You?</Title>
        <Title as="h2">I'm a Title h2</Title>
        <Title as="h3" color="#ff9900">
          I'm a Title h3
        </Title>
        <Title as="h3" weight="medium">
          I'm a Title h3
        </Title>

        <Subheader>I'm thinking two circus clowns dancing. You?</Subheader>
        <Subheader as="h2">I'm a Subheader h2</Subheader>
        <Subheader as="h2" weight="medium">
          I'm a Subheader h2
        </Subheader>
        <Subheader as="h2" font="mono">
          I'm a Subheader h2 mono
        </Subheader>
        <Subheader as="h3" color="#ff9900">
          I'm a Subheader h3
        </Subheader>

        <Text>I'm thinking two circus clowns dancing. You?</Text>
        <Text as="div">I'm a Text div</Text>
        <Text color="#ff9900">I'm a Text colored</Text>
        <Text as="div" font="mono">
          I'm a Text div mono
        </Text>

        <Caption as="span">I'm a Caption span</Caption>
        <Caption font="mono" color="skyblue">
          I'm a Caption mono as span
        </Caption>
        <Caption as="div" weight="medium" color="skyblue">
          I'm a Caption medium
        </Caption>

        <div style={{ marginLeft: '10px' }}>
          <h3>Button text only</h3>
          <Button>Button</Button>
          <Button large>Button large</Button>
          <Button small>Button small</Button>
          <h3>Button icon + text</h3>
          <Button>
            <PlusIcon />
            Button
          </Button>
          <Button large>
            <PlusIcon />
            Button
          </Button>
          <Button small>
            <PlusIcon />
            Button
          </Button>
          <h3>Button icon only</h3>
          <Button>
            <PlusIcon />
          </Button>
          <Button large>
            <PlusIcon />
          </Button>
          <Button large>Large</Button>
          <h3>Button secondary</h3>
          <Button secondary>Button</Button>
          <Button secondary large>
            Button large
          </Button>
          <Button secondary large>
            <PlusIcon />
            Button large
          </Button>
          <Button secondary large disabled>
            <PlusIcon />
            Button large
          </Button>
          <Button secondary small>
            Button small
          </Button>
          <h3>Button borderless</h3>
          <Button borderless>Button</Button>
          <Button borderless large>
            Button large
          </Button>
          <Button borderless small>
            Button small
          </Button>
        </div>
        <div>
          <div style={{ padding: '10px' }}>
            <ButtonGroup>
              <Button>
                <PlusIcon />
              </Button>
              <Button>Mundo</Button>
              <Button>Happy</Button>
            </ButtonGroup>
          </div>
          <div style={{ padding: '10px' }}>
            <ButtonGroup secondary>
              <Button>
                <PlusIcon />
              </Button>
              <Button>Mundo</Button>
              <Button>Happy</Button>
            </ButtonGroup>
          </div>
        </div>
        <div>
          <PlusIcon />
          <SearchIcon />
          <PointIcon />
          <LeftArrowIcon />
          <RightArrowIcon />
          <TopArrowIcon />
          <BottomArrowIcon />
        </div>
        <div>
          <Tabs selected={1}>
            <Tabs.Panel label="wadus">Hola</Tabs.Panel>
            <Tabs.Panel label="world">Mundo</Tabs.Panel>
          </Tabs>
        </div>

        <div>
          <Tabs selected="world">
            <Tabs.Panel label="wadus">Hola</Tabs.Panel>
            <Tabs.Panel label="world">Mundo</Tabs.Panel>
          </Tabs>
        </div>

        <div>
          <Tabs large>
            <Tabs.Panel label="wadus">Hola</Tabs.Panel>
            <Tabs.Panel label="world">Mundo</Tabs.Panel>
          </Tabs>
        </div>

        <div style={{ padding: '10px' }}>
          <Dropdown>
            <Dropdown.Trigger>
              <Button>Click me</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item>All</Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Fullfilled</Dropdown.Item>
                <Dropdown.Item>Close</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown>
        </div>

        <div style={{ padding: '10px' }}>
          <Dropdown action="over">
            <Dropdown.Trigger as="span">
              <Button borderless>
                Hover me&nbsp;<ChevronIcon width={8} height={4} />
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => console.log(e.target)}>
                  All
                </Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Fullfilled</Dropdown.Item>
                <Dropdown.Item>Close</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown>
        </div>

        <div style={{ padding: '10px' }}>
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
          </Table>
        </div>

        <div style={{ padding: '10px' }}>
          <Table lined>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan={3}>Header</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell rowSpan={2}>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
                <Table.Cell>Cell</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div style={{ padding: '10px' }}>
          <Toggle htmlFor="wadus" onChange={(state) => console.log(state)} />
          <Toggle htmlFor="foo" checked />
          <Toggle htmlFor="foone" disabled />
        </div>

        <div style={{ padding: '10px' }}>
          <Dropshadow>
            <div style={{ padding: '10px', background: '#fff' }}>Shadow 4</div>
          </Dropshadow>
        </div>

        <div style={{ padding: '10px' }}>
          <Dropshadow size={8}>
            <div style={{ padding: '10px', background: '#fff' }}>Shadow 8</div>
          </Dropshadow>
        </div>

        <div style={{ padding: '10px' }}>
          <Dropshadow size={16}>
            <div style={{ padding: '10px', background: '#fff' }}>Shadow 16</div>
          </Dropshadow>
        </div>
      </div>
    );
  }
}

export default App;
