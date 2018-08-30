import { Component } from '@stencil/core';

@Component({
  shadow: false,
  tag: 'as-toolbar',
})

export class Toolbar {

  public render() {
    return (
      <header>
        <nav class='as-toolbar-main'>
          <slot/>
        </nav>
          {this._generateTabs()}
      </header>);
  }

  private _generateTabs() {
    // const sidebarLeft = document.querySelector('as-sidebar--left');
    // const sidebarRight = document.querySelector('as-sidebar--right');
    // const bottomBar = document.querySelector('.as-map-wrapper .as-bottom-bar');

    return (
      <nav class='as-toolbar-tabs' >
        <span onClick={this._showTab0} class='as-toolbar-tabs__item'>LEFT </span>
        <span onClick={this._showTab1} class='as-toolbar-tabs__item as-toolbar-tabs__item--active'>MAP</span>
        <span onClick={this._showTab2} class='as-toolbar-tabs__item'>RIGHT</span>
        <span onClick={this._showTab3} class='as-toolbar-tabs__item'>BOTTOM </span>
      </nav>
    );
  }

  private _showTab0(event) {
    document.querySelector('.as-sidebar.as-sidebar--left').classList.add('as-sidebar--visible');
    document.querySelector('.as-sidebar.as-sidebar--right').classList.remove('as-sidebar--visible');
    document.querySelector('.as-bottom-bar').classList.remove('as-bottom-bar--visible');
    document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active')
      .classList.remove('as-toolbar-tabs__item--active');
    event.target.classList.add('as-toolbar-tabs__item--active');
  }

  private _showTab1(event) {
    document.querySelector('.as-sidebar.as-sidebar--left').classList.remove('as-sidebar--visible');
    document.querySelector('.as-sidebar.as-sidebar--right').classList.remove('as-sidebar--visible');
    document.querySelector('.as-bottom-bar').classList.remove('as-bottom-bar--visible');
    document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active')
      .classList.remove('as-toolbar-tabs__item--active');
    event.target.classList.add('as-toolbar-tabs__item--active');
  }

  private _showTab2(event) {
    document.querySelector('.as-sidebar.as-sidebar--right').classList.add('as-sidebar--visible');
    document.querySelector('.as-sidebar.as-sidebar--left').classList.remove('as-sidebar--visible');
    document.querySelector('.as-bottom-bar').classList.remove('as-bottom-bar--visible');
    document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active'
    ).classList.remove('as-toolbar-tabs__item--active');
    event.target.classList.add('as-toolbar-tabs__item--active');
  }

  private _showTab3(event) {
    document.querySelector('.as-sidebar.as-sidebar--right').classList.remove('as-sidebar--visible');
    document.querySelector('.as-sidebar.as-sidebar--left').classList.remove('as-sidebar--visible');
    document.querySelector('.as-bottom-bar').classList.add('as-bottom-bar--visible');
    document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active')
      .classList.remove('as-toolbar-tabs__item--active');
    event.target.classList.add('as-toolbar-tabs__item--active');
  }
}

