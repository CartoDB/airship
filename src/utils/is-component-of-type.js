import React from 'react';

/**
 * Returns true if the provided element is a component of the provided type.
 *
 * @param classType {ReactElement class} - the class of a React Element
 * @param reactElement {ReactElement} - any React Element (not a real DOM node)
 */
export default function (classType, reactElement) {
  if (process.env.NODE_ENV !== 'production') {
    // https://github.com/gaearon/react-hot-loader/blob/v3.0.0-beta.7/docs/Known%20Limitations.md#checking-element-types
    classType = React.createElement(classType).type;// eslint-disable-line no-param-reassign
  }
  return reactElement && reactElement.type === classType;
}
