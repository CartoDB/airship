import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './button';
import { isComponentOfType } from '../../utils';
import { theme } from '../../constants';

const Wrapper = styled.div`
  border-radius: 4px;
  display: inline-flex;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
Wrapper.defaultProps = {
  theme,
};

class ButtonGroup extends Component {
  render() {
    const { children, secondary, ...other } = this.props;

    return (
      <Wrapper {...other}>
        {React.Children.map(children, child => (
          isComponentOfType(Button, child)
            ? React.cloneElement(child, { ...child.props, grouped: true, secondary })
            : child
        ))}
      </Wrapper>
    );
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.bool,
};

export default ButtonGroup;
