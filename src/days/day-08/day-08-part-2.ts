import { generateWhile, groupBy } from '../../utils/array';
import { readGrid } from '../../utils/file';
import { pairs } from '../../utils/math';
import { HashSet } from '../../utils/set';

type Antenna = {
  freq: string;
  pos: Pos;
};

type Pos = {
  y: number;
  x: number;
};

const grid = await readGrid('day-08', 'input');

const antennas: Antenna[] = grid.flatMap((row, y) =>
  row.flatMap((freq, x) => (row[x] === '.' ? [] : [{ freq, pos: { y, x } }])),
);

function inBounds(pos: Pos) {
  return pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[0].length;
}

function antinodes(antennas: Antenna[]): HashSet<Pos> {
  return new HashSet<Pos>(
    pairs(antennas).flatMap(([a, b]) => {
      const dx = b.pos.x - a.pos.x;
      const dy = b.pos.y - a.pos.y;
      return [
        ...generateWhile(i => ({ y: a.pos.y - dy * i, x: a.pos.x - dx * i }), inBounds),
        ...generateWhile(i => ({ y: b.pos.y + dy * i, x: b.pos.x + dx * i }), inBounds),
      ];
    }),
  );
}

console.log(HashSet.merge(Object.values(groupBy(antennas, a => a.freq)).map(antinodes)).size);
