export interface SVGMapInstance {
  options: SVGMapOptions;
  id: string;
  wrapper: Container;
  container: Container;
  mapContainer: Container;
  tooltip: Container;
  tooltipContent: Container;
  tooltipPointer: Container;
  mapWrapper: Container;
  mapImage: Container;
  zoomControlIn: Container;
  zoomControlOut: Container;
  mapPanZoom: Container;
}

export interface Container extends HTMLElement {}

export interface SVGMapOptions<T = Record<string, any>> {
  /**
   * The ID of the element where the world map will render
   * Required
   */
  targetElementID: string;

  /**
   * Minimal zoom level
   * Default: 1
   */
  minZoom?: number;

  /**
   * Maximal zoom level
   * Default: 25
   */
  maxZoom?: number;

  /**
   * Initial zoom level
   * Default: 1.06
   */
  initialZoom?: number;

  /**
   * Initial pan on x and y axis, e.g. { x: 120, y: 60 }
   * Default: { x: 0, y: 0 }
   */
  initialPan?: InitialPan;

  /**
   * Sensitivity when zooming
   * Default: 0.2
   */
  zoomScaleSensitivity?: number;

  /**
   * Enables or disables zooming with the scroll wheel
   * Default: true
   */
  mouseWheelZoomEnabled?: boolean;

  /**
   * Allow zooming only when one of the following keys is pressed:
   * SHIFT, CONTROL, ALT, COMMAND, OPTION
   * Default: false
   */
  mouseWheelZoomWithKey?: boolean;

  /**
   * The message when trying to scroll without a key
   * Default: 'Press the [ALT] key to zoom'
   */
  mouseWheelKeyMessage?: string;

  /**
   * The message when trying to scroll without a key on MacOS
   * Default: 'Press the [COMMAND] key to zoom'
   */
  mouseWheelKeyMessageMac?: string;

  /**
   * Color for highest value
   * Default: '#CC0033'
   */
  colorMax?: string;

  /**
   * Color for lowest value
   * Default: '#FFE5D9'
   */
  colorMin?: string;

  /**
   * Color for no data available
   * Default: '#E2E2E2'
   */
  colorNoData?: string;
  manualColorAttribute?: string;

  /**
   * The type of the flag in the tooltip
   * Default: 'image'
   */
  flagType?: "emoji" | "image";

  /**
   * The URL to the flags when using flag type 'image'. The placeholder {0} will get replaced with the lowercase ISO 3166-1 alpha-2 country code
   * Default: 'https://cdn.jsdelivr.net/gh/hjnilsson/country-flags@latest/svg/{0}.svg'
   */
  flagURL?: string;

  /**
   * Hide the flag in tooltips
   * Default: false
   */
  hideFlag?: boolean;
  hideMissingData?: boolean;

  /**
   * The text to be shown when no data is present
   * Default: 'No data available'
   */
  noDataText?: string;

  /**
   * Set to true to open the link (see data.values.link) on mobile devices, by default the tooltip will be shown.
   * Default: false
   */
  touchLink?: boolean;

  /**
   * Called when a tooltip is created to custimize the tooltip content (function (tooltipDiv, countryID, countryValues) { return 'Custom HTML'; })
   */
  onGetTooltip?: <H = HTMLElement>(
    tooltipDiv: H,
    countryID: string,
    countryValues: T
  ) => HTMLElement;
  showZoomReset?: boolean;

  /**
   * Additional options specific to countries
   */
  countries?: Countries;
  showContinentSelector?: boolean;

  /**
   * The chart data to use for coloring and to show in the tooltip. Use a unique data-id as key and provide following options as value
   */
  data: SVGMapOptionsData<T>;

  /**
   * An object with the ISO 3166-1 alpha-2 country code as key and the country name as value
   */
  countryNames?: Record<string, string>;
}

export interface Countries {
  /**
   * When set to false, Western Sahara (EH) will be combined with Morocco (MA)
   * Default: true
   */
  EH: boolean;

  /**
   * Crimea: Set to 'RU' to make the Crimea part of Russia, by default it is part of the Ukraine
   * Default: 'RU'
   */
  Crimea: "UA" | "RU";
}

export interface SVGMapOptionsData<T = string> {
  /**
   * The chart data to use for coloring and to show in the tooltip. Use a unique data-id as key and provide following options as value
   */
  data: DataValues<T>;

  /**
   * The ID (key) of the data that will be used for coloring
   */
  applyData: string;

  /**
   * An object with the ISO 3166-1 alpha-2 country code as key and the chart data for each country as value
   */
  values: { [key: string]: T };
}

export interface DataValues<T = string> {
  [key: T]: DataSetting;
}

export interface DataSetting {
  /**
   * The name of the data, it will be shown in the tooltip
   */
  name: string;

  /**
   * The format for the data value, {0} will be replaced with the actual value
   */
  format: string;

  /**
   * The character to use as thousand separator
   * Default: ','
   */
  thousandSeparator: string;

  /**
   * Maximal value to use for coloring calculations
   * Default: null
   */
  thresholdMax: number;

  /**
   * Minimum value to use for coloring calculations
   * Default: 0
   */
  thresholdMin: number;
}

export interface InitialPan {
  x: number;
  y: number;
}
