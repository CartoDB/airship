export default class ApplicationSection {
  private _active: boolean;
  private _activeClass: string;
  private _element: HTMLElement;
  private _name: string;
  private _order: number;
  private _type: 'map' | 'sidebar' | 'mapFooter' | 'panels';

  constructor({ activeClass, element, name, order, type }) {
    this._active = false;
    this._activeClass = activeClass;
    this._element = element;
    this._name = name;
    this._order = order;
    this._type = type;
  }

  get active() {
    return this._active;
  }

  get activeClass() {
    return this._activeClass;
  }

  get element() {
    return this._element;
  }

  get name() {
    return this._name;
  }

  get order() {
    return this._order;
  }

  get type() {
    return this._type;
  }

  public enable() {
    this.element.classList.add(this._activeClass);
    this._active = true;
  }

  public disable() {
    this.element.classList.remove(this._activeClass);
    this._active = false;
  }
}
