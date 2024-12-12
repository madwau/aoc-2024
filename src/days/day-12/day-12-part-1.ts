import { readGrid } from '../../utils/file';
import { adj4, at, equals, Pos } from '../../utils/grid';
import { sum } from '../../utils/math';
import { HashSet } from '../../utils/set';

type PlantType = string;
type Plant = { type: PlantType; pos: Pos };
type Region = Plant[];

const grid: PlantType[][] = await readGrid('day-12', 'input');

function regions(): Region[] {
  const regions: Region[] = [];
  const visited = new HashSet<Pos>();

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const pos: Pos = { y, x };

      if (visited.has(pos)) {
        continue;
      } else {
        visited.add(pos);
      }

      const type = grid[y][x];
      const region: Region = [{ type, pos }];
      const queue = [pos];

      while (queue.length > 0) {
        const current = queue.shift()!;

        for (const neighbor of adj4(grid, current)) {
          if (!visited.has(neighbor) && at(grid, neighbor) === type) {
            visited.add(neighbor);
            region.push({ type, pos: neighbor });
            queue.push(neighbor);
          }
        }
      }

      regions.push(region);
    }
  }

  return regions;
}

function price(region: Region): number {
  return area(region) * perimeter(region);
}

function area(region: Region): number {
  return region.length;
}

function perimeter(region: Region): number {
  return region.reduce((perimeter, plant) => {
    const regionNeighbors = adj4(grid, plant.pos).filter(inRegion(region));
    return perimeter + 4 - regionNeighbors.length;
  }, 0);
}

function inRegion(region: Region): (pos: Pos) => boolean {
  return pos => region.some(plant => equals(plant.pos, pos));
}

console.log(sum(regions().map(price)));
