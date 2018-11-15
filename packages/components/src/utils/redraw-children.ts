/**
 * This function queries an element for certain types of airship elements
 * that support an explicit redraw, and calls it.
 *
 * @param element Element where to look for redrawable children
 */
export function redrawChildren(element) {
  const allChildren = element.querySelectorAll('*');

  for (const child of allChildren) {
    if (child.tagName.toLowerCase().indexOf('as-') === 0 && child.forceUpdate) {
      child.forceUpdate();
    }
  }
}
