export class Expression {

  private _name: string;
  private _value: any;

  constructor(name: string, value: any) {
    this._name = name;
    this._value = value;
  }

  public get name(): string {
    return this._name;
  }

  public get expression(): any {
    return this._value;
  }
}
