const ELEMENT_SELECTOR = 'as-histogram-widget,as-stacked-bar-widget';

/**
 * This function queries an element for certain types of airship elements
 * that support an explicit redraw, and calls it.
 *
 * @param element Element where to look for redrawable children
 */
export function redrawChildren(element) {
  const airshipElements = element.querySelectorAll(ELEMENT_SELECTOR);

  airshipElements.forEach((e) => e.redraw && e.redraw());
}
