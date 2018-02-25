import React from 'react';

const Tabpanel = ({ children, selected }) => {
  const css = selected ? 'active' : '';
  return <div className={css}>{children}</div>;
};

export default Tabpanel;
