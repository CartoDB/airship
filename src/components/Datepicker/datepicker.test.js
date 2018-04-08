import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Datepicker from './datepicker';

describe('render', () => {
  it('renders without crashing', () => {
    const component = renderer.create(
      <Datepicker fromMonth={new Date(2018, 8)} toMonth={new Date(2020, 11)} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('click day action', () => {
    const spy = jest.fn();
    const component = mount(
      <Datepicker
        onDayClick={spy}
        fromMonth={new Date(2018, 8)}
        toMonth={new Date(2020, 11)}
      />
    );

    // It belongs to Month 7, so it's disabled because it's not in the range of valid dates.
    component
      .find('.DayPicker-Day')
      .at(2)
      .simulate('click');
    expect(spy).not.toHaveBeenCalled();

    component
      .find('.DayPicker-Day')
      .at(10)
      .simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
