import { chunkBy } from '../../utils/array';
import { readLines } from '../../utils/file';
import { at, Pos } from '../../utils/grid';

type Tile = '#' | 'O' | '.' | '@';
type Map = Tile[][];

type Move = '<' | '>' | '^' | 'v';

const lines = await readLines('day-15', 'input');
const [mapLines, movesLines] = chunkBy(lines, line => line === '');

const map: Map = mapLines.map(line => line.split('') as Tile[]);
const moves: Move[] = movesLines.join('').split('') as Move[];

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

function stepsUntilEmpty(map: Map, start: Pos, move: Move): number | null {
  for (let steps = 0, pos = start; ; steps++) {
    switch (at(map, pos)) {
      case '.':
        return steps;
      case '#':
        return null;
      case 'O':
        pos = nextPos(pos, move);
        break;
      default:
        throw new Error('Unexpected tile');
    }
  }
}

function applyMove(oldMap: Map, move: Move): Map {
  const map = structuredClone(oldMap);

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
    case 'O':
      const steps = stepsUntilEmpty(map, next, move);
      if (steps !== null) {
        moveRobot();
        for (let i = 1, current = next; i <= steps; i++) {
          current = nextPos(current, move);
          map[current.y][current.x] = 'O';
        }
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
      if (map[y][x] === 'O') {
        sum += 100 * y + x;
      }
    }
  }
  return sum;
}

console.log(gps(applyMoves(map, moves)));
