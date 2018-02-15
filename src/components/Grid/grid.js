import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const px = (n) =>
  typeof n === 'number' ? n + 'px' : n.indexOf('px') >= 0 ? n : n + 'px';

const width = (props) => ({
  gridTemplateColumns: `repeat(auto-fit, minmax(${px(props.width)}, 1fr))`
});

const gap = (props) => ({
  gridGap: px(props.gap)
});

const align = (props) =>
  props.align
    ? {
        alignItems: props.align
      }
    : null;

const Grid = (props) => {
  const styles = css({
    display: 'grid',
    ...width(props),
    ...gap(props),
    ...align(props)
  });

  return <div className={styles}>{props.children}</div>;
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
