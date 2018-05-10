import getObjectValue from './getObjectValue';

export default function withOverride(key) {
  return props => getObjectValue(props, ['overrides', key]);
}
