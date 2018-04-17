import React, { Children, Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  & > label {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

class RadioGroup extends Component {
  state = {
    checked: this.props.checked,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.checked !== nextProps.checked) {
      this.setState({ checked: nextProps.checked });
    }
  }

  onChange = event => {
    const { onChange, disabled } = this.props;

    if (disabled) return;

    this.setState(
      { checked: event.target.value },
      () => onChange && onChange(this.state.checked),
    );
  };

  render() {
    const { children, name, as = 'div', disabled = false } = this.props;
    const WrapperComponent = as !== 'div' ? Wrapper.withComponent(as) : Wrapper;

    return (
      <WrapperComponent>
        {Children.map(children, (child, index) => {
          const checked = child.props.value === this.state.checked;
          return React.cloneElement(child, {
            name,
            onChange: this.onChange,
            key: `radio${index}`,
            disabled,
            checked,
          });
        })}
      </WrapperComponent>
    );
  }
}

RadioGroup.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.string,
};

export default RadioGroup;
