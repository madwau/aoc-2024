import { readNumericGrid } from '../../utils/file';
import { adj4, at, Pos } from '../../utils/grid';
import { sum } from '../../utils/math';

const SOURCE = 0;
const TARGET = 9;

const grid = await readNumericGrid('day-10', 'input');

const positions: Pos[] = grid.flatMap((row, y) => row.map((_, x) => ({ y, x })));

function neighbors(pos: Pos): Pos[] {
  return adj4(grid, pos).filter(adj => at(grid, pos)! + 1 === at(grid, adj));
}

function rating(start: Pos) {
  if (at(grid, start) !== SOURCE) {
    return 0;
  }

  let hikes: Pos[][] = [[start]];

  for (let hiking = true; hiking; ) {
    hiking = false;
    hikes = hikes.flatMap(hike => {
      const last = hike[hike.length - 1];
      const next = neighbors(last);

      if (next.length === 0) {
        return [hike];
      } else {
        hiking = true;
        return next.map(n => [...hike, n]);
      }
    });
  }

  return hikes.filter(hike => at(grid, hike[hike.length - 1]) === TARGET).length;
}

console.log(sum(positions.map(rating)));
