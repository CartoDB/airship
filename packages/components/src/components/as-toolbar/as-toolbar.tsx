import { Component, Element } from '@stencil/core';

/**
 * Toolbar
 *
 * @export
 * @class Toolbar
 */
@Component({
  shadow: false,
  styleUrl: './as-toolbar.scss',
  tag: 'as-toolbar',
})
export class Toolbar {

  private actions: HTMLElement;

  @Element() private element: HTMLElement;

  public componentWillLoad() {
    this.actions = this.element.querySelector('.as-toolbar__actions');
  }

  public componentWillUpdate() {
    this.actions = this.element.querySelector('.as-toolbar__actions');
  }

  public render() {
    return (
      <header class='as-toolbar'>
        {this._renderToggleButton()}
        <slot></slot>
      </header>
    );
  }

  private _toggleDrawer() {
    this.actions.classList.toggle('as-toolbar__actions--visible');
  }

  private _renderToggleButton() {
    if (!this.actions) {
      return;
    }

    return (
      <button onClick={this._toggleDrawer.bind(this)} class='as-toolbar__item as-toolbar__toggle'>
        <i class='as-icon-hamburguer as-title as-m--0'></i>
      </button>
    );
  }
}
