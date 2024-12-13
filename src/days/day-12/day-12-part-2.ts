import { readGrid } from '../../utils/file';
import { adj4, at, equals, Pos } from '../../utils/grid';
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
  let sideCount = 0;
  let currentFences = fences(region);

  while (currentFences.length > 0) {
    let fence = currentFences.shift()!;
    sideCount++;

    let removing = true;
    let fencesRemoved = [fence];
    while (removing) {
      removing = false;
      const fenceToRemove = currentFences.find(f =>
        fencesRemoved.some(
          fr =>
            f.type === fr.type &&
            (equals(f.end, fr.start) || equals(f.start, fr.end)) &&
            (f.plant.y === fr.plant.y || f.plant.x === fr.plant.x),
        ),
      );
      if (fenceToRemove) {
        removing = true;
        currentFences = currentFences.filter(f => f !== fenceToRemove);
        fencesRemoved.push(fenceToRemove);
      }
    }
  }

  return sideCount;
}

function fences(region: Region): Fence[] {
  const allLines = region.reduce<Fence[]>((fences, plant) => {
    const addedFences: Fence[] = [
      {
        type: '|',
        start: { y: plant.pos.y, x: plant.pos.x },
        end: { y: plant.pos.y + 1, x: plant.pos.x },
        plant: plant.pos,
      },
      {
        type: '|',
        start: { y: plant.pos.y, x: plant.pos.x + 1 },
        end: { y: plant.pos.y + 1, x: plant.pos.x + 1 },
        plant: plant.pos,
      },
      {
        type: '-',
        start: { y: plant.pos.y, x: plant.pos.x },
        end: { y: plant.pos.y, x: plant.pos.x + 1 },
        plant: plant.pos,
      },
      {
        type: '-',
        start: { y: plant.pos.y + 1, x: plant.pos.x },
        end: { y: plant.pos.y + 1, x: plant.pos.x + 1 },
        plant: plant.pos,
      },
    ];
    return fences.concat(addedFences);
  }, []);
  return allLines.filter(fence =>
    allLines
      .filter(f => f !== fence)
      .every(f => !(equals(f.start, fence.start) && equals(f.end, fence.end))),
  );
}

console.log(sum(regions().map(price)));
