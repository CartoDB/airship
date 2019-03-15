export function select(elementOrSelector: string | HTMLElement): HTMLElement {
  if (typeof elementOrSelector === 'string') {
    return document.querySelector(elementOrSelector);
  }

  return elementOrSelector;
}

export function getColumnName(columnOrExpression: string | { propertyName: string }) {
  if (typeof columnOrExpression === 'string') {
    return columnOrExpression;
  }

  return columnOrExpression.propertyName;
}

export function getExpression(columnOrExpression: string | { propertyName: string }) {
  if (typeof columnOrExpression === 'string') {
    return null;
  }

  return columnOrExpression;
}
