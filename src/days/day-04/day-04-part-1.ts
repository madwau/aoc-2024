import { directionalSlice } from '../../utils/array';
import { readLines } from '../../utils/file';
import { sum } from '../../utils/math';

const WORD = 'XMAS';

function cellCount(grid: string[][], y: number, x: number): number {
  return [
    directionalSlice(grid[y], x, WORD.length, 'asc'), // right
    directionalSlice(grid[y], x, WORD.length, 'desc'), // left
    directionalSlice(grid, y, WORD.length, 'asc').map(row => row[x]), // down
    directionalSlice(grid, y, WORD.length, 'desc').map(row => row[x]), // up
    directionalSlice(grid, y, WORD.length, 'asc').map((row, i) => row[x + i]), // down-right
    directionalSlice(grid, y, WORD.length, 'asc').map((row, i) => row[x - i]), // down-left
    directionalSlice(grid, y, WORD.length, 'desc').map((row, i) => row[x + i]), // up-right
    directionalSlice(grid, y, WORD.length, 'desc').map((row, i) => row[x - i]), // up-left
  ].filter(cells => cells.join('') === WORD).length;
}

function gridCount(grid: string[][]): number {
  return sum(grid.map((row, y) => sum(row.map((_, x) => cellCount(grid, y, x)))));
}

const lines = await readLines('day-04', 'input');

console.log(gridCount(lines.map(line => line.split(''))));
