/*
    The following class keeps track of the searchable area
    as defined by the user after entering the bound.
*/
class Grid {
  private static _xBound: number;
  private static _yBound: number;

  static defineUpperRightBound(x: number, y: number): void {
    this._xBound = x;
    this._yBound = y;
  }

  static get xBound(): number {
    return this._xBound;
  }

  static get yBound(): number {
    return this._yBound;
  }
}

export default Grid;
