/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';


import {
  DropdownOption,
} from './components/as-dropdown/types/DropdownOption';
import {
  HistogramColorRange,
  HistogramData,
} from './components/as-histogram-widget/interfaces';
import {
  DrawOptions,
} from './components/as-histogram-widget/types/DrawOptions';
import {
  RawStackedbarData,
} from './components/as-stacked-bar-widget/types/RawStackedbarData';
import {
  Metadata,
} from './components/as-stacked-bar-widget/types/Metadata';
import {
  TimeSeriesData,
} from './components/as-time-series-widget/interfaces';
import {
  LegendData,
} from './components/common/as-legend/types/LegendData';


export namespace Components {

  interface AsCategoryWidget {
    /**
    * Array of categories to display in the widget. Each category should include a `name` and a `value`. You can also override the bar color for each category with `color`.
    */
    'categories': object[];
    /**
    * Clear current selected categories
    */
    'clearSelection': () => Promise<void>;
    /**
    * Default color to draw the bars. Default value is `#47DB99`.
    */
    'defaultBarColor': string;
    /**
    * Description text of the widget
    */
    'description': string;
    /**
    * Disable category selection in Widget
    */
    'disableInteractivity': boolean;
    /**
    * Text shown in the header subtitle when there's an error
    */
    'error': string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription': string;
    /**
    * Get current selected categories
    */
    'getSelectedCategories': () => Promise<string[]>;
    /**
    * Heading text of the widget
    */
    'heading': string;
    /**
    * Boolean property to control the widget loading state. If true, a spinner is shown.
    */
    'isLoading': boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage': string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage': string;
    /**
    * If truthy, it'll show a button to clear selected categories when there are any. Default value is `false`.
    */
    'showClearButton': boolean;
    /**
    * If truthy, it'll render the heading and component's description. Default value is `true`.
    */
    'showHeader': boolean;
    /**
    * If truthy, we'll use the sum of all categories' value to render the bar percentage. By default, we use the maximum category value to render the bar percentage.
    */
    'useTotalPercentage': boolean;
    /**
    * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
    */
    'valueFormatter': (value: number) => string;
    /**
    * The number of visible categories without aggregation.
    */
    'visibleCategories': number;
  }
  interface AsCategoryWidgetAttributes extends StencilHTMLAttributes {
    /**
    * Array of categories to display in the widget. Each category should include a `name` and a `value`. You can also override the bar color for each category with `color`.
    */
    'categories'?: object[];
    /**
    * Default color to draw the bars. Default value is `#47DB99`.
    */
    'defaultBarColor'?: string;
    /**
    * Description text of the widget
    */
    'description'?: string;
    /**
    * Disable category selection in Widget
    */
    'disableInteractivity'?: boolean;
    /**
    * Text shown in the header subtitle when there's an error
    */
    'error'?: string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription'?: string;
    /**
    * Heading text of the widget
    */
    'heading'?: string;
    /**
    * Boolean property to control the widget loading state. If true, a spinner is shown.
    */
    'isLoading'?: boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage'?: string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage'?: string;
    /**
    * Fired when selected categories changed or selected categories are cleared.
    */
    'onCategoriesSelected'?: (event: CustomEvent<string[]>) => void;
    /**
    * If truthy, it'll show a button to clear selected categories when there are any. Default value is `false`.
    */
    'showClearButton'?: boolean;
    /**
    * If truthy, it'll render the heading and component's description. Default value is `true`.
    */
    'showHeader'?: boolean;
    /**
    * If truthy, we'll use the sum of all categories' value to render the bar percentage. By default, we use the maximum category value to render the bar percentage.
    */
    'useTotalPercentage'?: boolean;
    /**
    * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
    */
    'valueFormatter'?: (value: number) => string;
    /**
    * The number of visible categories without aggregation.
    */
    'visibleCategories'?: number;
  }

