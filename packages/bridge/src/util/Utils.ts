export function select(elementOrSelector: string | HTMLElement): HTMLElement {
  if (typeof elementOrSelector === 'string') {
    return document.querySelector(elementOrSelector);
  }

  return elementOrSelector;
}
