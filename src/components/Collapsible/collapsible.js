import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isComponentOfType, withOverride } from '../../utils';
import { theme } from '../../constants';
import Icon from '../Icon/icon';

const Wrapper = styled.div`
  ${withOverride('Collapsible')};
`;
Wrapper.defaultProps = {
  theme,
};

const Header = styled.div`
  display: flex;

  button {
    border: 0;
    background: transparent;
    box-shadown: none;
    margin-left: auto;
    display: flex;
    align-items: center;
    outline: none;
  }

  ${withOverride('Collapsible.Header')};
`;
Header.defaultProps = {
  theme,
};

const Content = styled.div`
  margin-top: 12px;

  ${withOverride('Collapsible.Content')};
`;
Content.defaultProps = {
  theme,
};

class Collapsible extends Component {
  static Header = Header;
  static Content = Content;

  state = {
    open: this.props.open,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
  }

  toggle = () => {
    const { onChange } = this.props;

    this.setState(
      prevState => ({ open: !prevState.open }),
      () => onChange && onChange(this.state)
    );
  };

  render() {
    const { open } = this.state;
    const { children, overrides } = this.props;

    return (
      <Wrapper overrides={overrides}>
        {Children.map(children, child => {
          const childProps = { ...child.props, overrides };

          if (isComponentOfType(Collapsible.Header, child)) {
            return React.cloneElement(
              child,
              childProps,
              <React.Fragment>
                <div>{child.props.children}</div>
                <button onClick={() => this.toggle()} >
                  <Icon icon={open ? 'chevron_up' : 'chevron_down'} />
                </button>
              </React.Fragment>
            );
          } else if (isComponentOfType(Collapsible.Content, child) && open) {
            return React.cloneElement(child, childProps);
          }
        })}
      </Wrapper>
    );
  }
}

Collapsible.defaultProps = {
  open: true,
};

Collapsible.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  open: PropTypes.bool,
  overrides: PropTypes.object,
};

export default Collapsible;