  interface AsDropdown {
    /**
    * Closes the list, useful in case you need to customize {onClickOutside}
    */
    'closeList': () => Promise<void>;
    /**
    * Default text to show when no option is selected
    */
    'defaultText': string;
    /**
    * Function called when clicking outside of the dropdown. By default it closes the list.
    */
    'onClickOutside': () => void;
    /**
    * Array of options to display in the dropdown
    */
    'options': DropdownOption[];
    /**
    * Selected option to show in the dropdown
    */
    'selectedOption': string;
    /**
    * Allow the user to clear selected option
    */
    'showClearButton': boolean;
  }
  interface AsDropdownAttributes extends StencilHTMLAttributes {
    /**
    * Default text to show when no option is selected
    */
    'defaultText'?: string;
    /**
    * Function called when clicking outside of the dropdown. By default it closes the list.
    */
    'onClickOutside'?: () => void;
    /**
    * Fired when selected option changes or option is cleared
    */
    'onOptionChanged'?: (event: CustomEvent<string>) => void;
    /**
    * Array of options to display in the dropdown
    */
    'options'?: DropdownOption[];
    /**
    * Selected option to show in the dropdown
    */
    'selectedOption'?: string;
    /**
    * Allow the user to clear selected option
    */
    'showClearButton'?: boolean;
  }

  interface AsHistogramWidget {
    'axisFormatter': (value: number | Date) => string;
    /**
    * Clears the Histogram selection
    */
    'clearSelection': () => void;
    /**
    * Override color for the histogram bars
    */
    'color': string;
    /**
    * Color range for histogram data
    */
    'colorRange': HistogramColorRange[];
    /**
    * Histogram data to be displayed
    */
    'data': HistogramData[];
    /**
    * Description of the widget to be displayed
    */
    'description': string;
    /**
    * Disables selection brushes and events for the widget
    */
    'disableInteractivity': boolean;
    'draw': (props: DrawOptions) => void;
    /**
    * Use this widget to put the widget in "error mode". When error mode is active. The header will display the given text. And the body will be display the errorDescription instead any data.
    */
    'error': string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription': string;
    /**
    * Returns the current selection
    */
    'getSelection': () => Promise<number[]>;
    /**
    * Title of the widget to be displayed
    */
    'heading': string;
    /**
    * Use this attribute to put the widget in "loading mode". When loading mode is active, a spinner will be shown and the data will be hidden.
    */
    'isLoading': boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage': string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage': string;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive': boolean;
    /**
    * Override color for the selected histogram bars
    */
    'selectedColor': string;
    /**
    * Programmatically set the selection. It will be adjusted to the buckets present in {@link data}. To clear see {@link clearSelection} or call with null
    */
    'setSelection': (values: number[]) => void;
    /**
    * Display a clear button that clears the histogram selection.
    */
    'showClear': boolean;
    /**
    * Toggles displaying title and description
    */
    'showHeader': boolean;
    /**
    * Function that formats the tooltip. Receives HistogramData and outputs a string
    */
    'tooltipFormatter': (value: HistogramData) => string;
    /**
    * Label the x axis of the histogram with the given string.
    */
    'xLabel': string;
    /**
    * Label the y axis of the histogram with the given string.
    */
    'yLabel': string;
  }
  interface AsHistogramWidgetAttributes extends StencilHTMLAttributes {
    'axisFormatter'?: (value: number | Date) => string;
    /**
    * Override color for the histogram bars
    */
    'color'?: string;
    /**
    * Color range for histogram data
    */
    'colorRange'?: HistogramColorRange[];
    /**
    * Histogram data to be displayed
    */
    'data'?: HistogramData[];
    /**
    * Description of the widget to be displayed
    */
    'description'?: string;
    /**
    * Disables selection brushes and events for the widget
    */
    'disableInteractivity'?: boolean;
    'draw'?: (props: DrawOptions) => void;
    /**
    * Use this widget to put the widget in "error mode". When error mode is active. The header will display the given text. And the body will be display the errorDescription instead any data.
    */
    'error'?: string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription'?: string;
    /**
    * Title of the widget to be displayed
    */
    'heading'?: string;
    /**
    * Use this attribute to put the widget in "loading mode". When loading mode is active, a spinner will be shown and the data will be hidden.
    */
    'isLoading'?: boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage'?: string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage'?: string;
    /**
    * Fired when user update or clear the widget selection.
    */
    'onSelectionChanged'?: (event: CustomEvent<number[]>) => void;
    'onSelectionInput'?: (event: CustomEvent<number[]>) => void;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive'?: boolean;
    /**
    * Override color for the selected histogram bars
    */
    'selectedColor'?: string;
    /**
    * Display a clear button that clears the histogram selection.
    */
    'showClear'?: boolean;
    /**
    * Toggles displaying title and description
    */
    'showHeader'?: boolean;
    /**
    * Function that formats the tooltip. Receives HistogramData and outputs a string
    */
    'tooltipFormatter'?: (value: HistogramData) => string;
    /**
    * Label the x axis of the histogram with the given string.
    */
    'xLabel'?: string;
    /**
    * Label the y axis of the histogram with the given string.
    */
    'yLabel'?: string;
  }

