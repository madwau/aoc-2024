export type Pos = {
  y: number;
  x: number;
};

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
