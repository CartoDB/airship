import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';
import Loading from '../Loading/loading';
import CloseIcon from '../Icons/close';
import { colors } from '../../constants';

/*
<Typeahead>Wadus</Typeahead>
*/

const StyledTypeahead = styled.div``;
const StyledInput = styled.div`
  position: relative;
  border-radius: 4px;
  input {
    width: 100%;
    border: 1px solid ${rgba(colors.type01, 0.16)};
    border-radius: 4px;
    font: 400 12px/18px 'Roboto';
    color: ${colors.type01};
    padding: 6px 40px 6px 12px;
    width: 100%;
    outline: none;
    transform: translate3d(0, 0, 0);
  }

  input:focus {
    border: 1px solid ${colors.brand01};
    box-shadow: 0 0 0 1px ${colors.brand01};
  }

  input::-webkit-input-placeholder {
    color: ${colors.type03};
  }
  input::-moz-placeholder {
    color: ${colors.type03};
  }
  input:-ms-input-placeholder {
    color: ${colors.type03};
  }
  input:-moz-placeholder {
    color: ${colors.type03};
  }

  button {
    border: 0;
    background: transparent;
    padding: 0;
  }

  div,
  button {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class Typeahead extends Component {
  state = {
    query: this.props.query
  };

  componentWillReceiveProps(next) {
    if (next.query !== this.state.query) {
      this.setState({ query: next.query });
    }
  }

  reset = (e) => {
    const { onChange } = this.props;
    this.setState(
      (state) => {
        return { ...state, query: '' };
      },
      () => {
        onChange && onChange({ query: '' });
      }
    );
  };

  onChange = (e) => {
    const { onChange } = this.props;
    const query = e.target.value;
    this.setState(
      (state) => {
        return { ...state, query };
      },
      () => {
        onChange && onChange({ query });
      }
    );
  };

  render() {
    const { loading, results, size, placeholder } = this.props;
    const { query } = this.state;

    const getIcon = () => {
      if (loading) {
        return <Loading size={16} />;
      }

      return query !== '' ? (
        <button onClick={this.reset}>
          <CloseIcon width={12} height={12} />
        </button>
      ) : null;
    };

    return (
      <StyledTypeahead size={size}>
        <StyledInput>
          <input
            value={query}
            onChange={this.onChange}
            placeholder={placeholder}
          />
          {getIcon()}
        </StyledInput>
      </StyledTypeahead>
    );
  }
}

Typeahead.defaultProps = {
  query: '',
  results: [],
  loading: false,
  placeholder: 'Type to search'
};

Typeahead.propTypes = {
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  results: PropTypes.array,
  size: PropTypes.number,
  placeholder: PropTypes.string
};

export default Typeahead;
