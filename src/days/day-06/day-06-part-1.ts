import { readLines } from '../../utils/file';
import { HashSet } from '../../utils/set';

type Map = boolean[][];
type Dir = 'N' | 'E' | 'S' | 'W';
type Pos = { y: number; x: number };
type Visit = { pos: Pos; dir: Dir };

const GUARD = '^';
const OBSTACLE = '#';

const lines = await readLines('day-06', 'input');

const map: Map = lines.map(line => line.split('').map(char => char === OBSTACLE));

const guard: Visit = (() => {
  const y = lines.findIndex(line => line.includes(GUARD));
  const x = lines[y].indexOf(GUARD);
  return { pos: { y, x }, dir: 'N' };
})();

function nextPos(guard: Visit): Pos {
  return (
    {
      N: { y: guard.pos.y - 1, x: guard.pos.x },
      E: { y: guard.pos.y, x: guard.pos.x + 1 },
      S: { y: guard.pos.y + 1, x: guard.pos.x },
      W: { y: guard.pos.y, x: guard.pos.x - 1 },
    } satisfies Record<Dir, Pos>
  )[guard.dir];
}

function isObstructed(guard: Visit): boolean {
  const pos = nextPos(guard);
  return map[pos.y][pos.x];
}

function isOutOfBounds(guard: Visit): boolean {
  const pos = nextPos(guard);
  return pos.y < 0 || pos.y >= map.length || pos.x < 0 || pos.x >= map[0].length;
}

function turnRight(dir: Dir): Dir {
  return (
    {
      N: 'E',
      E: 'S',
      S: 'W',
      W: 'N',
    } satisfies Record<Dir, Dir>
  )[dir];
}

function nextVisit(guard: Visit): Visit | null {
  if (isOutOfBounds(guard)) {
    return null;
  } else if (isObstructed(guard)) {
    return { pos: guard.pos, dir: turnRight(guard.dir) };
  } else {
    return { pos: nextPos(guard), dir: guard.dir };
  }
}

const visits = new HashSet([guard]);
const positions = new HashSet([guard.pos]);

for (let next = nextVisit(guard); next && !visits.has(next); next = nextVisit(next)) {
  visits.add(next);
  positions.add(next.pos);
}

console.log(positions.size);
