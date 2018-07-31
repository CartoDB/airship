/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface AsCategoryWidget {
      'categories': object[];
      'clearSelection': () => void;
      'defaultBarColor': string;
      'description': string;
      'getSelectedCategories': () => string[];
      'heading': string;
      'showClearButton': boolean;
      'showHeader': boolean;
      'useTotalPercentage': boolean;
    }
  }

  interface HTMLAsCategoryWidgetElement extends StencilComponents.AsCategoryWidget, HTMLStencilElement {}

  var HTMLAsCategoryWidgetElement: {
    prototype: HTMLAsCategoryWidgetElement;
    new (): HTMLAsCategoryWidgetElement;
  };
  interface HTMLElementTagNameMap {
    'as-category-widget': HTMLAsCategoryWidgetElement;
  }
  interface ElementTagNameMap {
    'as-category-widget': HTMLAsCategoryWidgetElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-category-widget': JSXElements.AsCategoryWidgetAttributes;
    }
  }
  namespace JSXElements {
    export interface AsCategoryWidgetAttributes extends HTMLAttributes {
      'categories'?: object[];
      'defaultBarColor'?: string;
      'description'?: string;
      'heading'?: string;
      'onCategoriesSelected'?: (event: CustomEvent<string[]>) => void;
      'showClearButton'?: boolean;
      'showHeader'?: boolean;
      'useTotalPercentage'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AsSwitch {

    }
  }

  interface HTMLAsSwitchElement extends StencilComponents.AsSwitch, HTMLStencilElement {}

  var HTMLAsSwitchElement: {
    prototype: HTMLAsSwitchElement;
    new (): HTMLAsSwitchElement;
  };
  interface HTMLElementTagNameMap {
    'as-switch': HTMLAsSwitchElement;
  }
  interface ElementTagNameMap {
    'as-switch': HTMLAsSwitchElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-switch': JSXElements.AsSwitchAttributes;
    }
  }
  namespace JSXElements {
    export interface AsSwitchAttributes extends HTMLAttributes {
      'onOnToggle'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AsToolbarItem {
      'src': string;
      'text': string;
    }
  }

  interface HTMLAsToolbarItemElement extends StencilComponents.AsToolbarItem, HTMLStencilElement {}

  var HTMLAsToolbarItemElement: {
    prototype: HTMLAsToolbarItemElement;
    new (): HTMLAsToolbarItemElement;
  };
  interface HTMLElementTagNameMap {
    'as-toolbar-item': HTMLAsToolbarItemElement;
  }
  interface ElementTagNameMap {
    'as-toolbar-item': HTMLAsToolbarItemElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-toolbar-item': JSXElements.AsToolbarItemAttributes;
    }
  }
  namespace JSXElements {
    export interface AsToolbarItemAttributes extends HTMLAttributes {
      'src'?: string;
      'text'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AsToolbar {

    }
  }

  interface HTMLAsToolbarElement extends StencilComponents.AsToolbar, HTMLStencilElement {}

  var HTMLAsToolbarElement: {
    prototype: HTMLAsToolbarElement;
    new (): HTMLAsToolbarElement;
  };
  interface HTMLElementTagNameMap {
    'as-toolbar': HTMLAsToolbarElement;
  }
  interface ElementTagNameMap {
    'as-toolbar': HTMLAsToolbarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-toolbar': JSXElements.AsToolbarAttributes;
    }
  }
  namespace JSXElements {
    export interface AsToolbarAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;