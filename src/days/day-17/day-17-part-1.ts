import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { num } from '../../utils/string';

type Computer = {
  registers: {
    A: number;
    B: number;
    C: number;
  };
  program: number[];
  instructionPointer: number;
  output: number[];
};

const INSTRUCTIONS = ['adv', 'bxl', 'bst', 'jnz', 'bxc', 'out', 'bdv', 'cdv'] as const;
const INSTRUCTION_POINTER_STEP_SIZE = 2;

const lines = await readLines('day-17', 'input');

function parseComputer(lines: string[]): Computer {
  const [[a, b, c], [program]] = chunkBy(lines, line => line === '');
  return {
    registers: {
      A: num(a),
      B: num(b),
      C: num(c),
    },
    program: program.replace('Program: ', '').split(',').map(Number),
    instructionPointer: 0,
    output: [],
  };
}

const computer: Computer = parseComputer(lines);

function comboOperandValue(computer: Computer, operand: number): number {
  switch (operand) {
    case 0:
    case 1:
    case 2:
    case 3:
      return operand;
    case 4:
      return computer.registers.A;
    case 5:
      return computer.registers.B;
    case 6:
      return computer.registers.C;
    default:
      throw new Error(`Invalid operand: ${operand}`);
  }
}

function runInstuction(computer: Computer): Computer {
  const newComputer = structuredClone(computer);

  const { registers, program, instructionPointer } = computer;

  const [opcode, operand] = program.slice(
    instructionPointer,
    instructionPointer + INSTRUCTION_POINTER_STEP_SIZE,
  );

  switch (INSTRUCTIONS[opcode]) {
    case 'adv':
      newComputer.registers.A = Math.floor(
        registers.A / Math.pow(2, comboOperandValue(computer, operand)),
      );
      break;
    case 'bxl':
      newComputer.registers.B = registers.B ^ operand;
      break;
    case 'bst':
      newComputer.registers.B = comboOperandValue(computer, operand) % 8;
      break;
    case 'jnz':
      if (computer.registers.A !== 0) {
        newComputer.instructionPointer = operand - INSTRUCTION_POINTER_STEP_SIZE;
      }
      break;
    case 'bxc':
      newComputer.registers.B = registers.B ^ registers.C;
      break;
    case 'out':
      newComputer.output.push(comboOperandValue(computer, operand) % 8);
      break;
    case 'bdv':
      newComputer.registers.B = Math.floor(
        registers.A / Math.pow(2, comboOperandValue(computer, operand)),
      );
      break;
    case 'cdv':
      newComputer.registers.C = Math.floor(
        registers.A / Math.pow(2, comboOperandValue(computer, operand)),
      );
      break;
  }

  newComputer.instructionPointer += INSTRUCTION_POINTER_STEP_SIZE;

  return newComputer;
}

function runProgram(computer: Computer): Computer {
  let newComputer = structuredClone(computer);
  while (newComputer.instructionPointer < newComputer.program.length) {
    newComputer = runInstuction(newComputer);
  }
  return newComputer;
}

console.log(runProgram(computer).output.join(','));
