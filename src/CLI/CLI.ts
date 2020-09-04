import Grid from '../Grid';
import { Coordinates } from '../types';
import { delay } from '../utils';

import chalk from 'chalk';
import inquirer from 'inquirer';
import ora, { Ora } from 'ora';
import { Direction } from 'readline';

/*
    This class manages the interaction/population of the
    Grid, Rover, and Instruction classes via user input.
*/

class CLI {
  // Execute program.
  public async init(): Promise<void> {
    // 1) Intro
    await this.performIntroAnimation();

    // 2) Define the grid bound.
    const gridCaptureExplanation: string = chalk.yellow(
      "First, let's define the grid by stating the coordinates\n" +
        'of the upper right cell. Please enter the (x, y) coordinate\n' +
        'in the format "# #" (just 2 numbers separated by a space).'
    );
    console.log(gridCaptureExplanation);
    const gridBound: Coordinates = await this.captureGridDefinition();
    Grid.defineUpperRightBound(gridBound.x, gridBound.y);

    // 3) Add first rover.
    const roverCaptureExplanation: string = chalk.yellow(
      '\nNow, we can start to add rovers.\n' +
        'Please enter the starting coordinate (x, y) of the first rover\n' +
        'followed by the initial direction (N, S, E, W) in the format "# # D".\n' +
        'After, you will need to enter the instructions for the rover as a string\n' +
        'composed of the characters L, M, and R.'
    );
    console.log(roverCaptureExplanation);
  }

  // Generate the unecessary intro animation.
  private async performIntroAnimation(): Promise<void> {
    const loadingText: string = chalk.yellow(
      "Loading Jorge's Problem 1 Solution"
    );
    const introSpinner: Ora = ora({
      text: loadingText,
      color: 'yellow'
    }).start();
    await delay(3000);
    introSpinner.stop();

    const welcomeText: string = chalk.cyan.underline(
      "Welcome to Jorge's Problem 1 (Mars Rover) CLI Program!"
    );
    const captionText: string = chalk.yellow(
      'Follow the instructions below to get started.'
    );
    console.log(`${welcomeText}\n${captionText}\n`);
  }

  // Prompt and validate user input for the grid bound. Return a coordinates object
  // that is used with the Grid class.
  private async captureGridDefinition(): Promise<Coordinates> {
    return inquirer
      .prompt({
        type: 'input',
        name: 'bound',
        message: 'Type in the grid bound and hit enter: ',
        validate: (userInput: string): boolean | string =>
          this.isValidGridInput(userInput) ? true : 'Must have format "# #"\n',
        filter: (userInput: string): boolean | string =>
          this.isValidGridInput(userInput) ? userInput : ''
      })
      .then(
        (ans: { bound: string }): Coordinates => {
          const nums: number[] = ans.bound.split(' ').map((n) => parseInt(n));
          return { x: nums[0], y: nums[1] };
        }
      );
  }

  //   // Enter twice and hit .
  //   private async captureRoverInput(): void {

  //     let startingCoords: Coordinates, startingDirection: Direction;

  //     await inquirer
  //       .prompt({
  //         type: 'input',
  //         name: 'bound',
  //         message: 'Type in the rover starting data and hit enter: ',
  //         validate: (userInput: string): boolean | string =>
  //           this.isValidGridInput(userInput) ? true : 'Must have format "# # D"\n',
  //         filter: (userInput: string): boolean | string =>
  //           this.isValidGridInput(userInput) ? userInput : ''
  //       })
  //       .then(
  //         (ans: { bound: string }) => {
  //           const inputChars: string[] = ans.bound.split(' ');
  //           startingCoords = { x: parseInt(inputChars[0]), y: parseInpt(inputChars[1]) };
  //           startingDirection = inputChars[2];
  //         }
  //       );

  //     await inquirer
  //       .prompt({
  //         type: 'input',
  //         name: 'bound',
  //         message: 'Type in the rover starting data and hit enter: ',
  //         validate: (userInput: string): boolean | string =>
  //           this.isValidGridInput(userInput) ? true : 'Must have format "# #"\n',
  //         filter: (userInput: string): boolean | string =>
  //           this.isValidGridInput(userInput) ? userInput : ''
  //       })
  //       .then((ans: { bound: string }) => {
  //         const nums: number[] = ans.bound.split(' ').map((n) => parseInt(n));
  //         startingCoords = { x: nums[0], y: nums[1] };
  //       });
  //   }

  private isValidGridInput(userInput: string): boolean {
    return Boolean(userInput.trim().match(/^\d+ \d+$/));
  }
}

export default CLI;
