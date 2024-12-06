import { readLines } from '../../utils/file';

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

function isObstructed(map: Map, guard: Visit): boolean {
  const pos = nextPos(guard);
  return map[pos.y][pos.x];
}

function isOutOfBounds(map: Map, guard: Visit): boolean {
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

function nextVisit(map: Map, guard: Visit): Visit | null {
  if (isOutOfBounds(map, guard)) {
    return null;
  } else if (isObstructed(map, guard)) {
    return { pos: guard.pos, dir: turnRight(guard.dir) };
  } else {
    return { pos: nextPos(guard), dir: guard.dir };
  }
}

function hash(obj: Pos | Visit): string {
  return JSON.stringify(obj);
}

function isStuckInLoop(map: Map): boolean {
  let visit: Visit | null = { ...guard };
  const visitHashes = new Set<string>([hash(visit)]);
  while (true) {
    visit = nextVisit(map, visit);
    if (visit === null) {
      return false;
    } else if (visitHashes.has(hash(visit))) {
      return true;
    }
    visitHashes.add(hash(visit));
  }
}

function getPossibleObstructions(): Map[] {
  const possibleObstructions: Map[] = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] || (y === guard.pos.y && x === guard.pos.x)) {
        continue;
      }
      const newMap = structuredClone(map);
      newMap[y][x] = true;
      possibleObstructions.push(newMap);
    }
  }
  return possibleObstructions;
}

console.log(getPossibleObstructions().filter(isStuckInLoop).length);
