import { readNumericGrid } from '../../utils/file';
import { adj4, at, Pos } from '../../utils/grid';
import { sum } from '../../utils/math';
import { HashSet } from '../../utils/set';

const SOURCE = 0;
const TARGET = 9;

const grid = await readNumericGrid('day-10', 'input');

const positions: Pos[] = grid.flatMap((row, y) => row.map((_, x) => ({ y, x })));

function neighbors(pos: Pos): Pos[] {
  return adj4(grid, pos).filter(adj => at(grid, pos)! + 1 === at(grid, adj));
}

function score(start: Pos) {
  let score = 0;

  if (at(grid, start) !== SOURCE) {
    return score;
  }

  const visited = new HashSet<Pos>([start]);
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (at(grid, current) === TARGET) {
      score++;
    }

    for (const neighbor of neighbors(current)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return score;
}

console.log(sum(positions.map(score)));
