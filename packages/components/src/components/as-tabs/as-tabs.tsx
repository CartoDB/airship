import { Component, Element, Prop } from '@stencil/core';

/**
 * As Tabs
 *
 * @export
 * @class Tabs
 */
@Component({
  shadow: false,
  styleUrl: './as-tabs.scss',
  tag: 'as-tabs'
})
export class Tabs {

  /**
   * Index of the active tab. Defaults to 0
   */
  @Prop({ mutable: true })
  public activeTab: number = 0;

  /**
   * Make the tabs XL
   */
  @Prop()
  public xl: boolean = false;

  @Element() private element: HTMLElement;

  public render() {
    const children = this._parseChildren();

    return [
      this._renderTabs(children),
      <slot />
    ];
  }

  public componentDidLoad() {
    const children = this._parseChildren();
    this._updateActiveTab(children);
  }

  public componentDidUpdate() {
    const children = this._parseChildren();
    this._updateActiveTab(children);
  }

  private _parseChildren(): HTMLDivElement[] {
    return Array.from(this.element.querySelectorAll('[role="tabpanel"]'));
  }

  private _updateActiveTab(children: HTMLDivElement[]) {
    if (!children) {
      // tslint:disable-next-line
      console.warn('Airship Tabs: Children elements must have role="tabpanel" attribute.');
      return;
    }
    children.forEach((element, i) => {
      this.activeTab === i ? element.removeAttribute('hidden') : element.setAttribute('hidden', 'hidden');
    });
  }

  private _renderTabs(children: HTMLDivElement[]) {
    const tabListClasses = {
      'as-tabs': true,
      'as-tabs--xl': this.xl,
    };
    return <div role='tablist' class={tabListClasses}>
      {children.map(this._renderTab.bind(this))}
    </div>;
  }

  private _renderTab(childrenElement: HTMLDivElement, index: number) {
    const elementClasses = {
      'as-tabs__item': true,
      'as-tabs__item--active': index === this.activeTab
    };
    const title = this._getTitle(childrenElement, index);

    return <button role='tab' class={elementClasses} onClick={() => { this.activeTab = index; }} > {title} </button>;
  }

  private _getTitle(element: HTMLDivElement, index) {
    if (element.getAttribute('data-title')) {
      return element.getAttribute('data-title');
    }
    return `Tab ${index}`;
  }
}
