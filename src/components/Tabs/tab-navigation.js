import React from 'react';

const TabNavigation = ({ labels, selected, clickHandler }) => {
  const links = labels.map((label, index) => {
    const css = index === selected ? 'active' : '';
    return (
      <li key={label}>
        <button className={css} onClick={e => clickHandler(e, label)}>
          {label}
        </button>
      </li>
    );
  });
  return <ul>{links}</ul>;
};

export default TabNavigation;
