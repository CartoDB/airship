import { h } from '@stencil/core';
import paths from '../resources/icon-paths.json';

export function icon(name, color = '#000', props: any) {
  const path = paths[name];
  return (
    <svg width='16px' height='16px' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path fill={color} d={path}/>
    </svg>
  );
}

export default { icon };
