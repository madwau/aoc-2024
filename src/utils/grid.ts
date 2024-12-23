export type Pos = {
  y: number;
  x: number;
};

export type Direction = 'N' | 'E' | 'S' | 'W';

export function equals(a: Pos, b: Pos): boolean {
  return a.y === b.y && a.x === b.x;
}

export function adj4(grid: unknown[][], pos: Pos): Pos[] {
  return [
    { y: pos.y - 1, x: pos.x },
    { y: pos.y + 1, x: pos.x },
    { y: pos.y, x: pos.x - 1 },
    { y: pos.y, x: pos.x + 1 },
  ].filter(neighbor => inBounds(grid, neighbor));
}

export function inBounds(grid: unknown[][], pos: Pos): boolean {
  return pos.y >= 0 && pos.y < grid.length && pos.x >= 0 && pos.x < grid[pos.y].length;
}

export function at<T>(grid: T[][], pos: Pos): T | undefined {
  return grid[pos.y]?.[pos.x];
}

export function diff(a: Pos, b: Pos): Pos {
  return { y: a.y - b.y, x: a.x - b.x };
}

export function add(a: Pos, b: Pos): Pos {
  return { y: a.y + b.y, x: a.x + b.x };
}

export function walk(pos: Pos, direction: Direction): Pos {
  switch (direction) {
    case 'N':
      return { y: pos.y - 1, x: pos.x };
    case 'E':
      return { y: pos.y, x: pos.x + 1 };
    case 'S':
      return { y: pos.y + 1, x: pos.x };
    case 'W':
      return { y: pos.y, x: pos.x - 1 };
  }
}

export function turnLeft(direction: Direction): Direction {
  return (
    {
      N: 'W',
      E: 'N',
      S: 'E',
      W: 'S',
    } satisfies Record<Direction, Direction>
  )[direction];
}

export function turnRight(direction: Direction): Direction {
  return (
    {
      N: 'E',
      E: 'S',
      S: 'W',
      W: 'N',
    } satisfies Record<Direction, Direction>
  )[direction];
}
