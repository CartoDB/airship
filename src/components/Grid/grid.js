import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const px = (n) =>
  typeof n === 'number' ? n + 'px' : n.indexOf('px') >= 0 ? n : n + 'px';

const width = (props) => `repeat(auto-fit, minmax(${px(props.width)}, 1fr))`;
const gap = (props) => px(props.gap);

const align = (props) => (props.align ? props.align : null);

const Grid = (props) => {
  const Styled = styled.div`
    display: grid;
    grid-template-columns: ${width(props)};
    grid-gap: ${gap(props)};
    align-items: ${align(props)};
  `;

  return <Styled>{props.children}</Styled>;
};

Grid.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  align: PropTypes.string
};

Grid.defaultProps = {
  width: 320,
  gap: 32
};

export default Grid;
