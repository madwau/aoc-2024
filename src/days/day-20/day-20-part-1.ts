import { range } from '../../utils/array';
import { readGrid } from '../../utils/file';
import { dijkstra } from '../../utils/graph';
import { add, adj4, at, diff, equals, Pos } from '../../utils/grid';

type Tile = '.' | '#' | 'S' | 'E';
type Grid = Tile[][];

type Cheat = {
  start: Pos;
  end: Pos;
};

const grid = await readGrid<Grid>('day-20', 'input');

function findTile(grid: Grid, target: Tile): Pos {
  return grid
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .find(({ tile }) => tile === target)!;
}

const start: Pos = findTile(grid, 'S');
const end: Pos = findTile(grid, 'E');

function shortestPath(cheat?: Cheat): number {
  function neighbors(node: Pos): { node: Pos; cost: number }[] {
    const nodes = adj4(grid, node)
      .filter(neighbor => at(grid, neighbor) !== '#')
      .map(neighbor => ({ node: neighbor, cost: 1 }));

    if (cheat && equals(node, cheat.start)) {
      nodes.push({ node: cheat.end, cost: 2 });
    }

    return nodes;
  }

  return dijkstra(neighbors, start, node => equals(node, end));
}

const shortestPathWithoutCheats = shortestPath();

const cheats: Cheat[] = range(0, grid.length - 1).flatMap(y => {
  return range(0, grid[y].length - 1).flatMap(x => {
    if (at(grid, { x, y }) === '#') return [];
    return adj4(grid, { x, y })
      .filter(
        neighbor =>
          at(grid, neighbor) === '#' &&
          ['.', 'S', 'E'].includes(at(grid, add(neighbor, diff(neighbor, { x, y })))!),
      )
      .map(neighbor => ({ start: { x, y }, end: add(neighbor, diff(neighbor, { x, y })) }));
  });
});

function saves(cheat: Cheat, picoseconds: number): boolean {
  return shortestPath(cheat) <= shortestPathWithoutCheats - picoseconds;
}

console.log(cheats.filter(cheat => saves(cheat, 100)).length);
