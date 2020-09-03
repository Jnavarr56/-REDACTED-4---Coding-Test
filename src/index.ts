import Grid from './Grid';
import Rover from './Rover';
import Instruction from './Instruction';
import { Rotation, Direction, Coordinates } from './types';

Grid.defineUpperRightBound(5, 5);

const startingPosition: Coordinates = { x: 3, y: 3 };
const rover: Rover = new Rover(startingPosition, Direction.East);
const instructions: Instruction = new Instruction('MMRMMRMRRM');

while (!instructions.allStepsCompleted) {
  if (
    instructions.currentStep === Rotation.Left ||
    instructions.currentStep === Rotation.Right
  ) {
    rover.rotate(instructions.currentStep);
  } else if (instructions.currentStep === 'M') {
    rover.move();
  }

  instructions.markStepCompleted();
}

console.log(rover.direction, rover.position);
