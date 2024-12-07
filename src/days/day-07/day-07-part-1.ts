import { readLines } from '../../utils/file';
import { cartesianPower, sum } from '../../utils/math';
import { nums } from '../../utils/string';

type Equation = {
  result: number;
  operands: number[];
};

type Operator = '+' | '*';

const OPERATORS: Operator[] = ['+', '*'];

const lines = await readLines('day-07', 'input');

const equations: Equation[] = lines
  .map(nums)
  .map(([result, ...operands]) => ({ result, operands }));

function solvable(equation: Equation): boolean {
  return cartesianPower(OPERATORS, equation.operands.length - 1).some(
    operators =>
      equation.result ===
      equation.operands.reduce((acc, operand, index) => {
        const operator = operators[index - 1] ?? '+';
        return operator === '+' ? acc + operand : acc * operand;
      }),
  );
}

console.log(sum(equations.filter(solvable).map(equation => equation.result)));
