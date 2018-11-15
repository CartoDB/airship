/**
 * This function queries an element for certain types of airship elements
 * that support an explicit redraw, and calls it.
 *
 * @param element Element where to look for redrawable children
 */
export function redrawChildren(element) {
  const allChildren = element.querySelectorAll('*');

  for (const child of allChildren) {
    const isAirshipElement = child.tagName.toLowerCase().indexOf('as-') === 0 && child.forceUpdate;
    if (isAirshipElement) {
      child.forceUpdate();
    }
  }
}
