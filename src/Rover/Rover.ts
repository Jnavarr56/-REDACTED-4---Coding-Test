import Grid from '../Grid';
import { Coordinates, Direction, Rotation } from '../types';

class Rover {
  private static readonly DIRECTIONS: Direction[] = [
    Direction.North,
    Direction.East,
    Direction.South,
    Direction.West
  ];

  private _position: Coordinates;
  private _directionalIndex: number;

  constructor(initialPosition: Coordinates, initialDirection: Direction) {
    this._position = initialPosition;
    this._directionalIndex = this.getDirectionIndex(initialDirection);
  }

  get direction(): Direction {
    return Rover.DIRECTIONS[this._directionalIndex];
  }

  get position(): Coordinates {
    return this._position;
  }

  public rotate(rotationInstruction: Rotation): void {
    let loopLimit: number, loopAround: number, increment: number;

    switch (rotationInstruction) {
      case Rotation.Left:
        loopLimit = 0;
        loopAround = Rover.DIRECTIONS.length - 1;
        increment = -1;
        break;
      case Rotation.Right:
        loopLimit = Rover.DIRECTIONS.length - 1;
        loopAround = 0;
        increment = 1;
    }
    if (this._directionalIndex === loopLimit) {
      this._directionalIndex = loopAround;
    } else {
      this._directionalIndex += increment;
    }
  }

  private getDirectionIndex(direction: Direction): number {
    return Rover.DIRECTIONS.indexOf(direction);
  }
}

export default Rover;
