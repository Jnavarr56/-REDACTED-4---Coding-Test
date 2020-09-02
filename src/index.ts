import Grid from './Grid/Grid';
import { Rotation, Direction } from './types';
import Rover from './Rover';

const rover: Rover = new Rover(
  {
    x: 1,
    y: 1
  },
  Direction.North
);

console.log(rover.direction);
rover.rotate(Rotation.Right);
console.log(rover.direction);
