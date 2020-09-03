import { InstructionStep, Rotation } from '../types';
/*
  This class manages the instructions in a manner
  that resembles a FIFO stack structure to facilitate
  a sequential "completion" of each instruction step by
  removing each step from the stack when it is completed
  (using the method markStepCompleted).
*/
class Instruction {
  private steps: InstructionStep[];

  constructor(steps: string) {
    this.steps = this.convertToStepStack(steps);
  }

  get currentStep(): InstructionStep {
    return this.steps[this.steps.length - 1];
  }

  get allStepsCompleted(): boolean {
    return this.steps.length === 0;
  }

  public markStepCompleted(): void {
    this.steps.pop();
  }

  private convertToStepStack(steps: string): InstructionStep[] {
    const stack: InstructionStep[] = [];
    for (let i: number = steps.length - 1; i >= 0; i--) {
      const step: string = steps[i];

      if (this.isInstructionStep(step)) stack.push(step);
      else throw new Error('Invalid instructions!');
    }

    return stack;
  }

  private isInstructionStep(char: string): char is InstructionStep {
    if (char === Rotation.Left || char === Rotation.Right || char === 'M') {
      return true;
    }
    return false;
  }
}

export default Instruction;
