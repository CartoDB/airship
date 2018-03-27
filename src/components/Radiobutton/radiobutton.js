import React, { Children, Component } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../constants';
import { rgba } from 'polished';

const radioIn = keyframes`
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
    transform-origin: 50% 50%;
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const StyleRadio = styled.div`
  display: flex;
  align-items: center;

  .Radio {
    position: relative;
  }

  .Radio-decoration {
    pointer-events: none;
    width: 16px;
    height: 16px;
    border: 1px solid ${rgba(colors.type01, 0.16)};
    border-radius: 50%;
    position: relative;
    display: block;
  }

  .Radio-decoration:after {
    content: '';
    display: block;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 3px);
    left: calc(50% - 3px);
    width: 6px;
    height: 6px;
  }

  .Radio-input {
    appearance: none;
    background: none;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 0;
    left: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
    border-radius: 50%;
  }

  .Radio-input:focus {
    border: 2px solid ${colors.brand01};
    outline: none;
  }

  .Radio-input:hover + .Radio-decoration {
    border: 1px solid ${colors.brand03};
  }

  .Radio-input:checked + .Radio-decoration {
    border: 1px solid ${colors.brand01};
  }

  .Radio-input:checked:disabled + .Radio-decoration {
    border: 1px solid ${rgba(colors.type01, 0.16)};
  }

  .Radio-input:checked + .Radio-decoration::after {
    opacity: 1;
    background: ${colors.brand01};
    animation: ${radioIn} 300ms;
    animation-fill-mode: forwards;
  }

  .Radio-input:checked:disabled + .Radio-decoration::after {
    background: ${rgba(colors.type01, 0.16)};
  }

  .Radio-input:disabled:hover {
    cursor: not-allowed;
  }

  .Radio-input:disabled + .Radio-decoration {
    background-color: ${colors.ui03};
  }

  .Radio-input:disabled:hover + .Radio-decoration {
    border: 1px solid ${rgba(colors.type01, 0.16)};
  }

  .Radio-label {
    margin-left: 4px;
  }
`;

const StyledGroup = styled.div``;

class Group extends Component {
  state = {
    selected: this.props.selected
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.selected !== nextProps.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onChange = (e) => {
    const { onChange, disabled } = this.props;
    !disabled &&
      this.setState(
        {
          selected: e.target.value
        },
        () => {
          onChange && onChange(this.state.selected);
        }
      );
  };

  render() {
    const { children, name, as = 'ul', disabled = false } = this.props;

    const { selected } = this.state;

    const Wrapper = as !== 'div' ? StyledGroup.withComponent(as) : StyledGroup;
    return (
      <Wrapper>
        {Children.map(children, (child, index) => {
          const checked = child.props.value === selected;
          return React.cloneElement(child, {
            name,
            onChange: this.onChange,
            key: `radio${index}`,
            as: as === 'ul' ? 'li' : 'div',
            disabled,
            selected: checked
          });
        })}
      </Wrapper>
    );
  }
}

Group.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  as: PropTypes.oneOf(['div', 'ul', 'span']),
  disabled: PropTypes.bool,
  selected: PropTypes.string
};

const RadioButton = ({
  children,
  name,
  value,
  as,
  disabled,
  selected,
  onChange
}) => {
  const Wrapper = as !== 'div' ? StyleRadio.withComponent(as) : StyleRadio;
  return (
    <Wrapper>
      <div className="Radio">
        <input
          className="Radio-input"
          type="radio"
          name={name}
          value={value}
          onChange={(e) => onChange(e)}
          disabled={disabled}
          checked={selected}
        />
        <span className="Radio-decoration" />
      </div>
      {children && <div className="Radio-label">{children}</div>}
    </Wrapper>
  );
};

RadioButton.Group = Group;

RadioButton.defaultProps = {
  name: '',
  as: 'div',
  onChange: (e) => {},
  disabled: false,
  selected: false
};

RadioButton.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  as: PropTypes.oneOf(['div', 'li', 'span']),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};

export default RadioButton;
