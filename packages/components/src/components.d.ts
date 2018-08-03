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
    interface AsRangeSlider {
      /**
       * Disables component if truthy
       */
      'disabled': boolean;
      /**
       * If this property is set to true, and it has multiple value, you can drag the entire track.
       */
      'draggable': boolean;
      /**
       * If this property is set to true, and it has multiple value, you can drag the entire track.
       */
      'formatValue': (value: number) => void;
      /**
       * Top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.
       */
      'maxValue': number;
      /**
       * Bottom limit of the range. You cannot drag your slider below this value. By default the value is 0.
       */
      'minValue': number;
      /**
       * Initial value. By default, the value is 0 or the minValue.
       */
      'range': number[];
      /**
       * Increment/decrement step of the slider. You can change the step setting a different number to this property. Defaults to 1.
       */
      'step': number;
      /**
       * Initial value. By default, the value is 0 or the minValue.
       */
      'value': number;
    }
  }

  interface HTMLAsRangeSliderElement extends StencilComponents.AsRangeSlider, HTMLStencilElement {}

  var HTMLAsRangeSliderElement: {
    prototype: HTMLAsRangeSliderElement;
    new (): HTMLAsRangeSliderElement;
  };
  interface HTMLElementTagNameMap {
    'as-range-slider': HTMLAsRangeSliderElement;
  }
  interface ElementTagNameMap {
    'as-range-slider': HTMLAsRangeSliderElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-range-slider': JSXElements.AsRangeSliderAttributes;
    }
  }
  namespace JSXElements {
    export interface AsRangeSliderAttributes extends HTMLAttributes {
      /**
       * Disables component if truthy
       */
      'disabled'?: boolean;
      /**
       * If this property is set to true, and it has multiple value, you can drag the entire track.
       */
      'draggable'?: boolean;
      /**
       * If this property is set to true, and it has multiple value, you can drag the entire track.
       */
      'formatValue'?: (value: number) => void;
      /**
       * Top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.
       */
      'maxValue'?: number;
      /**
       * Bottom limit of the range. You cannot drag your slider below this value. By default the value is 0.
       */
      'minValue'?: number;
      'onChange'?: (event: CustomEvent<number | number[]>) => void;
      'onChangeEnd'?: (event: CustomEvent<number | number[]>) => void;
      'onChangeStart'?: (event: CustomEvent<number | number[]>) => void;
      /**
       * Initial value. By default, the value is 0 or the minValue.
       */
      'range'?: number[];
      /**
       * Increment/decrement step of the slider. You can change the step setting a different number to this property. Defaults to 1.
       */
      'step'?: number;
      /**
       * Initial value. By default, the value is 0 or the minValue.
       */
      'value'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AsRangeSliderThumb {
      'disabled': boolean;
      'formatValue': (value: number) => void;
      'percentage': number;
      'value': number;
    }
  }

  interface HTMLAsRangeSliderThumbElement extends StencilComponents.AsRangeSliderThumb, HTMLStencilElement {}

  var HTMLAsRangeSliderThumbElement: {
    prototype: HTMLAsRangeSliderThumbElement;
    new (): HTMLAsRangeSliderThumbElement;
  };
  interface HTMLElementTagNameMap {
    'as-range-slider-thumb': HTMLAsRangeSliderThumbElement;
  }
  interface ElementTagNameMap {
    'as-range-slider-thumb': HTMLAsRangeSliderThumbElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-range-slider-thumb': JSXElements.AsRangeSliderThumbAttributes;
    }
  }
  namespace JSXElements {
    export interface AsRangeSliderThumbAttributes extends HTMLAttributes {
      'disabled'?: boolean;
      'formatValue'?: (value: number) => void;
      'onChangeEnd'?: (event: CustomEvent<void>) => void;
      'onChangeStart'?: (event: CustomEvent<void>) => void;
      'onThumbMove'?: (event: CustomEvent<number>) => void;
      'percentage'?: number;
      'value'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface AsRangeSliderBar {
      'disabled': boolean;
      'draggable': boolean;
      'rangeEndPercentage': number;
      'rangeStartPercentage': number;
    }
  }

  interface HTMLAsRangeSliderBarElement extends StencilComponents.AsRangeSliderBar, HTMLStencilElement {}

  var HTMLAsRangeSliderBarElement: {
    prototype: HTMLAsRangeSliderBarElement;
    new (): HTMLAsRangeSliderBarElement;
  };
  interface HTMLElementTagNameMap {
    'as-range-slider-bar': HTMLAsRangeSliderBarElement;
  }
  interface ElementTagNameMap {
    'as-range-slider-bar': HTMLAsRangeSliderBarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'as-range-slider-bar': JSXElements.AsRangeSliderBarAttributes;
    }
  }
  namespace JSXElements {
    export interface AsRangeSliderBarAttributes extends HTMLAttributes {
      'disabled'?: boolean;
      'draggable'?: boolean;
      'onBarMove'?: (event: CustomEvent<number[]>) => void;
      'onChangeEnd'?: (event: CustomEvent<void>) => void;
      'onChangeStart'?: (event: CustomEvent<void>) => void;
      'rangeEndPercentage'?: number;
      'rangeStartPercentage'?: number;
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