import React from 'react';
import renderer from 'react-test-renderer';
import ButtonGroup from './button-group';
import Button from './button';
import Icon from '../Icon/icon';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <ButtonGroup>
        <Button>
          <Icon icon="plus" />
        </Button>
        <Button>Mundo</Button>
        <Button>Happy</Button>
      </ButtonGroup>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders secondary button', () => {
    const component = renderer.create(
      <ButtonGroup secondary>
        <Button>
          <Icon icon="plus" />
        </Button>
        <Button>Mundo</Button>
        <Button>Happy</Button>
      </ButtonGroup>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
