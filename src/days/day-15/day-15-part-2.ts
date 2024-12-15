import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { at, Pos } from '../../utils/grid';

type Tile = '#' | '[' | ']' | '.' | '@';
type Map = Tile[][];

type Move = '<' | '>' | '^' | 'v';

const lines = await readLines('day-15', 'input');
const [mapLines, movesLines] = chunkBy(lines, line => line === '');

const map: Map = scaleUp(mapLines.map(line => line.split('')));
const moves: Move[] = movesLines.join('').split('') as Move[];

function scaleUp(map: string[][]): Map {
  return map.map(row => {
    return row.flatMap(tile => {
      switch (tile) {
        case '#':
        case '.':
          return [tile, tile];
        case 'O':
          return ['[', ']'];
        case '@':
          return ['@', '.'];
        default:
          throw new Error(`Unexpected tile: ${tile}`);
      }
    });
  });
}

function findRobot(map: Map): Pos {
  return map
    .flatMap((row, y) => row.map((tile, x) => ({ tile, x, y })))
    .find(({ tile }) => tile === '@')!;
}

function nextPos(pos: Pos, move: Move): Pos {
  return {
    '<': { x: pos.x - 1, y: pos.y },
    '>': { x: pos.x + 1, y: pos.y },
    '^': { x: pos.x, y: pos.y - 1 },
    v: { x: pos.x, y: pos.y + 1 },
  }[move];
}

function coordsToMove(map: Map, start: Pos, move: Move): Pos[] | null {
  const coords: Pos[] = [];

  switch (at(map, start)) {
    case '[':
      coords.push(start);
      coords.push({ x: start.x + 1, y: start.y });
      break;
    case ']':
      coords.push({ x: start.x - 1, y: start.y });
      coords.push(start);
      break;
    case '.':
      // stop searching
      return [];
    case '#':
      return null;
    default:
      throw new Error(`Unexpected tile: ${at(map, start)}`);
  }

  switch (move) {
    case '<':
    case '>':
      const otherCoords = coordsToMove(map, nextPos(nextPos(start, move), move), move);
      return otherCoords === null ? null : [...coords, ...otherCoords];
    default:
      const leftCoords = coordsToMove(map, nextPos(coords[0], move), move);
      if (leftCoords === null) return null;
      const rightCoords = coordsToMove(map, nextPos(coords[1], move), move);
      if (rightCoords === null) return null;
      return [...coords, ...leftCoords, ...rightCoords];
  }
}

function moveCoords(oldMap: Map, coords: Pos[], move: Move): Map {
  const map = structuredClone(oldMap);
  for (const coord of coords) {
    map[coord.y][coord.x] = '.';
  }
  for (const coord of coords) {
    map[nextPos(coord, move).y][nextPos(coord, move).x] = at(oldMap, coord)!;
  }
  return map;
}

function applyMove(oldMap: Map, move: Move): Map {
  let map = structuredClone(oldMap);

  const robot = findRobot(map);
  const next = nextPos(robot, move);

  function moveRobot() {
    map[robot.y][robot.x] = '.';
    map[next.y][next.x] = '@';
  }

  switch (at(map, next)) {
    case '.':
      moveRobot();
      break;
    case '[':
    case ']':
      const coords = coordsToMove(map, next, move);
      if (coords !== null) {
        map = moveCoords(map, coords, move);
        moveRobot();
      }
      break;
  }

  return map;
}

function applyMoves(map: Map, moves: Move[]): Map {
  return moves.reduce(applyMove, map);
}

function gps(map: Map): number {
  let sum = 0;
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (map[y][x] === '[') {
        sum += 100 * y + x;
      }
    }
  }
  return sum;
}

console.log(gps(applyMoves(map, moves)));
