import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';
import { nums } from '../../utils/string';

const BUTTON_A_COST = 3;
const BUTTON_B_COST = 1;

const PRIZE_COORD_OFFSET = 10_000_000_000_000;

type Shift = { dx: number; dy: number };
type Coord = { x: number; y: number };
type Solution = { fa: number; fb: number };

type Machine = {
  buttonA: Shift;
  buttonB: Shift;
  prize: Coord;
};

const lines = await readLines('day-13', 'input');

const machines: Machine[] = chunkBy(lines, line => !line).map(machineLine => {
  const [ax, ay, bx, by, px, py] = nums(machineLine.join());
  return {
    buttonA: { dx: ax, dy: ay },
    buttonB: { dx: bx, dy: by },
    prize: { x: px + PRIZE_COORD_OFFSET, y: py + PRIZE_COORD_OFFSET },
  };
});

function solve(machine: Machine): Solution | null {
  const { buttonA, buttonB, prize } = machine;

  const det = buttonA.dx * buttonB.dy - buttonA.dy * buttonB.dx;
  const fa = (prize.x * buttonB.dy - prize.y * buttonB.dx) / det;
  const fb = (buttonA.dx * prize.y - buttonA.dy * prize.x) / det;

  const validFactor = (f: number) => Number.isInteger(f) && f >= 0;

  return validFactor(fa) && validFactor(fb) ? { fa, fb } : null;
}

function tokens(machine: Machine): number {
  const solution = solve(machine);
  return solution === null ? 0 : solution.fa * BUTTON_A_COST + solution.fb * BUTTON_B_COST;
}

console.log(sum(machines.map(tokens)));
