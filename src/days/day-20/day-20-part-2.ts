import { hashUnique, range } from '../../utils/array';
import { readGrid } from '../../utils/file';
import { distances } from '../../utils/graph';
import { adj4, at, manhattan, Pos } from '../../utils/grid';

type Tile = '.' | '#' | 'S' | 'E';
type Grid = Tile[][];

type Cheat = {
  start: Pos;
  end: Pos;
};

const CHEAT_DISTANCE = 20;

const grid = await readGrid<Grid>('day-20', 'input');

function findTile(grid: Grid, target: Tile): Pos {
  const tile = grid
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .find(({ tile }) => tile === target)!;
  return { y: tile.y, x: tile.x };
}

const start: Pos = findTile(grid, 'S');
const end: Pos = findTile(grid, 'E');

function neighbors(node: Pos): { node: Pos; cost: number }[] {
  return adj4(grid, node)
    .filter(neighbor => at(grid, neighbor) !== '#')
    .map(neighbor => ({ node: neighbor, cost: 1 }));
}

const startDistances = distances(neighbors, start);
const endDistances = distances(neighbors, end);

function shortestPath(cheat?: Cheat): number {
  if (!cheat) return startDistances.get(end)!;
  const startToCheat = startDistances.get(cheat.start)!;
  const cheatToEnd = endDistances.get(cheat.end)!;
  return startToCheat + manhattan(cheat.start, cheat.end) + cheatToEnd;
}

const shortestPathWithoutCheats = shortestPath();

const cheats: Cheat[] = range(0, grid.length - 1).flatMap(y => {
  return range(0, grid[y].length - 1).flatMap(x => {
    if (at(grid, { x, y }) === '#') {
      return [];
    }
    return range(2, CHEAT_DISTANCE).flatMap(distance => {
      return range(0, distance).flatMap(dy => {
        const dx = distance - dy;
        return hashUnique([
          { x: x + dx, y: y + dy },
          { x: x - dx, y: y + dy },
          { x: x + dx, y: y - dy },
          { x: x - dx, y: y - dy },
        ])
          .filter(node => ['.', 'S', 'E'].includes(at(grid, node)!))
          .map(node => ({ start: { y, x }, end: { y: node.y, x: node.x } }));
      });
    });
  });
});

function saves(cheat: Cheat, picoseconds: number): boolean {
  return shortestPath(cheat) <= shortestPathWithoutCheats - picoseconds;
}

console.log(cheats.filter(cheat => saves(cheat, 100)).length);
