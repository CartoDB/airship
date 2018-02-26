import React from 'react';
import ButtonGroup from './button-group';
import Button from './button';
import PlusIcon from '../Icons/plus';
import renderer from 'react-test-renderer';

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
    let tree = component.toJSON();
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
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
