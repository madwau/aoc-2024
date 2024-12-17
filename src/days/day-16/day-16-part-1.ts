import { readGrid } from '../../utils/file';
import { dijkstra } from '../../utils/graph';
import { at, Direction, equals, Pos, turnLeft, turnRight, walk } from '../../utils/grid';

type Tile = '.' | '#' | 'S' | 'E';
type Grid = Tile[][];

type Node = {
  pos: Pos;
  dir: Direction;
};

const grid = await readGrid<Grid>('day-16', 'input');

function findTile(grid: Grid, target: Tile): Pos {
  return grid
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .find(({ tile }) => tile === target)!;
}

const start: Pos = findTile(grid, 'S');
const end: Pos = findTile(grid, 'E');
const reindeer: Node = { pos: start, dir: 'E' };

function neighbors(node: Node): { node: Node; cost: number }[] {
  return [
    { node: { pos: walk(node.pos, node.dir), dir: node.dir }, cost: 1 },
    { node: { pos: node.pos, dir: turnLeft(node.dir) }, cost: 1000 },
    { node: { pos: node.pos, dir: turnRight(node.dir) }, cost: 1000 },
  ].filter(({ node }) => at(grid, node.pos) !== '#');
}

console.log(dijkstra(neighbors, reindeer, node => equals(node.pos, end)));
