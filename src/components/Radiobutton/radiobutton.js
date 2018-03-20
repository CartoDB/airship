import React, { Children } from 'react';
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

  // .Radio-input:hover + .Radio-decoration:after {
  //   background: ${colors.brand01};
  //   width: 6px;
  //   height: 6px;
  //   opacity: 0;
  //   animation: ${radioIn} 300ms;
  //   animation-fill-mode: forwards;
  // }

  // .Radio-input:checked:hover + .Radio-decoration {
  //   animation: none;
  // }

  // .Radio-input:checked:hover + .Radio-decoration:after {
  //   background: ${colors.brand01};
  //   opacity: 1;
  //   animation: initial;
  // }

  .Radio-input:checked + .Radio-decoration {
    border: 1px solid ${colors.brand01};
  }

  // .Radio-input:checked + .Radio-decoration:before {
  //   content: '';
  //   display: block;
  //   width: 16px;
  //   height: 16px;
  //   opacity: 1;
  //   background: ${colors.white};
  //   // animation: ${radioIn} 600ms;
  //   // animation-fill-mode: forwards;
  //   position: absolute;
  //   top: calc(50% - 8px);
  //   left: calc(50% - 8px);
  //   border-radius: 50%;
  // }

  .Radio-input:checked + .Radio-decoration::after {
    opacity: 1;
    background: ${colors.brand01};
    animation: ${radioIn} 300ms;
    animation-fill-mode: forwards;
  }

  .Radio-label {
    margin-left: 4px;
  }
`;

const StyledGroup = styled.div``;

const Group = ({ children, name, onChange, as = 'ul' }) => {
  const Wrapper = as !== 'div' ? StyledGroup.withComponent(as) : StyledGroup;
  return (
    <Wrapper>
      {Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          name: name,
          onChange: onChange,
          key: `radio${index}`,
          as: as === 'ul' ? 'li' : 'div'
        });
      })}
    </Wrapper>
  );
};

Group.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  as: PropTypes.oneOf(['div', 'ul', 'span'])
};

const RadioButton = ({ children, name, value, as, onChange }) => {
  const Wrapper = as !== 'div' ? StyleRadio.withComponent(as) : StyleRadio;
  return (
    <Wrapper>
      <div className="Radio">
        <input
          className="Radio-input"
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
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
  onChange: (e) => {}
};

RadioButton.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  as: PropTypes.oneOf(['div', 'li', 'span']),
  onChange: PropTypes.func
};

export default RadioButton;