  interface AsInfowindow {
    'src': string;
  }
  interface AsInfowindowAttributes extends StencilHTMLAttributes {
    'src'?: string;
  }

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
    * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
    */
    'formatValue': (value: number) => string|number;
    /**
    * Top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.
    */
    'maxValue': number;
    /**
    * Bottom limit of the range. You cannot drag your slider below this value. By default the value is 0.
    */
    'minValue': number;
    /**
    * Initial range.
    */
    'range': number[];
    /**
    * Increment/decrement step of the slider. You can change the step setting a different number to this property. Defaults to 1.
    */
    'step': number;
    /**
    * Initial value.
    */
    'value': number;
  }
  interface AsRangeSliderAttributes extends StencilHTMLAttributes {
    /**
    * Disables component if truthy
    */
    'disabled'?: boolean;
    /**
    * If this property is set to true, and it has multiple value, you can drag the entire track.
    */
    'draggable'?: boolean;
    /**
    * If this property receives a function, it will be used to format the numbers (eg. for adding $ or €).
    */
    'formatValue'?: (value: number) => string|number;
    /**
    * Top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.
    */
    'maxValue'?: number;
    /**
    * Bottom limit of the range. You cannot drag your slider below this value. By default the value is 0.
    */
    'minValue'?: number;
    'onChange'?: (event: CustomEvent<number[]>) => void;
    'onChangeEnd'?: (event: CustomEvent<number[]>) => void;
    'onChangeStart'?: (event: CustomEvent<number[]>) => void;
    /**
    * Initial range.
    */
    'range'?: number[];
    /**
    * Increment/decrement step of the slider. You can change the step setting a different number to this property. Defaults to 1.
    */
    'step'?: number;
    /**
    * Initial value.
    */
    'value'?: number;
  }

  interface AsRangeSliderThumb {
    'disabled': boolean;
    'formatValue': (value: number) => string|number;
    'percentage': number;
    'value': number;
    'valueMax': number;
    'valueMin': number;
  }
  interface AsRangeSliderThumbAttributes extends StencilHTMLAttributes {
    'disabled'?: boolean;
    'formatValue'?: (value: number) => string|number;
    'onThumbChangeEnd'?: (event: CustomEvent<void>) => void;
    'onThumbChangeStart'?: (event: CustomEvent<void>) => void;
    'onThumbDecrease'?: (event: CustomEvent<number>) => void;
    'onThumbIncrease'?: (event: CustomEvent<number>) => void;
    'onThumbMove'?: (event: CustomEvent<number>) => void;
    'percentage'?: number;
    'value'?: number;
    'valueMax'?: number;
    'valueMin'?: number;
  }

  interface AsRangeSliderBar {
    'disabled': boolean;
    'draggable': boolean;
    'rangeEndPercentage': number;
    'rangeStartPercentage': number;
    'stepPercentage': number;
  }
  interface AsRangeSliderBarAttributes extends StencilHTMLAttributes {
    'disabled'?: boolean;
    'draggable'?: boolean;
    'onBarChangeEnd'?: (event: CustomEvent<void>) => void;
    'onBarChangeStart'?: (event: CustomEvent<void>) => void;
    'onBarMove'?: (event: CustomEvent<number[]>) => void;
    'rangeEndPercentage'?: number;
    'rangeStartPercentage'?: number;
    'stepPercentage'?: number;
  }

  interface AsResponsiveContent {
    'getSections': () => Promise<object[]>;
    'setVisible': (sectionName: string) => Promise<void>;
  }
  interface AsResponsiveContentAttributes extends StencilHTMLAttributes {
    'onReady'?: (event: CustomEvent<void>) => void;
    'onSectionChange'?: (event: CustomEvent<object>) => void;
  }

  interface AsStackedBarWidget {
    /**
    * The data that will be drawn.
    */
    'data': RawStackedbarData[];
    /**
    * Description of the widget to be displayed
    */
    'description': string;
    /**
    * Use this attribute to put the widget in "error mode". When this attribute is given, its text will be shown in the subheader and the widget content won't be displayed.
    */
    'error': string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription': string;
    /**
    * Easy customize tooltip format
    */
    'formatFn': any;
    /**
    * Header of the widget to be displayed
    */
    'heading': string;
    /**
    * Use this attribute to put the widget in "loading mode". When this attribute is true, the widget won't show any data, a spinner will be placed instead.
    */
    'isLoading': boolean;
    /**
    * Legend data
    */
    'metadata': Metadata;
    /**
    * Callback executed when the mouse is placed outside a rectangle.
    */
    'mouseLeave': any;
    /**
    * Callback executed when the mouse is placed over a rectangle.
    */
    'mouseOver': any;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage': string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage': string;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive': boolean;
    /**
    * Boolean flag to control legend visibility. Defaults: true
    */
    'showLegend': boolean;
  }
  interface AsStackedBarWidgetAttributes extends StencilHTMLAttributes {
    /**
    * The data that will be drawn.
    */
    'data'?: RawStackedbarData[];
    /**
    * Description of the widget to be displayed
    */
    'description'?: string;
    /**
    * Use this attribute to put the widget in "error mode". When this attribute is given, its text will be shown in the subheader and the widget content won't be displayed.
    */
    'error'?: string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription'?: string;
    /**
    * Easy customize tooltip format
    */
    'formatFn'?: any;
    /**
    * Header of the widget to be displayed
    */
    'heading'?: string;
    /**
    * Use this attribute to put the widget in "loading mode". When this attribute is true, the widget won't show any data, a spinner will be placed instead.
    */
    'isLoading'?: boolean;
    /**
    * Legend data
    */
    'metadata'?: Metadata;
    /**
    * Callback executed when the mouse is placed outside a rectangle.
    */
    'mouseLeave'?: any;
    /**
    * Callback executed when the mouse is placed over a rectangle.
    */
    'mouseOver'?: any;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage'?: string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage'?: string;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive'?: boolean;
    /**
    * Boolean flag to control legend visibility. Defaults: true
    */
    'showLegend'?: boolean;
  }

  interface AsSwitch {
    /**
    * Boolean flag to control if the input is checked or not
    */
    'checked': boolean;
    /**
    * Boolean flag to control when the switch is disabled or not
    */
    'disabled': boolean;
    /**
    * Input label
    */
    'label': string;
    /**
    * The input name
    */
    'name': string;
  }
  interface AsSwitchAttributes extends StencilHTMLAttributes {
    /**
    * Boolean flag to control if the input is checked or not
    */
    'checked'?: boolean;
    /**
    * Boolean flag to control when the switch is disabled or not
    */
    'disabled'?: boolean;
    /**
    * Input label
    */
    'label'?: string;
    /**
    * The input name
    */
    'name'?: string;
    /**
    * Event triggered by a enabled Switch component when the user clicks on it.
    */
    'onChange'?: (event: CustomEvent) => void;
  }

  interface AsTabs {
    /**
    * Index of the active tab. Defaults to 0
    */
    'activeTab': number;
    /**
    * Make the tabs XL
    */
    'xl': boolean;
  }
  interface AsTabsAttributes extends StencilHTMLAttributes {
    /**
    * Index of the active tab. Defaults to 0
    */
    'activeTab'?: number;
    /**
    * Make the tabs XL
    */
    'xl'?: boolean;
  }

  interface AsTimeSeriesWidget {
    'animated': boolean;
    /**
    * Override color for the histogram bars
    */
    'color': string;
    /**
    * Color range for histogram data
    */
    'colorRange': HistogramColorRange[];
    /**
    * Histogram data to be displayed
    */
    'data': TimeSeriesData[];
    /**
    * Description of the widget to be displayed
    */
    'description': string;
    /**
    * Disables selection brushes and events for the widget
    */
    'disableInteractivity': boolean;
    /**
    * Use this widget to put the widget in "error mode". When error mode is active. The header will display the given text. And the body will be display the errorDescription instead any data.
    */
    'error': string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription': string;
    /**
    * Title of the widget to be displayed
    */
    'heading': string;
    /**
    * Use this attribute to put the widget in "loading mode". When loading mode is active, a spinner will be shown and the data will be hidden.
    */
    'isLoading': boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage': string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage': string;
    'playing': boolean;
    'progress': number;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive': boolean;
    /**
    * Override color for the selected histogram bars
    */
    'selectedColor': string;
    /**
    * Display a clear button that clears the histogram selection.
    */
    'showClear': boolean;
    /**
    * Toggles displaying title and description
    */
    'showHeader': boolean;
    /**
    * Function that formats the tooltip. Receives TimeSeriesData and outputs a string
    */
    'tooltipFormatter': (value: TimeSeriesData) => string;
    /**
    * Label the x axis of the histogram with the given string.
    */
    'xLabel': string;
    /**
    * Label the y axis of the histogram with the given string.
    */
    'yLabel': string;
  }
  interface AsTimeSeriesWidgetAttributes extends StencilHTMLAttributes {
    'animated'?: boolean;
    /**
    * Override color for the histogram bars
    */
    'color'?: string;
    /**
    * Color range for histogram data
    */
    'colorRange'?: HistogramColorRange[];
    /**
    * Histogram data to be displayed
    */
    'data'?: TimeSeriesData[];
    /**
    * Description of the widget to be displayed
    */
    'description'?: string;
    /**
    * Disables selection brushes and events for the widget
    */
    'disableInteractivity'?: boolean;
    /**
    * Use this widget to put the widget in "error mode". When error mode is active. The header will display the given text. And the body will be display the errorDescription instead any data.
    */
    'error'?: string;
    /**
    * Extended error description, only shown when error is present
    */
    'errorDescription'?: string;
    /**
    * Title of the widget to be displayed
    */
    'heading'?: string;
    /**
    * Use this attribute to put the widget in "loading mode". When loading mode is active, a spinner will be shown and the data will be hidden.
    */
    'isLoading'?: boolean;
    /**
    * Message shown in body when no data is available
    */
    'noDataBodyMessage'?: string;
    /**
    * Message shown in header when no data is available
    */
    'noDataHeaderMessage'?: string;
    'onPause'?: (event: CustomEvent) => void;
    'onPlay'?: (event: CustomEvent) => void;
    'playing'?: boolean;
    'progress'?: number;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize. Defaults to true.
    */
    'responsive'?: boolean;
    /**
    * Override color for the selected histogram bars
    */
    'selectedColor'?: string;
    /**
    * Display a clear button that clears the histogram selection.
    */
    'showClear'?: boolean;
    /**
    * Toggles displaying title and description
    */
    'showHeader'?: boolean;
    /**
    * Function that formats the tooltip. Receives TimeSeriesData and outputs a string
    */
    'tooltipFormatter'?: (value: TimeSeriesData) => string;
    /**
    * Label the x axis of the histogram with the given string.
    */
    'xLabel'?: string;
    /**
    * Label the y axis of the histogram with the given string.
    */
    'yLabel'?: string;
  }

  interface AsToolbar {}
  interface AsToolbarAttributes extends StencilHTMLAttributes {}

  interface AsLegend {
    /**
    * Data to be displayed by the legend
    */
    'data': LegendData;
  }
  interface AsLegendAttributes extends StencilHTMLAttributes {
    /**
    * Data to be displayed by the legend
    */
    'data'?: LegendData;
  }

  interface AsLoader {}
  interface AsLoaderAttributes extends StencilHTMLAttributes {}

  interface AsWidgetHeader {
    /**
    * Use this attribute to put the widget-header in "error mode". When this attribute is not empty the subheader will display the given value.
    */
    'error': string;
    /**
    * Main title
    */
    'header': string;
    /**
    * Use this attribute to put the widget-header in "empty mode". When this attribute is true the subheader will show the text defined by noDataMessage.
    */
    'isEmpty': boolean;
    /**
    * Use this attribute to put the widget-header in "loading mode". When this attribute is true the subheader text will be displayed as usual.
    */
    'isLoading': boolean;
    /**
    * Use this attribute to select the text displayed in the subheader when the header is in "empty mode". Defaults to "NO DATA AVAILABLE"
    */
    'noDataMessage': string;
    /**
    * Secondary title
    */
    'subheader': string;
  }
  interface AsWidgetHeaderAttributes extends StencilHTMLAttributes {
    /**
    * Use this attribute to put the widget-header in "error mode". When this attribute is not empty the subheader will display the given value.
    */
    'error'?: string;
    /**
    * Main title
    */
    'header'?: string;
    /**
    * Use this attribute to put the widget-header in "empty mode". When this attribute is true the subheader will show the text defined by noDataMessage.
    */
    'isEmpty'?: boolean;
    /**
    * Use this attribute to put the widget-header in "loading mode". When this attribute is true the subheader text will be displayed as usual.
    */
    'isLoading'?: boolean;
    /**
    * Use this attribute to select the text displayed in the subheader when the header is in "empty mode". Defaults to "NO DATA AVAILABLE"
    */
    'noDataMessage'?: string;
    /**
    * Secondary title
    */
    'subheader'?: string;
  }

  interface AsYAxis {
    /**
    * Lower limit of the axis
    */
    'from': number;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize Defaults to true
    */
    'responsive': boolean;
    /**
    * Upper limit of the axis
    */
    'to': number;
  }
  interface AsYAxisAttributes extends StencilHTMLAttributes {
    /**
    * Lower limit of the axis
    */
    'from'?: number;
    /**
    * Use this attribute to decide if the widget should be rerendered on window resize Defaults to true
    */
    'responsive'?: boolean;
    /**
    * Upper limit of the axis
    */
    'to'?: number;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AsCategoryWidget': Components.AsCategoryWidget;
    'AsDropdown': Components.AsDropdown;
    'AsHistogramWidget': Components.AsHistogramWidget;
    'AsInfowindow': Components.AsInfowindow;
    'AsRangeSlider': Components.AsRangeSlider;
    'AsRangeSliderThumb': Components.AsRangeSliderThumb;
    'AsRangeSliderBar': Components.AsRangeSliderBar;
    'AsResponsiveContent': Components.AsResponsiveContent;
    'AsStackedBarWidget': Components.AsStackedBarWidget;
    'AsSwitch': Components.AsSwitch;
    'AsTabs': Components.AsTabs;
    'AsTimeSeriesWidget': Components.AsTimeSeriesWidget;
    'AsToolbar': Components.AsToolbar;
    'AsLegend': Components.AsLegend;
    'AsLoader': Components.AsLoader;
    'AsWidgetHeader': Components.AsWidgetHeader;
    'AsYAxis': Components.AsYAxis;
  }

  interface StencilIntrinsicElements {
    'as-category-widget': Components.AsCategoryWidgetAttributes;
    'as-dropdown': Components.AsDropdownAttributes;
    'as-histogram-widget': Components.AsHistogramWidgetAttributes;
    'as-infowindow': Components.AsInfowindowAttributes;
    'as-range-slider': Components.AsRangeSliderAttributes;
    'as-range-slider-thumb': Components.AsRangeSliderThumbAttributes;
    'as-range-slider-bar': Components.AsRangeSliderBarAttributes;
    'as-responsive-content': Components.AsResponsiveContentAttributes;
    'as-stacked-bar-widget': Components.AsStackedBarWidgetAttributes;
    'as-switch': Components.AsSwitchAttributes;
    'as-tabs': Components.AsTabsAttributes;
    'as-time-series-widget': Components.AsTimeSeriesWidgetAttributes;
    'as-toolbar': Components.AsToolbarAttributes;
    'as-legend': Components.AsLegendAttributes;
    'as-loader': Components.AsLoaderAttributes;
    'as-widget-header': Components.AsWidgetHeaderAttributes;
    'as-y-axis': Components.AsYAxisAttributes;
  }


  interface HTMLAsCategoryWidgetElement extends Components.AsCategoryWidget, HTMLStencilElement {}
  var HTMLAsCategoryWidgetElement: {
    prototype: HTMLAsCategoryWidgetElement;
    new (): HTMLAsCategoryWidgetElement;
  };

  interface HTMLAsDropdownElement extends Components.AsDropdown, HTMLStencilElement {}
  var HTMLAsDropdownElement: {
    prototype: HTMLAsDropdownElement;
    new (): HTMLAsDropdownElement;
  };

  interface HTMLAsHistogramWidgetElement extends Components.AsHistogramWidget, HTMLStencilElement {}
  var HTMLAsHistogramWidgetElement: {
    prototype: HTMLAsHistogramWidgetElement;
    new (): HTMLAsHistogramWidgetElement;
  };

  interface HTMLAsInfowindowElement extends Components.AsInfowindow, HTMLStencilElement {}
  var HTMLAsInfowindowElement: {
    prototype: HTMLAsInfowindowElement;
    new (): HTMLAsInfowindowElement;
  };

  interface HTMLAsRangeSliderElement extends Components.AsRangeSlider, HTMLStencilElement {}
  var HTMLAsRangeSliderElement: {
    prototype: HTMLAsRangeSliderElement;
    new (): HTMLAsRangeSliderElement;
  };

  interface HTMLAsRangeSliderThumbElement extends Components.AsRangeSliderThumb, HTMLStencilElement {}
  var HTMLAsRangeSliderThumbElement: {
    prototype: HTMLAsRangeSliderThumbElement;
    new (): HTMLAsRangeSliderThumbElement;
  };

  interface HTMLAsRangeSliderBarElement extends Components.AsRangeSliderBar, HTMLStencilElement {}
  var HTMLAsRangeSliderBarElement: {
    prototype: HTMLAsRangeSliderBarElement;
    new (): HTMLAsRangeSliderBarElement;
  };

  interface HTMLAsResponsiveContentElement extends Components.AsResponsiveContent, HTMLStencilElement {}
  var HTMLAsResponsiveContentElement: {
    prototype: HTMLAsResponsiveContentElement;
    new (): HTMLAsResponsiveContentElement;
  };

  interface HTMLAsStackedBarWidgetElement extends Components.AsStackedBarWidget, HTMLStencilElement {}
  var HTMLAsStackedBarWidgetElement: {
    prototype: HTMLAsStackedBarWidgetElement;
    new (): HTMLAsStackedBarWidgetElement;
  };

  interface HTMLAsSwitchElement extends Components.AsSwitch, HTMLStencilElement {}
  var HTMLAsSwitchElement: {
    prototype: HTMLAsSwitchElement;
    new (): HTMLAsSwitchElement;
  };

  interface HTMLAsTabsElement extends Components.AsTabs, HTMLStencilElement {}
  var HTMLAsTabsElement: {
    prototype: HTMLAsTabsElement;
    new (): HTMLAsTabsElement;
  };

  interface HTMLAsTimeSeriesWidgetElement extends Components.AsTimeSeriesWidget, HTMLStencilElement {}
  var HTMLAsTimeSeriesWidgetElement: {
    prototype: HTMLAsTimeSeriesWidgetElement;
    new (): HTMLAsTimeSeriesWidgetElement;
  };

  interface HTMLAsToolbarElement extends Components.AsToolbar, HTMLStencilElement {}
  var HTMLAsToolbarElement: {
    prototype: HTMLAsToolbarElement;
    new (): HTMLAsToolbarElement;
  };

  interface HTMLAsLegendElement extends Components.AsLegend, HTMLStencilElement {}
  var HTMLAsLegendElement: {
    prototype: HTMLAsLegendElement;
    new (): HTMLAsLegendElement;
  };

  interface HTMLAsLoaderElement extends Components.AsLoader, HTMLStencilElement {}
  var HTMLAsLoaderElement: {
    prototype: HTMLAsLoaderElement;
    new (): HTMLAsLoaderElement;
  };

  interface HTMLAsWidgetHeaderElement extends Components.AsWidgetHeader, HTMLStencilElement {}
  var HTMLAsWidgetHeaderElement: {
    prototype: HTMLAsWidgetHeaderElement;
    new (): HTMLAsWidgetHeaderElement;
  };

  interface HTMLAsYAxisElement extends Components.AsYAxis, HTMLStencilElement {}
  var HTMLAsYAxisElement: {
    prototype: HTMLAsYAxisElement;
    new (): HTMLAsYAxisElement;
  };

  interface HTMLElementTagNameMap {
    'as-category-widget': HTMLAsCategoryWidgetElement
    'as-dropdown': HTMLAsDropdownElement
    'as-histogram-widget': HTMLAsHistogramWidgetElement
    'as-infowindow': HTMLAsInfowindowElement
    'as-range-slider': HTMLAsRangeSliderElement
    'as-range-slider-thumb': HTMLAsRangeSliderThumbElement
    'as-range-slider-bar': HTMLAsRangeSliderBarElement
    'as-responsive-content': HTMLAsResponsiveContentElement
    'as-stacked-bar-widget': HTMLAsStackedBarWidgetElement
    'as-switch': HTMLAsSwitchElement
    'as-tabs': HTMLAsTabsElement
    'as-time-series-widget': HTMLAsTimeSeriesWidgetElement
    'as-toolbar': HTMLAsToolbarElement
    'as-legend': HTMLAsLegendElement
    'as-loader': HTMLAsLoaderElement
    'as-widget-header': HTMLAsWidgetHeaderElement
    'as-y-axis': HTMLAsYAxisElement
  }

  interface ElementTagNameMap {
    'as-category-widget': HTMLAsCategoryWidgetElement;
    'as-dropdown': HTMLAsDropdownElement;
    'as-histogram-widget': HTMLAsHistogramWidgetElement;
    'as-infowindow': HTMLAsInfowindowElement;
    'as-range-slider': HTMLAsRangeSliderElement;
    'as-range-slider-thumb': HTMLAsRangeSliderThumbElement;
    'as-range-slider-bar': HTMLAsRangeSliderBarElement;
    'as-responsive-content': HTMLAsResponsiveContentElement;
    'as-stacked-bar-widget': HTMLAsStackedBarWidgetElement;
    'as-switch': HTMLAsSwitchElement;
    'as-tabs': HTMLAsTabsElement;
    'as-time-series-widget': HTMLAsTimeSeriesWidgetElement;
    'as-toolbar': HTMLAsToolbarElement;
    'as-legend': HTMLAsLegendElement;
    'as-loader': HTMLAsLoaderElement;
    'as-widget-header': HTMLAsWidgetHeaderElement;
    'as-y-axis': HTMLAsYAxisElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}
