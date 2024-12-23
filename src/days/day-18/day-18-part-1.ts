import { range } from '../../utils/array';
import { readLines } from '../../utils/file';
import { dijkstra } from '../../utils/graph';
import { adj4, at, equals, Pos } from '../../utils/grid';
import { nums } from '../../utils/string';

type Tile = '.' | '#';
type Grid = Tile[][];

type Byte = {
  x: number;
  y: number;
};

const MAX_COORD = 70;
const NANOSECONDS = 1024;

const lines = await readLines('day-18', 'input');

const bytes: Byte[] = lines.map(line => nums<[number, number]>(line)).map(([x, y]) => ({ x, y }));

function gridAfter(nanoseconds: number): Grid {
  const grid: Grid = range(0, MAX_COORD).map(() => range(0, MAX_COORD).map(() => '.'));

  for (let i = 0; i < nanoseconds; i++) {
    grid[bytes[i].y][bytes[i].x] = '#';
  }

  return grid;
}

const grid = gridAfter(NANOSECONDS);

function neighbors(node: Pos): { node: Pos; cost: number }[] {
  return adj4(grid, node)
    .filter(neighbor => at(grid, neighbor) === '.')
    .map(neighbor => ({ node: neighbor, cost: 1 }));
}

console.log(
  dijkstra(neighbors, { x: 0, y: 0 }, pos => equals(pos, { x: MAX_COORD, y: MAX_COORD })),
);
