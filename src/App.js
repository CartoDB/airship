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
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon,
  CloseIcon,
  CheckIcon,
  PencilIcon,
  HomeIcon,
  InfoIcon,
  MinusIcon,
  PointsIcon,
  QuestionIcon,
  SettingsIcon,
  CheckFillIcon,
  CheckRoundedIcon,
  AlertIcon,
  AlertFillIcon,
  Tabs,
  Dropdown,
  Table,
  Toggle,
  Dropshadow,
  Range,
  Breadcrumb,
  Loading,
  Avatar,
  Badget,
  Tooltip,
  Collapsible,
  Steps,
  Legend,
  Flag,
  Banner,
  Datepicker,
  Radiobutton,
  Checkbox,
  Typeahead
} from './components';
import { colors } from './constants';

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
          <PlusIcon /> <SearchIcon /> <PointIcon /> <LeftArrowIcon />{' '}
          <RightArrowIcon /> <TopArrowIcon /> <BottomArrowIcon />{' '}
          <ChevronDownIcon /> <ChevronUpIcon /> <ChevronLeftIcon />{' '}
          <ChevronRightIcon /> <MenuIcon /> <CloseIcon /> <CheckIcon />{' '}
          <PencilIcon /> <HomeIcon /> <InfoIcon /> <MinusIcon /> <PointsIcon />{' '}
          <QuestionIcon /> <SettingsIcon /> <CheckFillIcon />{' '}
          <CheckRoundedIcon /> <AlertIcon /> <AlertFillIcon />
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
                Hover me&nbsp;<ChevronDownIcon width={8} height={4} />
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
          <Dropdown action="over" size={300}>
            <Dropdown.Trigger as="span">
              <Dropdown.Button>
                Dropdown <ChevronDownIcon width={12} height={12} />
              </Dropdown.Button>
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
        <div style={{ padding: '10px' }}>
          <Range
            onChangeStart={(value) => console.log('start', value)}
            onChange={(value) => console.log(value)}
            onChangeComplete={(value) => console.log('complete', value)}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Range
            disabled
            width={300}
            maxValue={20}
            minValue={0}
            value={10}
            onChangeStart={(value) => console.log('start', value)}
            onChange={(value) => console.log(value)}
            onChangeComplete={(value) => console.log('complete', value)}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Range
            maxValue={30}
            minValue={0}
            value={{ min: 5, max: 10 }}
            onChangeStart={(value) => console.log('start', value)}
            onChange={(value) => console.log(value)}
            onChangeComplete={(value) => console.log('complete', value)}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Range
            draggable
            maxValue={30}
            minValue={0}
            value={{ min: 5, max: 10 }}
            onChangeStart={(value) => console.log('start', value)}
            onChange={(value) => console.log(value)}
            onChangeComplete={(value) => console.log('complete', value)}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Range
            maxValue={30}
            minValue={0}
            value={5}
            onChange={(value) => console.log(value)}
            step={0.5}
          />
        </div>
        <div style={{ padding: '10px' }}>
          <Breadcrumb>
            <Breadcrumb.Item path="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item path="/foo">Foo</Breadcrumb.Item>
            <Breadcrumb.Item>Wadus</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div style={{ padding: '10px' }}>
          <Loading />
        </div>
        <div style={{ padding: '10px', backgroundColor: '#000' }}>
          <Loading negative />
        </div>
        <div style={{ padding: '10px' }}>
          <Loading size={48} />
        </div>
        <div style={{ padding: '10px' }}>
          <Avatar url="" />

          <Avatar url="https://avatars0.githubusercontent.com/u/1366843" />
          <Avatar
            size={32}
            url="https://avatars0.githubusercontent.com/u/1366843"
          />
          <Avatar
            size={48}
            url="https://avatars0.githubusercontent.com/u/1366843"
          />
        </div>

        <div style={{ padding: '10px' }}>
          <Badget>Foo</Badget>

          <Badget color="rgba(128, 182, 34, 0.24)">Foo</Badget>
          <Badget as="span" color="skyblue">
            See you in Mars
          </Badget>
          <Badget color="#B4E0FA">Store 1</Badget>
          <Badget color="#E4D8EB" closable>
            Store 2
          </Badget>

          <Badget closable closeColor="#1785FB">
            Store 3
          </Badget>
        </div>

        <div style={{ padding: '20px 100px' }}>
          <Tooltip>
            <Tooltip.Content>Hola mundo</Tooltip.Content>
            <Tooltip.Trigger>tooltip</Tooltip.Trigger>
          </Tooltip>{' '}
          <Tooltip to="bottom">
            <Tooltip.Content>Hola mundo</Tooltip.Content>
            <Tooltip.Trigger>tooltip</Tooltip.Trigger>
          </Tooltip>
        </div>
        <div style={{ padding: '50px 100px' }}>
          <Tooltip to="left">
            <Tooltip.Content>Hola mundo</Tooltip.Content>
            <Tooltip.Trigger>tooltip</Tooltip.Trigger>
          </Tooltip>{' '}
          <Tooltip to="right">
            <Tooltip.Content>Hola mundo</Tooltip.Content>
            <Tooltip.Trigger>tooltip</Tooltip.Trigger>
          </Tooltip>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ width: '300px', marginBottom: '20px' }}>
            <Collapsible>
              <Collapsible.Header>Header</Collapsible.Header>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible>
          </div>

          <div style={{ width: '300px' }}>
            <Collapsible open={false}>
              <Collapsible.Header>Header</Collapsible.Header>
              <Collapsible.Content>Content</Collapsible.Content>
            </Collapsible>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <div style={{ width: '400px', marginBottom: '20px' }}>
            <Steps>
              <Steps.Header>Header</Steps.Header>
              <Steps.Content>Content 1</Steps.Content>
              <Steps.Content>Content 2</Steps.Content>
              <Steps.Content>Content 3</Steps.Content>
              <Steps.Content>Content 4</Steps.Content>
            </Steps>
          </div>

          <div style={{ width: '400px' }}>
            <Steps step={2}>
              <Steps.Header>Header</Steps.Header>
              <Steps.Content>Content 1</Steps.Content>
              <Steps.Content>Content 2</Steps.Content>
              <Steps.Content>Content 3</Steps.Content>
              <Steps.Content>Content 4</Steps.Content>
            </Steps>
          </div>
        </div>

        <div style={{ padding: '20px' }}>
          <Legend style={{ marginBottom: '20px' }}>
            <Legend.Panel>
              <Steps>
                <Steps.Header>Header</Steps.Header>
                <Steps.Content>Content 1</Steps.Content>
                <Steps.Content>Content 2</Steps.Content>
                <Steps.Content>Content 3</Steps.Content>
                <Steps.Content>Content 4</Steps.Content>
              </Steps>
            </Legend.Panel>
          </Legend>

          <Legend>
            <Legend.Panel>
              <Collapsible>
                <Collapsible.Header>Header</Collapsible.Header>
                <Collapsible.Content>Content</Collapsible.Content>
              </Collapsible>
            </Legend.Panel>
            <Legend.Panel>
              <Collapsible>
                <Collapsible.Header>Postal Code</Collapsible.Header>
                <Collapsible.Content>Content</Collapsible.Content>
              </Collapsible>
            </Legend.Panel>
          </Legend>
        </div>

        <div style={{ padding: '20px' }}>
          <Flag onClick={(e) => console.log('flag closed')}>
            <Flag.Icon>
              <AlertFillIcon color={colors.support02} width={12} height={12} />
            </Flag.Icon>
            <Flag.Content>
              <Text color={colors.type01} weight="medium">
                You are now conected
              </Text>
              <Text color={colors.type02}>
                You have been added to the group “New Store on this region”
              </Text>
            </Flag.Content>
          </Flag>
        </div>

        <div style={{ padding: '20px' }}>
          <Banner color="red">
            <Banner.Icon>
              <AlertFillIcon color={colors.white} width={12} height={12} />
            </Banner.Icon>
            <Banner.Content>
              <Text color={colors.type04}>
                An error has ocurred. Could not retreive customer information
              </Text>
            </Banner.Content>
          </Banner>
        </div>

        <div style={{ padding: '20px' }}>
          <Datepicker
            onDayClick={(range) => console.log(range)}
            initialMonth={new Date(2018, 9)}
            fromMonth={new Date(2018, 8)}
            toMonth={new Date(2020, 11)}
            disabledDays={[
              new Date(2018, 8, 12),
              new Date(2018, 8, 17),
              { after: new Date(2018, 8, 20), before: new Date(2018, 8, 25) }
            ]}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <Datepicker
            fromMonth={new Date(2018, 8)}
            toMonth={new Date(2020, 11)}
            selectedDays={[
              { after: new Date(2018, 8, 20), before: new Date(2018, 8, 25) }
            ]}
          />
        </div>

        <div style={{ padding: '20px' }}>
          <Radiobutton.Group
            name="wadus"
            onChange={(state) => console.log(state)}
            selected="hola"
          >
            <Radiobutton value="hola">
              <Text>Hola</Text>
            </Radiobutton>
            <Radiobutton value="mundo">
              <Text>Mundo</Text>
            </Radiobutton>
          </Radiobutton.Group>

          <Radiobutton.Group name="foo" selected="hola" disabled>
            <Radiobutton value="hola">
              <Text>Hola</Text>
            </Radiobutton>
            <Radiobutton value="mundo">
              <Text>Mundo</Text>
            </Radiobutton>
          </Radiobutton.Group>
        </div>

        <div style={{ padding: '20px' }}>
          <Checkbox value={1} onChange={(state) => console.log(state)} />
          <Checkbox value="wadus" checked>
            <Text>Hola</Text>
          </Checkbox>

          <Checkbox value="wadus" checked disabled>
            <Text>Hola</Text>
          </Checkbox>
        </div>

        <div style={{ padding: '20px' }}>
          <Typeahead />
          <Typeahead query="wadus" />
          <Typeahead loading />
        </div>
      </div>
    );
  }
}

export default App;
