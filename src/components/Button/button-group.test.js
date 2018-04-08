import React from 'react';
import renderer from 'react-test-renderer';
import ButtonGroup from './button-group';
import Button from './button';
import PlusIcon from '../Icons/plus';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <ButtonGroup>
        <Button>
          <PlusIcon />
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
          <PlusIcon />
        </Button>
        <Button>Mundo</Button>
        <Button>Happy</Button>
      </ButtonGroup>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
