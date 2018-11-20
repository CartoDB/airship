import { Component, Element, Event, EventEmitter, Method, State } from '@stencil/core';
import { redrawChildren } from '../../utils/redraw-children';
import ApplicationSection from './utils/ApplicationSection';
import contentService from './utils/content.service';

/**
 * Category Widget
 *
 * @export
 * @class CategoryWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-responsive-content.scss',
  tag: 'as-responsive-content'
})
export class ResponsiveContent {
  private activeSection: ApplicationSection;

  @Element() private element: HTMLElement;
  @State() private sections: ApplicationSection[] = [];
  @Event() private ready: EventEmitter<void>;
  @Event() private sectionChange: EventEmitter<object>;

  public componentWillLoad() {
    this.sections = this.getContentSections();
  }

  public componentDidLoad() {
    this.ready.emit();
  }

  @Method()
  public async getSections(): Promise<object[]> {
    return this.sections;
  }

  @Method()
  public async setVisible(sectionName: string) {
    const sectionFound = this.sections.find((section) => section.name === sectionName);

    if (sectionFound) {
      this.setActive(sectionFound);
    }
  }

  public render() {
    return [
      this._renderTabs(),
      this._renderContent()
    ];
  }

  private _renderTabs() {
    const tabs = this.sections.map((section, index) => {
      if (!section.element) {
        return;
      }

      const cssClasses = {
        'as-tabs__item': true,
        'as-tabs__item--active': section.active
      };

      return (
        <button onClick={() => this.setActive(section)} role='tab' class={cssClasses}>
          {section.name || index}
        </button>
      );
    });

    return (
      <div role='tablist' class='as-toolbar-tabs as-tabs as-tabs--xl'>{tabs}</div>
    );
  }

  private _renderContent() {
    return (
      <section class='as-content'>
        <slot />
      </section>
    );
  }

  private setActive(section: ApplicationSection) {
    if (section.active) {
      return;
    }

    this.disableActiveSection();
    section.enable();
    redrawChildren(section.element);


    this.activeSection = section;
    this.sections = [...this.sections];
    this.sectionChange.emit(section);
  }

  private disableActiveSection() {
    if (!this.activeSection) {
      return;
    }

    this.activeSection.disable();
  }

  private getContentSections() {
    const sections = [
      contentService.getMap(this.element),
      ...contentService.getSidebars(this.element),
      ...contentService.getPanels(this.element),
      contentService.getFooter(this.element)
    ].filter((section) => {
      return section !== null;
    });

    if (sections.length) {
      sections.sort((a, b) => a.order - b.order);
      this.setActive(sections[0]);
    }

    return sections;
  }
}
