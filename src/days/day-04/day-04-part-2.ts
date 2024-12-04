import { directionalSlice } from '../../utils/array';
import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';

const WORD = 'MAS';
const REVERSE_WORD = WORD.split('').reverse().join('');

function isXmas(grid: string[][], y: number, x: number): boolean {
  return [
    directionalSlice(grid, y, WORD.length, 'asc').map((row, i) => row[x + i]), // down-right
    directionalSlice(grid, y, WORD.length, 'asc').map((row, i) => row[x + 2 - i]), // down-left
  ].every(cells => [WORD, REVERSE_WORD].includes(cells.join('')));
}

function gridCount(grid: string[][]): number {
  return sum(grid.map((row, y) => sum(row.map((_, x) => (isXmas(grid, y, x) ? 1 : 0)))));
}

const lines = await readLines('day-04', 'input');

console.log(gridCount(lines.map(line => line.split(''))));
