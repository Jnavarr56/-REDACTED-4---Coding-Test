import Grid from '../Grid';
import { Coordinates, Direction, Rotation, Axis } from '../types';

/*
  This class represents a rover and in a self contained way
  manages its own position and direction data. Also, it executes
  instructions by reading them from an Instruction instance.
*/

class Rover {
  /*
    Store cardinal directions (enum constant types) in array 
    to make easily traversable via an index decreasing 
    (left rotate) or an index increasing (right rotate).
  */
  private static readonly COMPASS: Direction[] = [
    Direction.North,
    Direction.East,
    Direction.South,
    Direction.West
  ];

  // Store index referencing the current direction in COMPASS.
  private _compassPoint: number;

  // Store current position as an (x, y) pair in a hash.
  private _position: Coordinates;

  // Initialize with starting point and starting direction.
  constructor(initialPosition: Coordinates, initialDirection: Direction) {
    this._position = initialPosition;
    // convert provided initial direction string to direction index.
    this._compassPoint = Rover.COMPASS.indexOf(initialDirection);
  }

  // Get current Direction enum by indexing directions array.
  get direction(): Direction {
    return Rover.COMPASS[this._compassPoint];
  }

  // Get current position coordinate hash (x, y).
  get position(): Coordinates {
    return this._position;
  }

  /*
    Provide a Rotation enum string (L or R) and increment
    or decrement _compassPoint accordingly in order to 
    change current direction.
  */
  public rotate(rotationInstruction: Rotation): void {
    let loopLimit: number, loopAround: number, increment: number;

    switch (rotationInstruction) {
      case Rotation.Left:
        loopLimit = 0;
        loopAround = Rover.COMPASS.length - 1;
        increment = -1;
        break;
      case Rotation.Right:
        loopLimit = Rover.COMPASS.length - 1;
        loopAround = 0;
        increment = 1;
    }

    this._compassPoint =
      this._compassPoint === loopLimit
        ? loopAround
        : (this._compassPoint += increment);
  }

  /*
    Handle a move based on direction, updating current position. 
    This works by first establishing whether or not the move is 
    vertical or horizontal (ie: Left means a horizontal move, North means vertical).

    Once the axis is established, we can map the axis to either the x or y property 
    of the current position Coordinate hash. Logically, whether or not the property
    value is increased or decreased by one also depends on the direction (North = +1, South = -1).

  */
  public move(): void {
    let axis: Axis, loopLimit: number, loopAround: number, increment: number;

    switch (this.direction) {
      case Direction.North:
        axis = Axis.y;
        loopLimit = Grid.yBound;
        loopAround = 0;
        increment = 1;
        break;
      case Direction.South:
        axis = Axis.y;
        loopLimit = 0;
        loopAround = Grid.yBound;
        increment = -1;
        break;
      case Direction.East:
        axis = Axis.x;
        loopLimit = Grid.xBound;
        loopAround = 0;
        increment = 1;
        break;
      case Direction.West:
        axis = Axis.x;
        loopLimit = 0;
        loopAround = Grid.xBound;
        increment = -1;
    }

    this._position[axis] =
      this._position[axis] === loopLimit
        ? loopAround
        : (this._position[axis] += increment);
  }
}

export default Rover;
