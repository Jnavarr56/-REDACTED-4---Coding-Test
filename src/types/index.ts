export interface Coordinates {
  x: number;
  y: number;
}

export enum Direction {
  North = 'N',
  South = 'S',
  East = 'E',
  West = 'W'
}

export enum Rotation {
  Left = 'L',
  Right = 'R'
}

export type InstructionStep = Rotation | 'M';

export enum Axis {
  x = 'x',
  y = 'y'
}
