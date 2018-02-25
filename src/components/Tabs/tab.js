import React, { Component } from 'react';
import TabNavigation from './tab-navigation';

/*
  <Tabs>
    <Tabpanel label="wadus">
      Hola
    </Tabpanel>
    <Tabpanel label="world">
      Mundo
    </Tabpanel>
  </Tabs>
*/

class Tabs extends Component {
  constructor(props) {
    super(props);
    const { selected } = props;
    this.navigation = this.buildNavigation();
    this.state = { selected: selected || 0 };
  }

  buildNavigation() {
    const { children } = this.props;
    return React.Children.map(children, (child, i) => {
      return child.props.label;
    });
  }

  onClick = (e, label) => {
    const index = this.navigation.indexOf(label);
    this.setState(state => {
      return {
        ...state,
        selected: index
      };
    });
  };

  render() {
    const { selected } = this.state;
    const { children } = this.props;

    return (
      <div>
        <TabNavigation
          selected={selected}
          labels={this.navigation}
          clickHandler={this.onClick}
        />
        {React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            selected: i === selected
          });
        })}
      </div>
    );
  }
}

export default Tabs;
