import { Component, Element, Event, EventEmitter, Method, State } from '@stencil/core';

/**
 * Category Widget
 *
 * @export
 * @class CategoryWidget
 */
@Component({
  shadow: false,
  styleUrl: './as-application-content.scss',
  tag: 'as-application-content'
})
export class ApplicationContent {
  @Element() private element: HTMLElement;

  @State() private sections: ApplicationSection[] = [];

  @Event() private load: EventEmitter<void>;
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
      <main class='as-app-content'>
        <slot />
      </main>
    );
  }

  public componentWillLoad() {
    this.sections = this.getContentSections();
  }

  public componentDidLoad() {
    this.load.emit();
  }

  @Method()
  public getSections(): object[] {
    return this.sections;
  }

  @Method()
  public setVisible(sectionName: string) {
    const sectionFound = this.sections.find((section) => section.name === sectionName);

    if (sectionFound) {
      this.setActive(sectionFound);
    }
  }

  private renderTabs() {
    const tabs = this.sections.map((section, index) => {
      const cssClasses = {
        'as-tabs__item': true,
        'as-tabs__item--active': section.active
      };

      return <button onClick={() => this.setActive(section)} role='tab' class={cssClasses}>
        {section.name || index}
      </button>;
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
      this.getBottomBar()
    ];

    if (sections.length) {
      sections.sort((a, b) => a.tabOrder - b.tabOrder);
      this.setActive(sections[0]);
    }

    return sections;
  }

  private getMap() {
    const mapWrapper = this.element.querySelector('.as-map-wrapper');

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
      const sidebarPosition = sidebar.classList.contains('as-sidebar--left') ? 'left' : 'right';

      return {
        activeClass: `as-sidebar--${sidebarPosition}--visible`,
        element: sidebar,
        name: sidebar.getAttribute('data-name') || `Sidebar ${index}`,
        tabOrder: sidebar.getAttribute('data-tab-order') || 0,
        type: 'sidebar'
      };
    }) as ApplicationSection[];

    return sidebarSections;
  }

  private getPanels() {
    const panels = Array.from(this.element.querySelectorAll('.as-panels'));

    const panelsSections = panels.map((panel, index) => ({
        element: panel,
        name: panel.getAttribute('data-name') || `Panel ${index}`,
        tabOrder: panel.getAttribute('data-tab-order') || 0,
        type: 'panels'
      })
    ) as ApplicationSection[];

    return panelsSections;
  }

  private getBottomBar() {
    const bottomBar = this.element.querySelector('.as-bottom-bar');

    return {
      element: bottomBar,
      name: bottomBar.getAttribute('data-name') || 'Bottom Bar',
      tabOrder: bottomBar.getAttribute('data-tab-order') || 0,
      type: 'bottomBar'
    } as ApplicationSection;
  }
}

const ACTIVE_CLASSES = {
  bottomBar: 'as-bottom-bar--visible',
  panels: 'as-panels--visible'
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
