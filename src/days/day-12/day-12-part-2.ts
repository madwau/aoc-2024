import { readGrid } from '../../utils/file';
import { adj4, at, equals, Pos } from '../../utils/grid';
import { HashMap } from '../../utils/map';
import { sum } from '../../utils/math';
import { HashSet } from '../../utils/set';

type PlantType = string;
type Plant = { type: PlantType; pos: Pos };
type Region = Plant[];
type Fence = { type: '|' | '-'; start: Pos; end: Pos; plant: Pos };

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
  return area(region) * sides(region);
}

function area(region: Region): number {
  return region.length;
}

function sides(region: Region): number {
  let sideCount: number;
  let currentFences = fences(region);

  for (sideCount = 0; currentFences.length > 0; sideCount++) {
    let groupedFences = [currentFences.shift()!];
    for (
      let fenceToGroup: Fence | undefined;
      (fenceToGroup = currentFences.find(belongsToFences(groupedFences)));
      groupedFences.push(fenceToGroup)
    ) {
      currentFences = currentFences.filter(fence => fence !== fenceToGroup);
    }
  }

  return sideCount;
}

function belongsToFences(group: Fence[]): (fence: Fence) => boolean {
  return fence =>
    group.some(
      other =>
        fence.type === other.type &&
        (equals(fence.end, other.start) || equals(fence.start, other.end)) &&
        (fence.plant.y === other.plant.y || fence.plant.x === other.plant.x),
    );
}

function fences(region: Region): Fence[] {
  const map = new HashMap<string, Fence>();

  region
    .flatMap<Fence>(plant => [
      {
        type: '|',
        plant: plant.pos,
        start: plant.pos,
        end: { y: plant.pos.y + 1, x: plant.pos.x },
      },
      {
        type: '|',
        plant: plant.pos,
        start: { y: plant.pos.y, x: plant.pos.x + 1 },
        end: { y: plant.pos.y + 1, x: plant.pos.x + 1 },
      },
      {
        type: '-',
        plant: plant.pos,
        start: plant.pos,
        end: { y: plant.pos.y, x: plant.pos.x + 1 },
      },
      {
        type: '-',
        plant: plant.pos,
        start: { y: plant.pos.y + 1, x: plant.pos.x },
        end: { y: plant.pos.y + 1, x: plant.pos.x + 1 },
      },
    ])
    .forEach(fence => {
      const key = `${fence.start.y},${fence.start.x},${fence.end.y},${fence.end.x}`;
      map.get(key) ? map.delete(key) : map.set(key, fence);
    });

  return Array.from(map.values());
}

console.log(sum(regions().map(price)));
