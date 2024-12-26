import { readGrid } from '../../utils/file';
import { allShortestPaths } from '../../utils/graph';
import { at, Direction, equals, Pos, turnLeft, turnRight, walk } from '../../utils/grid';
import { HashMap } from '../../utils/map';
import { HashSet } from '../../utils/set';

type Tile = '.' | '#' | 'S' | 'E';
type Grid = Tile[][];

type Node = {
  pos: Pos;
  dir: Direction;
};

const grid = await readGrid<Grid>('day-16', 'input');
const cache = new HashMap<Node, Node>();

function findTile(grid: Grid, target: Tile): Pos {
  return grid
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .find(({ tile }) => tile === target)!;
}

const start: Pos = findTile(grid, 'S');
const end: Pos = findTile(grid, 'E');
const reindeer: Node = createNode(start, 'E');

function createNode(pos: Pos, dir: Direction): Node {
  const node = { pos, dir };
  if (!cache.has(node)) cache.set(node, node);
  return cache.get(node)!;
}

function neighbors(node: Node): { node: Node; cost: number }[] {
  return [
    { node: createNode(walk(node.pos, node.dir), node.dir), cost: 1 },
    { node: createNode(node.pos, turnLeft(node.dir)), cost: 1000 },
    { node: createNode(node.pos, turnRight(node.dir)), cost: 1000 },
  ].filter(({ node }) => at(grid, node.pos) !== '#');
}

const shortestPaths = allShortestPaths(neighbors, reindeer, node => equals(node.pos, end));

const spots = new HashSet(shortestPaths.flatMap(path => path.map(node => node.pos)));

console.log(spots.size);
