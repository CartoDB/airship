import { Component, Element, Event, EventEmitter, Method, State } from '@stencil/core';
import { redrawChildren } from '../../utils/redraw-children';

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
  @Element() private element: HTMLElement;

  @State() private sections: ApplicationSection[] = [];

  @Event() private ready: EventEmitter<void>;
  @Event() private sectionChange: EventEmitter<object>;

  private activeSection: ApplicationSection;

  public render() {
    return [
      this.renderTabs(),
      this.renderContent()
    ];
  }

  public renderContent() {
    return (
      <section class='as-content'>
        <slot />
      </section>
    );
  }

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

  private renderTabs() {
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

  private setActive(section: ApplicationSection) {
    if (section.active) {
      return;
    }

    this.disableActiveSection();

    if (section.activeAction) {
      section.activeAction(section);
    } else {
      section.element.classList.add(section.activeClass || ACTIVE_CLASSES[section.type]);
      redrawChildren(section.element);
      section.active = true;
    }

    this.activeSection = section;
    this.sections = [...this.sections];
    this.sectionChange.emit(section);
  }

  private disableActiveSection() {
    if (!this.activeSection) {
      return;
    }

    if (this.activeSection.disableAction) {
      this.activeSection.disableAction(this.activeSection);
      return;
    }

    this.activeSection.element.classList.remove(
      this.activeSection.activeClass || ACTIVE_CLASSES[this.activeSection.type]
    );
    this.activeSection.active = false;
  }

  private getContentSections() {
    const sections = [
      this.getMap(),
      ...this.getSidebars(),
      ...this.getPanels(),
      this.getMapFooter()
    ];

    if (sections.length) {
      sections.sort((a, b) => a.tabOrder - b.tabOrder);
      this.setActive(sections[0]);
    }

    return sections;
  }

  private getMap() {
    const mapWrapper = this.element.querySelector('.as-map-area');

    function activeAction(section: ApplicationSection) {
      section.active = true;
    }

    function disableAction(section: ApplicationSection) {
      section.active = false;
    }

    return {
      activeAction,
      disableAction,
      element: mapWrapper,
      name: mapWrapper.getAttribute('data-name') || 'Map',
      tabOrder: mapWrapper.getAttribute('data-tab-order') || 0,
      type: 'map'
    } as ApplicationSection;
  }

  private getSidebars() {
    const sidebars = Array.from(this.element.querySelectorAll('.as-sidebar'));

    const sidebarSections = sidebars.map((sidebar, index) => {
      return {
        activeClass: `as-sidebar--visible`,
        element: sidebar,
        name: sidebar.getAttribute('data-name') || `Sidebar ${index}`,
        tabOrder: sidebar.getAttribute('data-tab-order') || 0,
        type: 'sidebar'
      };
    }) as ApplicationSection[];

    return sidebarSections;
  }

  private getPanels() {
    const panels = Array.from(this.element.querySelectorAll('.as-map-panels'));

    const panelsSections = panels.map((panel, index) => ({
        element: panel,
        name: panel.getAttribute('data-name') || `Panel ${index}`,
        tabOrder: panel.getAttribute('data-tab-order') || 0,
        type: 'panels'
      })
    ) as ApplicationSection[];

    return panelsSections;
  }

  private getMapFooter() {
    const mapFooter = this.element.querySelector('.as-map-footer');

    return {
      element: mapFooter,
      name: mapFooter && mapFooter.getAttribute('data-name') || 'Bottom Bar',
      tabOrder: mapFooter && mapFooter.getAttribute('data-tab-order') || 0,
      type: 'mapFooter'
    } as ApplicationSection;
  }
}

const ACTIVE_CLASSES = {
  mapFooter: 'as-map-footer--visible',
  panels: 'as-map-panels--visible'
};

interface ApplicationSection {
  active?: boolean;
  activeAction?: (section: ApplicationSection) => {};
  activeClass?: string;
  disableAction?: (section: ApplicationSection) => {};
  element: HTMLElement;
  name: string;
  type: string;
  tabOrder: number;
}
