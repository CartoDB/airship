function showMap(event) {
  showLeftPanel(false);
  showRightPanel(false);
  showLegendsPanel(false);
  showBottomPanel(false);
  setActiveTab(event.target);
}

function showLeft(event) {
  showLeftPanel(true);
  showRightPanel(false);
  showLegendsPanel(false);
  showBottomPanel(false);
  setActiveTab(event.target);
}

function showRight(event) {
  showLeftPanel(false);
  showRightPanel(true);
  showLegendsPanel(false);
  showBottomPanel(false);
  setActiveTab(event.target);
}

function showLegends(event) {
  console.log('show legends');
  showLeftPanel(false);
  showRightPanel(false);
  showLegendsPanel(true);
  showBottomPanel(false);
  setActiveTab(event.target);
}

function showBottom(event) {
  showLeftPanel(false);
  showRightPanel(false);
  showLegendsPanel(false);
  showBottomPanel(true);
  setActiveTab(event.target);
}

function showLeftPanel(visible) {
  showPanel('as-sidebar--left', visible, 'as-sidebar--visible');
}

function showRightPanel(visible) {
  showPanel('as-sidebar--right', visible, 'as-sidebar--visible');
}

function showLegendsPanel(visible) {
  showPanel('as-map-panels', visible);
}

function showBottomPanel(visible) {
  showPanel('as-map-footer', visible);
}

function showPanel(className, visible, visibleClassName) {
  var element = document.querySelector(`.${className}`)

  if (!element) {
    return;
  }

  var visibleClass = visibleClassName || (className + '--visible');
  visible
    ? element.classList.add(visibleClass)
    : element.classList.remove(visibleClass);
}

function setActiveTab(target) {
  document.querySelector('.as-toolbar-tabs .as-tabs__item--active').classList.remove('as-tabs__item--active');
  target.classList.add('as-tabs__item--active');
}

function _toggleDrawer() {
  document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
}
